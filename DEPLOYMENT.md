# Buddy Elder AI Deployment & Configuration Guide

## 1. Prerequisites

- Node.js (version 20 or higher)
- NPM or Bun
- Google Gemini API Key
- Firebase Project (configured via `firebase-applet-config.json`)

---

## 2. Environment Variables

Create `.env` based on `.env.example`:
```env
GEMINI_API_KEY="your-gemini-api-key"
PORT=3000
NODE_ENV=production
```

---

## 3. Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run automated test suite
npm run test

# 3. Start development server
npm run dev
```

---

## 4. Production Build & Deployment

```bash
# Build Vite client bundles
npm run build

# Start production server
npm run start
```

In production mode, `server.ts` statically serves the optimized production assets located in `dist/` and acts as the API backend on port 3000.

---

## 5. Firebase Setup & Security Rules

To deploy the Firestore security rules:
- `firestore.rules` enforces Attribute-Based Access Control (ABAC) and isolates personal health and caregiver data.
- Run `DeployRules` via Firebase CLI or AI Studio integration tool.
