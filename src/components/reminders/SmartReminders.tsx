import React, { useState, useEffect } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useAuth } from '../../context/AuthContext';
import { getTranslation } from '../../utils/translations';
import {
  Bell,
  CheckCircle2,
  Plus,
  Trash2,
  Clock,
  Pill,
  Droplets,
  Footprints,
  Stethoscope,
  Volume2,
  X,
} from 'lucide-react';
import { Reminder } from '../../types';

export const SmartReminders: React.FC = () => {
  const { language, playTapSound } = useAccessibility();
  const { userProfile } = useAuth();
  const t = getTranslation(language);

  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('09:00');
  const [newCategory, setNewCategory] = useState<'medicine' | 'water' | 'walk' | 'doctor'>('medicine');
  const [newNotes, setNewNotes] = useState('');

  // Fetch reminders
  useEffect(() => {
    fetch(`/api/reminders/${userProfile?.uid || 'demo-elder-dadi'}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setReminders(data);
      })
      .catch(() => {});
  }, [userProfile?.uid]);

  const handleToggle = (id: string) => {
    playTapSound();
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r))
    );
    fetch(`/api/reminders/${id}/toggle`, { method: 'PATCH' }).catch(() => {});
  };

  const handleDelete = (id: string) => {
    playTapSound();
    setReminders((prev) => prev.filter((r) => r.id !== id));
    fetch(`/api/reminders/${id}`, { method: 'DELETE' }).catch(() => {});
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    playTapSound();
    const payload = {
      userId: userProfile?.uid || 'demo-elder-dadi',
      title: newTitle.trim(),
      time: newTime,
      category: newCategory,
      frequency: 'daily',
      createdBy: userProfile?.role === 'caregiver' ? 'caregiver' : 'elder',
      audioAlert: true,
      notes: newNotes.trim() || undefined,
    };

    fetch('/api/reminders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((created) => {
        setReminders((prev) => [...prev, created]);
        setShowAddModal(false);
        setNewTitle('');
        setNewNotes('');
      })
      .catch(() => {});
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'water':
        return Droplets;
      case 'walk':
        return Footprints;
      case 'doctor':
        return Stethoscope;
      case 'medicine':
      default:
        return Pill;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-black uppercase tracking-wider">
              Caregiver & Elder Synced
            </span>
            <span className="px-3 py-1 bg-purple-300 text-purple-950 rounded-full text-xs font-black">
              Chime Alert Active
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">{t.nav.reminders}</h2>
          <p className="text-purple-100 text-sm sm:text-base font-medium max-w-xl mt-1">
            Never miss morning medicines, warm water sips, or pleasant evening strolls.
          </p>
        </div>

        <button
          onClick={() => {
            playTapSound();
            setShowAddModal(true);
          }}
          className="px-5 py-3.5 bg-white text-purple-900 hover:bg-purple-50 active:scale-95 font-black text-sm sm:text-base rounded-2xl shadow-lg flex items-center gap-2 transition-transform cursor-pointer shrink-0"
        >
          <Plus className="w-5 h-5" />
          <span>Add Reminder</span>
        </button>
      </div>

      {/* Reminders List */}
      <div className="space-y-3">
        {reminders.map((rem) => {
          const Icon = getCategoryIcon(rem.category);
          return (
            <div
              key={rem.id}
              className={`p-5 rounded-3xl border-2 transition-all flex items-center justify-between gap-4 ${
                rem.completed
                  ? 'bg-slate-50 border-slate-200 opacity-60'
                  : 'bg-white border-purple-200 shadow-sm hover:border-purple-300'
              }`}
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleToggle(rem.id)}
                  className={`w-9 h-9 rounded-xl border-2 flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                    rem.completed
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-slate-400 bg-white hover:border-purple-500'
                  }`}
                  aria-label={`Mark ${rem.title} complete`}
                >
                  {rem.completed && <CheckCircle2 className="w-6 h-6" />}
                </button>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-black bg-purple-100 text-purple-800 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {rem.time}
                    </span>
                    <span className="text-xs font-bold text-slate-500 capitalize">
                      {rem.category} • Set by {rem.createdBy}
                    </span>
                  </div>
                  <h4
                    className={`font-bold text-base sm:text-lg text-slate-900 ${
                      rem.completed ? 'line-through text-slate-500' : ''
                    }`}
                  >
                    {rem.title}
                  </h4>
                  {rem.notes && (
                    <p className="text-xs font-medium text-slate-500">{rem.notes}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    playTapSound();
                    handleDelete(rem.id);
                  }}
                  className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                  title="Delete Reminder"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Reminder Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-xl font-black text-slate-900">Add Daily Reminder</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Reminder Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Afternoon Blood Pressure Tablet"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-3.5 border-2 border-slate-200 rounded-xl text-base font-semibold focus:outline-none focus:border-purple-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Time (24h)
                  </label>
                  <input
                    type="time"
                    required
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full p-3.5 border-2 border-slate-200 rounded-xl text-base font-bold focus:outline-none focus:border-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full p-3.5 border-2 border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:border-purple-600"
                  >
                    <option value="medicine">Medicine</option>
                    <option value="water">Warm Water</option>
                    <option value="walk">Daily Walk</option>
                    <option value="doctor">Doctor Visit</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Instructions / Notes (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Take with warm water after eating"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full p-3 border-2 border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-purple-600"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-black text-base rounded-2xl shadow-md cursor-pointer"
                >
                  Save Reminder
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
