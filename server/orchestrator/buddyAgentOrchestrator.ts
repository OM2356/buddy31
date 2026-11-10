import {
  AgentType,
  Language,
  OrchestrationRequest,
  OrchestrationResponse,
  RAGSourceItem,
} from '../../src/types';
import { evaluateSafetyAndPrompt } from '../services/safetyService';
import { classifyUserIntent } from './intentClassifier';
import { retrieveEducationalEvidence } from '../services/ragService';
import { verifyAnswerAgainstEvidence } from '../services/verificationService';
import { DatabaseService } from '../services/dbService';

// Specialist Agents
import { runCompanionAgent } from '../agents/companionAgent';
import { runEducationAgent } from '../agents/educationAgent';
import { runSafetyAgent } from '../agents/safetyAgent';
import { runWellnessAgent } from '../agents/wellnessAgent';
import { runEmergencyAgent } from '../agents/emergencyAgent';
import { runCaregiverAgent } from '../agents/caregiverAgent';
import { runAccessibilityAgent } from '../agents/accessibilityAgent';
import { runRAGKnowledgeAgent } from '../agents/ragKnowledgeAgent';
import { runFeedbackAgent } from '../agents/feedbackAgent';
import { runVerificationAgent } from '../agents/verificationAgent';

export async function orchestrateBuddyQuery(
  req: OrchestrationRequest
): Promise<OrchestrationResponse> {
  const startTime = Date.now();
  const userId = req.userId || 'demo-elder-dadi';
  const language: Language = req.language || 'en';
  const rawMessage = (req.message || '').trim();
  const history = req.history || [];

  // 1. Safety and PII Check
  const safetyCheck = evaluateSafetyAndPrompt(rawMessage, language);
  const cleanMessage = safetyCheck.sanitizedText;

  // 2. Intent Classification
  const classification = classifyUserIntent(rawMessage);

  // 3. Agent Selection
  // If emergency or high-risk scam is detected, override requested agent with priority specialist
  let selectedAgent: AgentType = classification.recommendedAgent;

  if (safetyCheck.riskLevel === 'EMERGENCY') {
    selectedAgent = 'emergency';
  } else if (safetyCheck.riskLevel === 'HIGH_RISK_SCAM') {
    selectedAgent = 'safety';
  } else if (req.requestedAgent && req.requestedAgent !== 'auto') {
    selectedAgent = req.requestedAgent;
  }

  // 4. Knowledge Retrieval (RAG)
  // Retrieve when query involves education, knowledge, accessibility, or safety
  let ragSources: RAGSourceItem[] = [];
  if (['education', 'knowledge', 'accessibility', 'safety', 'wellness'].includes(selectedAgent)) {
    ragSources = retrieveEducationalEvidence(cleanMessage, 3);
  }

  // 5. Specialist Agent Dispatch
  const agentCtx = {
    language,
    history,
    ragSources,
    emergencyCategory: classification.emergencyCategory,
  };

  let reply = '';

  try {
    switch (selectedAgent) {
      case 'emergency':
        reply = await runEmergencyAgent(cleanMessage, agentCtx);
        break;

      case 'safety':
        reply = await runSafetyAgent(cleanMessage, agentCtx);
        break;

      case 'education':
        reply = await runEducationAgent(cleanMessage, agentCtx);
        break;

      case 'wellness':
        reply = await runWellnessAgent(cleanMessage, agentCtx);
        break;

      case 'caregiver':
        reply = await runCaregiverAgent(cleanMessage, agentCtx);
        break;

      case 'accessibility':
        reply = await runAccessibilityAgent(cleanMessage, agentCtx);
        break;

      case 'knowledge':
        reply = await runRAGKnowledgeAgent(cleanMessage, agentCtx);
        break;

      case 'feedback':
        reply = await runFeedbackAgent(cleanMessage, agentCtx);
        break;

      case 'verification':
        reply = await runVerificationAgent(cleanMessage, agentCtx);
        break;

      case 'companion':
      default:
        reply = await runCompanionAgent(cleanMessage, agentCtx);
        break;
    }
  } catch (err: any) {
    console.error(`[BuddyOrchestrator] Error executing agent ${selectedAgent}:`, err);
    reply =
      language === 'hi'
        ? 'माफ़ कीजिए, मुझे थोड़ी कठिनाई हुई। लेकिन मैं आपके साथ हूँ। क्या आप अपना सवाल दोबारा पूछ सकते हैं?'
        : language === 'mr'
        ? 'क्षमस्व, थोडा तांत्रिक अडथळा आला. मी तुमच्या सोबत आहे. आपण पुन्हा एकदा विचारू शकता का?'
        : "I am right here with you. There was a tiny delay in connecting, but I am ready. Could you please ask that once more?";
  }

  // 6. Answer Verification
  const isPriorityOverride = classification.isEmergency || safetyCheck.riskLevel === 'HIGH_RISK_SCAM';
  const verification = verifyAnswerAgainstEvidence(reply, ragSources, isPriorityOverride);

  const durationMs = Date.now() - startTime;

  // 7. Persist interaction log
  DatabaseService.saveInteraction({
    userId,
    agentUsed: selectedAgent,
    intent: classification.intent,
    question: rawMessage,
    answer: reply,
    language,
    verificationStatus: verification.status,
    confidenceScore: verification.confidenceScore,
    responseTimeMs: durationMs,
  });

  if (classification.isEmergency) {
    DatabaseService.logEmergency(
      userId,
      classification.emergencyCategory || 'general',
      `Triggered by phrase: "${rawMessage}"`
    );
  }

  return {
    reply,
    selectedAgent,
    intent: classification.intent,
    confidence: classification.confidence,
    isEmergency: classification.isEmergency,
    emergencyCategory: classification.emergencyCategory,
    sources: ragSources,
    verification,
    safetyCheck: {
      isSafe: safetyCheck.isSafe,
      flaggedKeywords: safetyCheck.flaggedKeywords,
      riskLevel: safetyCheck.riskLevel,
    },
    status: classification.isEmergency ? 'emergency' : 'completed',
    audioPrompt: reply.slice(0, 150),
  };
}
