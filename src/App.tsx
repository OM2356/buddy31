import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { Header } from './components/common/Header';
import { Navigation, TabKey } from './components/common/Navigation';
import { Footer } from './components/common/Footer';
import { HomeWelcome } from './components/common/HomeWelcome';
import { ChatAgent } from './components/chat/ChatAgent';
import { DigitalLearning } from './components/learning/DigitalLearning';
import { PhoneSimulator } from './components/simulator/PhoneSimulator';
import { ScamDetector } from './components/safety/ScamDetector';
import { WellnessCenter } from './components/wellness/WellnessCenter';
import { SmartReminders } from './components/reminders/SmartReminders';
import { CaregiverPortal } from './components/caregiver/CaregiverPortal';
import { KnowledgeHub } from './components/knowledge/KnowledgeHub';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { EmergencyModal } from './components/emergency/EmergencyModal';
import { AuthModal } from './components/auth/AuthModal';

function AppContent() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 transition-colors font-sans antialiased">
      {/* Top Header */}
      <Header
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Main Tab Navigation */}
      <Navigation activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 py-4 sm:py-6">
        {activeTab === 'home' && (
          <HomeWelcome
            onNavigate={(tab) => setActiveTab(tab)}
            onOpenEmergency={() => setIsEmergencyOpen(true)}
          />
        )}
        {activeTab === 'chat' && <ChatAgent />}
        {activeTab === 'learning' && <DigitalLearning />}
        {activeTab === 'simulator' && <PhoneSimulator />}
        {activeTab === 'scamDetector' && <ScamDetector />}
        {activeTab === 'wellness' && <WellnessCenter />}
        {activeTab === 'reminders' && <SmartReminders />}
        {activeTab === 'caregiver' && <CaregiverPortal />}
        {activeTab === 'knowledge' && <KnowledgeHub />}
        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      {/* Bottom Footer */}
      <Footer />

      {/* Emergency Modal */}
      <EmergencyModal isOpen={isEmergencyOpen} onClose={() => setIsEmergencyOpen(false)} />

      {/* Account / Role Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AccessibilityProvider>
        <AppContent />
      </AccessibilityProvider>
    </AuthProvider>
  );
}
