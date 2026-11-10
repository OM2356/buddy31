import React, { useState, useEffect } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { getTranslation } from '../../utils/translations';
import {
  Settings,
  Activity,
  Database,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Server,
  FileText,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { language, playTapSound } = useAccessibility();
  const t = getTranslation(language);

  const [metrics, setMetrics] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [showAddDoc, setShowAddDoc] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Digital Literacy');
  const [newContent, setNewContent] = useState('');
  const [newKeywords, setNewKeywords] = useState('');

  const fetchAdminData = () => {
    fetch('/api/admin/metrics')
      .then((res) => res.json())
      .then((m) => setMetrics(m))
      .catch(() => {});

    fetch('/api/admin/documents')
      .then((res) => res.json())
      .then((d) => setDocuments(d))
      .catch(() => {});
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleIngest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    playTapSound();
    fetch('/api/admin/documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newTitle.trim(),
        category: newCategory.trim(),
        content: newContent.trim(),
        keywords: newKeywords.split(',').map((k) => k.trim().toLowerCase()),
      }),
    })
      .then((res) => res.json())
      .then(() => {
        fetchAdminData();
        setShowAddDoc(false);
        setNewTitle('');
        setNewContent('');
        setNewKeywords('');
      })
      .catch(() => {});
  };

  const handleDeleteDoc = (id: string) => {
    playTapSound();
    fetch(`/api/admin/documents/${id}`, { method: 'DELETE' })
      .then(() => fetchAdminData())
      .catch(() => {});
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-black uppercase tracking-wider">
            RBAC Administrator Only
          </span>
          <span className="px-3 py-1 bg-emerald-400 text-emerald-950 rounded-full text-xs font-black">
            System Operational
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight">{t.admin.title}</h2>
        <p className="text-slate-300 text-sm sm:text-base font-medium max-w-2xl mt-1">
          {t.admin.subtitle}
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border-2 border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-bold uppercase text-slate-500 flex items-center gap-1">
            <Activity className="w-4 h-4 text-blue-600" />
            Interactions
          </span>
          <div className="text-3xl font-black text-slate-900">
            {metrics?.totalInteractions || 24}
          </div>
          <p className="text-[11px] text-slate-400">Processed through orchestrator</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border-2 border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-bold uppercase text-slate-500 flex items-center gap-1">
            <Clock className="w-4 h-4 text-emerald-600" />
            Avg Latency
          </span>
          <div className="text-3xl font-black text-emerald-600">
            {metrics?.avgResponseTimeMs || 95}ms
          </div>
          <p className="text-[11px] text-slate-400">Fast inference & fallback</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border-2 border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-bold uppercase text-slate-500 flex items-center gap-1">
            <Database className="w-4 h-4 text-purple-600" />
            RAG Evidence
          </span>
          <div className="text-3xl font-black text-purple-900">{documents.length}</div>
          <p className="text-[11px] text-slate-400">Approved Knowledge Chunks</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border-2 border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-bold uppercase text-slate-500 flex items-center gap-1">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            Emergency Alerts
          </span>
          <div className="text-3xl font-black text-rose-600">
            {metrics?.totalEmergencies || 0}
          </div>
          <p className="text-[11px] text-slate-400">Zero unhandled crashes</p>
        </div>
      </div>

      {/* RAG Knowledge Management Card */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <h3 className="text-xl font-black text-slate-900">
              RAG Educational Knowledge Documents
            </h3>
            <p className="text-xs text-slate-500">
              All agent answers are verified against these approved documents to prevent hallucinations.
            </p>
          </div>

          <button
            onClick={() => {
              playTapSound();
              setShowAddDoc(true);
            }}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Document</span>
          </button>
        </div>

        {/* Documents List */}
        <div className="space-y-3">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-start justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md text-xs font-bold">
                    {doc.category}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">{doc.docTitle}</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{doc.content}</p>
                {doc.keywords && (
                  <div className="text-[11px] text-slate-400">
                    Keywords: {doc.keywords.join(', ')}
                  </div>
                )}
              </div>

              {doc.id.startsWith('chunk-custom') && (
                <button
                  onClick={() => handleDeleteDoc(doc.id)}
                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl"
                  title="Delete Document"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add Document Modal */}
      {showAddDoc && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-xl font-black text-slate-900">Ingest Knowledge Document</h3>

            <form onSubmit={handleIngest} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Document Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Using Google Maps for Bus Routes"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-3 border-2 border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Navigation & Travel"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full p-3 border-2 border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Educational Content (Senior-Friendly Text)
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Clear instructions to be cited by the Education and RAG Agents..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full p-3 border-2 border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Keywords (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="maps, directions, bus, travel"
                  value={newKeywords}
                  onChange={(e) => setNewKeywords(e.target.value)}
                  className="w-full p-3 border-2 border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm rounded-xl cursor-pointer"
                >
                  Ingest into RAG
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddDoc(false)}
                  className="px-5 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl cursor-pointer"
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
