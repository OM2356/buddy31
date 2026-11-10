# Buddy Elder AI Architecture Specification

## 1. System Overview

```
                      +---------------------------------------+
                      |       Client Browser (React 19)       |
                      |  - Multilingual (en, hi, mr)          |
                      |  - STT / TTS Voice Controller         |
                      |  - Interactive Phone Simulator        |
                      |  - Accessibility Font & Contrast Sync |
                      +---------------------------------------+
                                          |
                                    HTTP REST API
                                          |
                                          v
                      +---------------------------------------+
                      |         Node.js Express Server        |
                      |       /server.ts (Port 3000)          |
                      +---------------------------------------+
                                          |
                 +------------------------+------------------------+
                 |                                                 |
                 v                                                 v
+------------------------------------+           +------------------------------------+
|     BuddyAgentOrchestrator         |           |       Database & Persistence       |
|  1. Input Sanitization & PII Mask  |           |  - Firebase Firestore              |
|  2. Emergency Priority Intercept   |           |  - Local JSON Fallback             |
|  3. Trilingual Intent Classifier   |           |  - Learning Progress & Reminders   |
|  4. RAG Evidence Retrieval         |           +------------------------------------+
|  5. Specialist Agent Dispatch      |
|  6. Factual Verification Engine    |
|  7. Interaction Logging & Metrics  |
+------------------------------------+
                 |
     +-----------+-----------+
     |                       |
     v                       v
+------------------+  +-------------------------------+
|  Google Gemini   |  |     10 Specialist Agents      |
|  SDK (@genai)    |  | 1. Companion Agent            |
|  - Multi-model   |  | 2. Digital Education Agent    |
|    failover      |  | 3. Safety & Scam Agent        |
|  - Server-side   |  | 4. Wellness Agent             |
|    keys only     |  | 5. Emergency SOS Agent        |
|                  |  | 6. Caregiver Agent            |
|                  |  | 7. Accessibility Agent        |
|                  |  | 8. Knowledge & RAG Agent      |
|                  |  | 9. Adaptive Feedback Agent   |
|                  |  | 10. Verification Agent        |
+------------------+  +-------------------------------+
```

## 2. Request Flow Pipeline

1. **User Input / Voice Speech:** User taps microphone or enters text in English, Hindi, or Marathi.
2. **Safety & PII Redaction:** Credit card numbers and 4-6 digit OTPs are sanitized immediately (`server/services/safetyService.ts`).
3. **Emergency Intercept:** If life-safety or fall keywords are detected, zero-latency emergency guidance is dispatched immediately.
4. **Intent Classification:** `classifyUserIntent` analyzes keywords and semantic meaning across English, Hindi, and Marathi.
5. **RAG Knowledge Retrieval:** If the question relates to digital skills, safety, or government schemes, `retrieveEducationalEvidence` extracts relevant knowledge chunks.
6. **Specialist Agent Execution:** The query is routed to one of 10 specialized agents with elder-friendly system prompts.
7. **Answer Verification:** `verifyAnswerAgainstEvidence` computes factual overlap between the generated text and the retrieved sources, assigning a confidence score and verification status.
8. **Logging & Feedback:** Interaction is persisted with response time, selected agent, and verification status for administrative monitoring.
9. **Speech Synthesis:** If voice mode was active, the response is read aloud using localized browser speech voices.
