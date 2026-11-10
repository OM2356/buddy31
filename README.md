# Buddy Elder AI (बडी एल्डर एआई)

**Accessible, Multilingual Elderly-Care & Digital-Education Platform**

Buddy Elder AI is an intelligent, compassionate, and secure platform designed to empower older adults to learn digital skills independently, recognize online scams, stay connected with trusted caregivers, and access emergency services.

---

## 🌟 Key Features

1. **Central Multi-Agent AI Orchestrator (`BuddyAgentOrchestrator`)**
   - 10 distinct specialist agents: Companion, Digital Education, Safety & Scam Detection, Wellness, Emergency, Caregiver, Accessibility, Knowledge & RAG, Adaptive Feedback, and Answer Verification.
   - Zero-latency emergency override detecting distress calls, falls, and health emergencies.
   - PII filtering and sensitive credential masking (OTPs, CVVs, bank passwords).

2. **Factual Verification & Hallucination Guard**
   - Compares every generated answer against verified educational evidence chunks.
   - Returns confidence scores and real source citations.
   - Intercepts unsafe instructions or unsupported claims.

3. **Interactive Smartphone Sandbox Simulator (`PhoneSimulator.tsx`)**
   - Realistic mobile phone environment for risk-free practice.
   - Practice WhatsApp text messaging, voice note recording, photo sharing, and simulated video calls.
   - Simulated family replies after 1.5s with positive reinforcement.

4. **Real-Time Scam & Online Fraud Detector (`ScamDetector.tsx`)**
   - Paste any suspicious SMS, WhatsApp message, email, or lottery notification.
   - Instant risk score gauge (Safe, Low, Medium, High, Critical).
   - Clear explanations and safe next steps (hang up, block, dial 1930 Cyber Helpline).

5. **Multilingual Voice Assistant (English, हिंदी, मराठी)**
   - Real browser Speech-to-Text (`SpeechRecognition`) and Text-to-Speech (`SpeechSynthesis`).
   - Slower speech rates tailored for senior listening comfort (0.7x – 1.2x).

6. **Senior Accessibility Standards**
   - 3-level font scaling (`Normal`, `Large`, `Extra Large`).
   - High-contrast mode for visually impaired seniors.
   - Generous touch targets (52px+) and audio chime feedback.

7. **Emergency SOS Hub**
   - High-visibility SOS button with accidental-click confirmation modal.
   - Direct dialing for Indian national helplines: **112** (All-in-One), **1930** (Cybercrime), **14567** (Elderline), and **108** (Ambulance).
   - Instant alert SMS dispatch to primary family caregivers.

8. **Consent-Based Family & Caregiver Portal**
   - Family members can view completed learning milestones and active schedules.
   - Complete privacy guarantee: Chat conversations are never exposed to caregivers.

---

## 🛠️ Technology Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti.
- **Backend:** Node.js, Express, TypeScript, TSX.
- **AI Integration:** Google Gemini SDK (`@google/genai`) with server-side multi-model failover (`gemini-2.5-flash`, `gemini-3.1-flash-lite`, `gemini-3.8-flash`).
- **Database & Auth:** Firebase Authentication, Cloud Firestore, ABAC Security Rules, and resilient local runtime cache.

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Environment Setup
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Configure your `GEMINI_API_KEY`. (In Google AI Studio, this is automatically injected at runtime).

### 3. Run Development Server
```bash
npm run dev
```
The server will boot on `http://localhost:3000` with full-stack API and Vite middleware mounted.

### 4. Run Test Suite
```bash
npm test
```
Executes the 26 automated unit and integration tests across safety, intent routing, verification, RAG, and database persistence.

### 5. Production Build
```bash
npm run build
```

---

## 🛡️ Security & Privacy Architecture

- **No Secret Exposure:** Gemini API keys and Firebase private credentials are never exposed to the client.
- **PII Scrubbing:** All credit cards, OTPs, and bank passwords are automatically redacted on the backend.
- **Zero Prompt Injection:** Dedicated regex and semantic guards block prompt override attacks.
- **Strict ABAC Firestore Rules:** Configured in `firestore.rules` preventing unauthorized writes.

---

## 📜 License
Apache-2.0
