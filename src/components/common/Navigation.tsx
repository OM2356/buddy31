import React from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useAuth } from '../../context/AuthContext';
import { getTranslation } from '../../utils/translations';
import {
  Home,
  MessageSquare,
  BookOpen,
  Smartphone,
  ShieldAlert,
  HeartPulse,
  Bell,
  Users,
  FolderOpen,
  Settings,
} from 'lucide-react';

export type TabKey =
  | 'home'
  | 'chat'
  | 'learning'
  | 'simulator'
  | 'scamDetector'
  | 'wellness'
  | 'reminders'
  | 'caregiver'
  | 'knowledge'
  | 'admin';

interface NavigationProps {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onSelectTab }) => {
  const { language, playTapSound } = useAccessibility();
  const { userProfile } = useAuth();
  const t = getTranslation(language);

  const navItems: Array<{ key: TabKey; label: string; icon: React.FC<any>; badge?: string; roles?: string[] }> = [
    { key: 'home', label: t.nav.home, icon: Home },
    { key: 'chat', label: t.nav.chat, icon: MessageSquare, badge: 'AI Voice' },
    { key: 'learning', label: t.nav.learning, icon: BookOpen },
    { key: 'simulator', label: t.nav.simulator, icon: Smartphone, badge: 'Interactive' },
    { key: 'scamDetector', label: t.nav.scamDetector, icon: ShieldAlert },
    { key: 'wellness', label: t.nav.wellness, icon: HeartPulse },
    { key: 'reminders', label: t.nav.reminders, icon: Bell },
    { key: 'caregiver', label: t.nav.caregiver, icon: Users },
    { key: 'knowledge', label: t.nav.knowledge, icon: FolderOpen },
  ];

  // Show Admin if user is admin or for preview
  if (userProfile?.role === 'admin' || userProfile?.email === 'omkarsathe3103@gmail.com') {
    navItems.push({ key: 'admin', label: t.nav.admin, icon: Settings });
  }

  return (
    <nav className="bg-white border-b border-slate-200 shadow-xs overflow-x-auto scrollbar-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 sm:gap-2 py-2 min-w-max">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;

            return (
              <button
                key={item.key}
                onClick={() => {
                  playTapSound();
                  onSelectTab(item.key);
                }}
                className={`relative px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl font-bold text-sm sm:text-base flex items-center gap-2 transition-all cursor-pointer select-none tap-target-senior ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.02]'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`ml-1 px-1.5 py-0.5 text-[10px] sm:text-xs font-black rounded-md uppercase tracking-wider ${
                      isActive ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
