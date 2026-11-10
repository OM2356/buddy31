import React, { useState, useEffect } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useAuth } from '../../context/AuthContext';
import { getTranslation } from '../../utils/translations';
import {
  Users,
  ShieldCheck,
  Award,
  Bell,
  HeartPulse,
  Plus,
  Lock,
  Clock,
  CheckCircle2,
  PhoneCall,
  UserCheck,
} from 'lucide-react';
import { LearningProgress, Reminder } from '../../types';

export const CaregiverPortal: React.FC = () => {
  const { language, playTapSound } = useAccessibility();
  const { userProfile } = useAuth();
  const t = getTranslation(language);

  const [progress, setProgress] = useState<LearningProgress | null>(null);
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    fetch('/api/progress/demo-elder-dadi')
      .then((res) => res.json())
      .then((d) => setProgress(d))
      .catch(() => {});

    fetch('/api/reminders/demo-elder-dadi')
      .then((res) => res.json())
      .then((r) => {
        if (Array.isArray(r)) setReminders(r);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-700 via-cyan-800 to-teal-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-black uppercase tracking-wider">
            Family & Caregiver Portal
          </span>
          <span className="px-3 py-1 bg-teal-300 text-teal-950 rounded-full text-xs font-black">
            Consent-Based Link
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight">{t.caregiver.title}</h2>
        <p className="text-teal-100 text-sm sm:text-base font-medium max-w-2xl mt-1">
          {t.caregiver.subtitle}
        </p>
      </div>

      {/* Explicit Privacy & Consent Banner */}
      <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-5 flex items-start gap-4">
        <div className="p-3 bg-emerald-600 text-white rounded-2xl shrink-0 mt-0.5">
          <Lock className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 className="font-black text-emerald-950 text-base">
            Privacy Guaranteed: Zero Chat Surveillance
          </h4>
          <p className="text-sm font-medium text-emerald-900 leading-relaxed">
            {t.caregiver.consentNotice} Buddy never allows family or caregivers to read private
            companion conversations. Only approved milestones (completed digital skills and medicine
            schedules) are shared.
          </p>
        </div>
      </div>

      {/* Connected Senior Profile Card */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 font-black text-2xl flex items-center justify-center border-2 border-amber-300 shrink-0">
              👵
            </div>
            <div>
              <span className="text-xs font-black text-blue-600 uppercase tracking-wider">
                Connected Loved One
              </span>
              <h3 className="text-2xl font-black text-slate-900">Savitri Devi (Dadi)</h3>
              <p className="text-xs sm:text-sm font-medium text-slate-500">
                Primary Phone: +91 98765 43210 • Emergency Contact: Rohan Sharma (Grandson)
              </p>
            </div>
          </div>

          <a
            href="tel:+919876543210"
            className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl flex items-center gap-2 shadow-xs cursor-pointer w-fit"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call Dadi</span>
          </a>
        </div>

        {/* Milestone Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 space-y-1">
            <span className="text-xs font-bold uppercase text-blue-600 flex items-center gap-1">
              <Award className="w-4 h-4" />
              Digital Learning
            </span>
            <div className="text-3xl font-black text-blue-950">
              {progress?.completedLessonIds?.length || 2}
            </div>
            <p className="text-xs font-semibold text-slate-600">Lessons Completed Independently</p>
          </div>

          <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 space-y-1">
            <span className="text-xs font-bold uppercase text-purple-600 flex items-center gap-1">
              <Bell className="w-4 h-4" />
              Active Reminders
            </span>
            <div className="text-3xl font-black text-purple-950">{reminders.length}</div>
            <p className="text-xs font-semibold text-slate-600">Medicine & Water Schedules</p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
            <span className="text-xs font-bold uppercase text-emerald-600 flex items-center gap-1">
              <HeartPulse className="w-4 h-4" />
              Safety Check Status
            </span>
            <div className="text-2xl font-black text-emerald-950">Protected</div>
            <p className="text-xs font-semibold text-slate-600">No Active Fall/SOS Trigger</p>
          </div>
        </div>

        {/* Active Reminders Overview for Caregiver */}
        <div className="space-y-3 pt-2">
          <h4 className="font-black text-slate-900 text-lg flex items-center justify-between">
            <span>Dadi's Daily Schedule (Medicine & Health)</span>
            <span className="text-xs font-bold text-slate-400">Synced in Real-time</span>
          </h4>

          <div className="space-y-2">
            {reminders.map((rem) => (
              <div
                key={rem.id}
                className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-black text-purple-800">
                    {rem.time}
                  </span>
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">{rem.title}</h5>
                    <p className="text-xs text-slate-500 capitalize">{rem.category}</p>
                  </div>
                </div>

                <span
                  className={`text-xs font-black px-2.5 py-1 rounded-lg ${
                    rem.completed
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {rem.completed ? 'Taken ✅' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
