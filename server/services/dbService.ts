import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { LearningProgress, Reminder, AgentType, VerificationStatus } from '../../src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '..', '..', 'buddy_runtime_data.json');

export interface InteractionLog {
  id: string;
  userId: string;
  agentUsed: AgentType;
  intent: string;
  question: string;
  answer: string;
  language: string;
  verificationStatus: VerificationStatus;
  confidenceScore: number;
  responseTimeMs: number;
  timestamp: string;
}

export interface FeedbackRecord {
  id: string;
  interactionId: string;
  rating: 'Good' | 'Needs Improvement';
  comments?: string;
  timestamp: string;
}

export interface EmergencyEventRecord {
  id: string;
  userId: string;
  category: string;
  details: string;
  status: 'triggered' | 'notified_caregiver' | 'resolved';
  timestamp: string;
}

interface RuntimeDatabase {
  interactions: InteractionLog[];
  learningProgress: Record<string, LearningProgress>;
  reminders: Reminder[];
  feedback: FeedbackRecord[];
  emergencies: EmergencyEventRecord[];
}

let dbState: RuntimeDatabase = {
  interactions: [],
  learningProgress: {
    'demo-elder-dadi': {
      userId: 'demo-elder-dadi',
      completedLessonIds: ['touch-gestures', 'volume-controls'],
      inProgressLessonId: 'screen-lock',
      quizScores: { 'touch-gestures': 100, 'volume-controls': 100 },
      totalMinutesSpent: 28,
      lastUpdated: new Date().toISOString(),
    },
  },
  reminders: [
    {
      id: 'rem-1',
      userId: 'demo-elder-dadi',
      title: 'Morning Blood Pressure Medicine (Amlodipine 5mg)',
      time: '08:30',
      frequency: 'daily',
      category: 'medicine',
      completed: true,
      createdBy: 'caregiver',
      audioAlert: true,
      notes: 'Take with warm water after breakfast',
    },
    {
      id: 'rem-2',
      userId: 'demo-elder-dadi',
      title: 'Afternoon Hydration (1 Glass Warm Water)',
      time: '14:00',
      frequency: 'daily',
      category: 'water',
      completed: false,
      createdBy: 'elder',
      audioAlert: true,
    },
    {
      id: 'rem-3',
      userId: 'demo-elder-dadi',
      title: 'Evening Balcony Walk (15 mins gentle stroll)',
      time: '17:30',
      frequency: 'daily',
      category: 'walk',
      completed: false,
      createdBy: 'caregiver',
      audioAlert: false,
    },
  ],
  feedback: [],
  emergencies: [],
};

// Load saved data if file exists
try {
  if (fs.existsSync(DATA_FILE)) {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    dbState = { ...dbState, ...JSON.parse(raw) };
  }
} catch (err) {
  console.warn('Could not load persisted runtime data file:', err);
}

function persistState() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(dbState, null, 2), 'utf8');
  } catch (err) {
    console.warn('Could not persist runtime data file:', err);
  }
}

export const DatabaseService = {
  saveInteraction(log: Omit<InteractionLog, 'id' | 'timestamp'>): InteractionLog {
    const record: InteractionLog = {
      ...log,
      id: `int-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
    };
    dbState.interactions.unshift(record);
    if (dbState.interactions.length > 500) {
      dbState.interactions.pop();
    }
    persistState();
    return record;
  },

  getAllInteractions(): InteractionLog[] {
    return dbState.interactions;
  },

  getLearningProgress(userId: string): LearningProgress {
    if (!dbState.learningProgress[userId]) {
      dbState.learningProgress[userId] = {
        userId,
        completedLessonIds: [],
        quizScores: {},
        totalMinutesSpent: 0,
        lastUpdated: new Date().toISOString(),
      };
    }
    return dbState.learningProgress[userId];
  },

  updateLearningProgress(
    userId: string,
    lessonId: string,
    isCompleted = true,
    score?: number
  ): LearningProgress {
    const progress = this.getLearningProgress(userId);
    if (isCompleted && !progress.completedLessonIds.includes(lessonId)) {
      progress.completedLessonIds.push(lessonId);
    }
    if (score !== undefined) {
      progress.quizScores[lessonId] = score;
    }
    progress.totalMinutesSpent += 5;
    progress.lastUpdated = new Date().toISOString();
    dbState.learningProgress[userId] = progress;
    persistState();
    return progress;
  },

  getReminders(userId: string): Reminder[] {
    return dbState.reminders.filter((r) => r.userId === userId || r.userId === 'demo-elder-dadi');
  },

  addReminder(reminder: Omit<Reminder, 'id'>): Reminder {
    const newRem: Reminder = {
      ...reminder,
      id: `rem-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    };
    dbState.reminders.push(newRem);
    persistState();
    return newRem;
  },

  toggleReminder(id: string): Reminder | null {
    const rem = dbState.reminders.find((r) => r.id === id);
    if (rem) {
      rem.completed = !rem.completed;
      persistState();
      return rem;
    }
    return null;
  },

  deleteReminder(id: string): boolean {
    const prev = dbState.reminders.length;
    dbState.reminders = dbState.reminders.filter((r) => r.id !== id);
    persistState();
    return dbState.reminders.length < prev;
  },

  saveFeedback(interactionId: string, rating: 'Good' | 'Needs Improvement', comments?: string): FeedbackRecord {
    const rec: FeedbackRecord = {
      id: `fb-${Date.now()}`,
      interactionId,
      rating,
      comments,
      timestamp: new Date().toISOString(),
    };
    dbState.feedback.push(rec);
    persistState();
    return rec;
  },

  logEmergency(userId: string, category: string, details: string): EmergencyEventRecord {
    const rec: EmergencyEventRecord = {
      id: `emg-${Date.now()}`,
      userId,
      category,
      details,
      status: 'triggered',
      timestamp: new Date().toISOString(),
    };
    dbState.emergencies.unshift(rec);
    persistState();
    return rec;
  },

  getMetrics() {
    const totalInteractions = dbState.interactions.length;
    const avgResponseTime =
      totalInteractions > 0
        ? Math.round(
            dbState.interactions.reduce((acc, curr) => acc + (curr.responseTimeMs || 0), 0) / totalInteractions
          )
        : 120;

    const agentCounts: Record<string, number> = {};
    for (const log of dbState.interactions) {
      agentCounts[log.agentUsed] = (agentCounts[log.agentUsed] || 0) + 1;
    }

    return {
      totalInteractions,
      avgResponseTimeMs: avgResponseTime,
      agentDistribution: agentCounts,
      totalEmergencies: dbState.emergencies.length,
      feedbackCount: dbState.feedback.length,
      activeRemindersCount: dbState.reminders.length,
    };
  },
};
