# Buddy Elder AI REST API Documentation

All API requests pass through the Node.js Express server on `http://localhost:3000`.

---

## 1. AI & Multi-Agent Orchestrator

### `POST /api/chat`
Dispatches a user query through `BuddyAgentOrchestrator`.

**Request Body:**
```json
{
  "userId": "demo-elder-dadi",
  "message": "How do I send photos on WhatsApp?",
  "language": "en",
  "requestedAgent": "auto",
  "history": [
    { "role": "user", "text": "Hello Buddy" },
    { "role": "model", "text": "Hello! How can I help you today?" }
  ]
}
```

**Response:**
```json
{
  "reply": "1. Open WhatsApp by tapping the green icon.\n2. Tap on your family member's photo.\n3. Tap the paperclip or camera icon to pick your photo and send.",
  "selectedAgent": "education",
  "intent": "EDUCATION",
  "confidence": 0.9,
  "isEmergency": false,
  "verification": {
    "status": "VERIFIED",
    "confidenceScore": 0.95,
    "citedSources": ["WhatsApp Photo & Voice Note Guide"],
    "evidenceFound": true,
    "notes": "Answer closely aligns with verified educational materials."
  },
  "sources": [
    {
      "id": "chunk-whatsapp-photo",
      "title": "WhatsApp Photo & Voice Note Guide",
      "category": "WhatsApp & Communication",
      "confidence": 0.95
    }
  ],
  "status": "completed"
}
```

---

## 2. Scam & Fraud Analyzer

### `POST /api/scam/analyze`
Analyzes any suspicious SMS, message, or link for cyber fraud.

**Request Body:**
```json
{
  "message": "Your electricity will be cut tonight at 9:30 PM. Call 9876543210 or share OTP."
}
```

**Response:**
```json
{
  "isScam": true,
  "riskLevel": "HIGH",
  "riskScore": 85,
  "flaggedKeywords": ["Requests One-Time Password", "Urgent electricity disconnection threat"],
  "scamType": "Requests One-Time Password",
  "warningMessage": {
    "en": "DANGER: This message exhibits classic signs of cyber fraud. Do NOT reply or click links.",
    "hi": "⚠️ चेतावनी: यह संदेश धोखाधड़ी (फ्रॉड) का स्पष्ट प्रयास है। किसी भी लिंक पर क्लिक न करें।",
    "mr": "⚠️ सावधान: हा संदेश सायबर फसवणुकीचा (फ्रॉड) प्रकार असू शकतो."
  },
  "recommendedActions": [
    {
      "en": "Never share your OTP, UPI PIN, or bank password with anyone.",
      "hi": "अपना बैंक ओटीपी, यूपीआई पिन या पासवर्ड किसी को न बताएं।",
      "mr": "आपला बँक ओटीपी, यूपीआय पिन किंवा पासवर्ड कोणालाही सांगू नका."
    }
  ],
  "explanation": {
    "en": "Legitimate electricity providers never demand urgent fee transfers via personal mobile numbers."
  }
}
```

---

## 3. Digital Learning Academy

- `GET /api/courses`: Returns all 9 digital education courses with lessons and steps.
- `GET /api/progress/:userId`: Returns learning progress and quiz scores.
- `POST /api/progress`: Marks a lesson complete and updates scores.

---

## 4. Smart Reminders

- `GET /api/reminders/:userId`: Returns active medicine, water, and walk reminders.
- `POST /api/reminders`: Adds a new reminder with chime alert settings.
- `PATCH /api/reminders/:id/toggle`: Toggles reminder completion status.
- `DELETE /api/reminders/:id`: Deletes a reminder.

---

## 5. Admin & RAG Management

- `GET /api/admin/metrics`: Returns total interactions, latency, agent distribution, and emergency counts.
- `GET /api/admin/documents`: Returns approved RAG knowledge documents.
- `POST /api/admin/documents`: Dynamically ingests a new educational knowledge chunk.
- `DELETE /api/admin/documents/:id`: Deletes an ingested knowledge chunk.
