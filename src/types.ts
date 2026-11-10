/**
 * Buddy Elder AI - Universal Data Types & Agent Contracts
 */

export type Language = 'en' | 'hi' | 'mr';

export type UserRole = 'elder' | 'caregiver' | 'admin';

export type FontSize = 'normal' | 'large' | 'extra-large';

export type AgentType =
  | 'companion'
  | 'education'
  | 'safety'
  | 'wellness'
  | 'emergency'
  | 'caregiver'
  | 'accessibility'
  | 'knowledge'
  | 'feedback'
  | 'verification';

export type UserIntent =
  | 'COMPANION'
  | 'EDUCATION'
  | 'SAFETY_SCAM'
  | 'WELLNESS'
  | 'EMERGENCY'
  | 'CAREGIVER'
  | 'ACCESSIBILITY'
  | 'KNOWLEDGE_RAG'
  | 'FEEDBACK'
  | 'VERIFICATION';

export type VerificationStatus =
  | 'VERIFIED'
  | 'PARTIALLY_GROUNDED'
  | 'GENERAL_GUIDANCE'
  | 'SAFETY_OVERRIDE';

export interface VerificationReport {
  status: VerificationStatus;
  confidenceScore: number;
  citedSources: string[];
  evidenceFound: boolean;
  notes: string;
}

export interface RAGSourceItem {
  id: string;
  title: string;
  category: string;
  summary?: string;
  content?: string;
  confidence?: number;
}

export interface UserConsentSettings {
  shareLearningProgressWithCaregiver: boolean;
  shareWellnessWithCaregiver: boolean;
  allowEmergencyLocation: boolean;
  allowCaregiverReminders: boolean;
  allowDailyWellnessCheck: boolean;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
  email?: string;
  isPrimary: boolean;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  language: Language;
  fontSize: FontSize;
  highContrast: boolean;
  speechSpeed: number; // 0.7 to 1.3
  phone?: string;
  emergencyContacts: EmergencyContact[];
  connectedCaregiverEmail?: string;
  connectedElderUids?: string[]; // for caregiver role
  consent: UserConsentSettings;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'buddy';
  text: string;
  timestamp: string;
  agentUsed?: AgentType;
  intent?: string;
  isEmergency?: boolean;
  verification?: VerificationReport;
  sources?: RAGSourceItem[];
  detectedMemoryCue?: { key: string; value: string; category: string } | null;
}

export interface LessonStep {
  title: {
    en: string;
    hi: string;
    mr: string;
  };
  description: {
    en: string;
    hi: string;
    mr: string;
  };
  tip?: {
    en: string;
    hi: string;
    mr: string;
  };
  iconName?: string;
}

export interface Lesson {
  id: string;
  title: {
    en: string;
    hi: string;
    mr: string;
  };
  durationMinutes: number;
  summary: {
    en: string;
    hi: string;
    mr: string;
  };
  steps: LessonStep[];
  quiz?: any;
  knowledgeCheck?: {
    question: {
      en: string;
      hi: string;
      mr: string;
    };
    options: Array<{
      en: string;
      hi: string;
      mr: string;
    }>;
    correctIndex: number;
    explanation: {
      en: string;
      hi: string;
      mr: string;
    };
  };
}

export interface Course {
  id: string;
  title: {
    en: string;
    hi: string;
    mr: string;
  };
  description: {
    en: string;
    hi: string;
    mr: string;
  };
  iconName: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category:
    | 'basics'
    | 'communication'
    | 'security'
    | 'finance'
    | 'multimedia'
    | 'government'
    | 'knowledge'
    | 'safety';
  lessons: Lesson[];
}

export interface LearningProgress {
  userId: string;
  completedLessonIds: string[];
  inProgressLessonId?: string;
  quizScores: Record<string, number>;
  totalMinutesSpent: number;
  lastUpdated: string;
}

export interface Reminder {
  id: string;
  userId: string;
  title: string;
  time: string; // HH:mm
  frequency: 'daily' | 'once' | 'hourly';
  category: 'medicine' | 'water' | 'walk' | 'doctor';
  completed: boolean;
  createdBy: 'elder' | 'caregiver';
  audioAlert: boolean;
  notes?: string;
}

export interface FallSafetyCheckItem {
  id: string;
  room: 'bedroom' | 'bathroom' | 'living' | 'kitchen' | 'general';
  title: {
    en: string;
    hi: string;
    mr: string;
  };
  description: {
    en: string;
    hi: string;
    mr: string;
  };
  isCompleted: boolean;
}

export interface ScamAnalysisResult {
  isScam: boolean;
  riskLevel: 'SAFE' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  riskScore: number; // 0 to 100
  flaggedKeywords: string[];
  scamType?: string;
  warningMessage: {
    en: string;
    hi: string;
    mr: string;
  };
  recommendedActions: Array<{
    en: string;
    hi: string;
    mr: string;
  }>;
  explanation: {
    en: string;
    hi: string;
    mr: string;
  };
}

export interface OrchestrationRequest {
  userId?: string;
  requestedAgent?: AgentType | 'auto';
  message: string;
  language?: Language;
  history?: Array<{ role: 'user' | 'model'; text: string }>;
}

export interface OrchestrationResponse {
  reply: string;
  selectedAgent: AgentType;
  intent: UserIntent;
  confidence: number;
  isEmergency: boolean;
  emergencyCategory?: string;
  sources?: RAGSourceItem[];
  verification: VerificationReport;
  safetyCheck: {
    isSafe: boolean;
    flaggedKeywords: string[];
    riskLevel: string;
  };
  status: 'completed' | 'emergency' | 'fallback';
  audioPrompt?: string;
}

export interface ResearchDocument {
  id: string;
  title: string;
  author?: string;
  authors?: string;
  year?: number | string;
  journal?: string;
  category: string;
  summary: string;
  content: string;
  doi?: string;
  keyTakeaways?: string[];
  tags?: string[];
  active?: boolean;
  createdAt?: string;
}
