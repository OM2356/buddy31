import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { orchestrateBuddyQuery } from './server/orchestrator/buddyAgentOrchestrator';
import { analyzeSuspiciousMessage } from './server/services/scamAnalysisService';
import {
  getAllKnowledgeChunks,
  ingestEducationalDocument,
  deleteKnowledgeChunk,
} from './server/services/ragService';
import { DatabaseService } from './server/services/dbService';
import { LEARNING_COURSES } from './src/data/courses';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ----------------------------------------------------
// 1. Central Multi-Agent Orchestrator Route
// ----------------------------------------------------
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, userId, requestedAgent, language, history } = req.body;
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message text is required.' });
      return;
    }

    const response = await orchestrateBuddyQuery({
      message,
      userId,
      requestedAgent,
      language: language || 'en',
      history: history || [],
    });

    res.json(response);
  } catch (err: any) {
    console.error('[API /api/chat error]:', err);
    res.status(500).json({
      error: 'Orchestrator processing failed.',
      details: err?.message || String(err),
    });
  }
});

// ----------------------------------------------------
// 2. Scam & Fraud Analyzer Route
// ----------------------------------------------------
app.post('/api/scam/analyze', async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message text is required.' });
      return;
    }

    const result = await analyzeSuspiciousMessage(message);
    res.json(result);
  } catch (err: any) {
    console.error('[API /api/scam/analyze error]:', err);
    res.status(500).json({ error: 'Scam analysis failed.' });
  }
});

// ----------------------------------------------------
// 3. Digital Learning Academy Routes
// ----------------------------------------------------
app.get('/api/courses', (_req: Request, res: Response) => {
  res.json(LEARNING_COURSES);
});

app.get('/api/progress/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;
  const progress = DatabaseService.getLearningProgress(userId);
  res.json(progress);
});

app.post('/api/progress', (req: Request, res: Response) => {
  const { userId, lessonId, isCompleted, score } = req.body;
  if (!userId || !lessonId) {
    res.status(400).json({ error: 'userId and lessonId are required.' });
    return;
  }
  const updated = DatabaseService.updateLearningProgress(
    userId,
    lessonId,
    isCompleted !== false,
    score
  );
  res.json(updated);
});

// ----------------------------------------------------
// 4. Smart Reminders Routes
// ----------------------------------------------------
app.get('/api/reminders/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;
  const reminders = DatabaseService.getReminders(userId);
  res.json(reminders);
});

app.post('/api/reminders', (req: Request, res: Response) => {
  const { userId, title, time, frequency, category, createdBy, audioAlert, notes } = req.body;
  if (!userId || !title || !time) {
    res.status(400).json({ error: 'userId, title, and time are required.' });
    return;
  }
  const created = DatabaseService.addReminder({
    userId,
    title,
    time,
    frequency: frequency || 'daily',
    category: category || 'medicine',
    completed: false,
    createdBy: createdBy || 'elder',
    audioAlert: audioAlert !== false,
    notes,
  });
  res.json(created);
});

app.patch('/api/reminders/:id/toggle', (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = DatabaseService.toggleReminder(id);
  if (!updated) {
    res.status(404).json({ error: 'Reminder not found.' });
    return;
  }
  res.json(updated);
});

app.delete('/api/reminders/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const success = DatabaseService.deleteReminder(id);
  res.json({ success });
});

// ----------------------------------------------------
// 5. Emergency SOS Logging Route
// ----------------------------------------------------
app.post('/api/emergency/trigger', (req: Request, res: Response) => {
  const { userId, category, details } = req.body;
  const logged = DatabaseService.logEmergency(
    userId || 'demo-elder-dadi',
    category || 'general',
    details || 'User tapped Emergency SOS button'
  );
  res.json(logged);
});

// ----------------------------------------------------
// 6. User Feedback Route
// ----------------------------------------------------
app.post('/api/feedback', (req: Request, res: Response) => {
  const { interactionId, rating, comments } = req.body;
  if (!interactionId || !rating) {
    res.status(400).json({ error: 'interactionId and rating are required.' });
    return;
  }
  const rec = DatabaseService.saveFeedback(interactionId, rating, comments);
  res.json(rec);
});

// ----------------------------------------------------
// 7. System Admin & RAG Document Routes
// ----------------------------------------------------
app.get('/api/admin/metrics', (_req: Request, res: Response) => {
  const metrics = DatabaseService.getMetrics();
  res.json(metrics);
});

app.get('/api/admin/documents', (_req: Request, res: Response) => {
  const docs = getAllKnowledgeChunks();
  res.json(docs);
});

app.post('/api/admin/documents', (req: Request, res: Response) => {
  const { title, category, content, keywords } = req.body;
  if (!title || !content) {
    res.status(400).json({ error: 'Title and content are required.' });
    return;
  }
  const doc = ingestEducationalDocument(
    title,
    category || 'General',
    content,
    Array.isArray(keywords) ? keywords : [keywords]
  );
  res.json(doc);
});

app.delete('/api/admin/documents/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = deleteKnowledgeChunk(id);
  res.json({ success: deleted });
});

// ----------------------------------------------------
// 8. Server Startup & Dev Vite Middleware Mounting
// ----------------------------------------------------
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Buddy Elder AI] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[Buddy Elder AI] Startup error:', err);
});
