import React, { useState } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useAuth } from '../../context/AuthContext';
import { getTranslation } from '../../utils/translations';
import {
  AlertTriangle,
  PhoneCall,
  ShieldAlert,
  UserCheck,
  X,
  Volume2,
  VolumeX,
  MessageSquare,
  CheckCircle2,
} from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  const { language, playTapSound } = useAccessibility();
  const { userProfile } = useAuth();
  const t = getTranslation(language);

  const [confirmTarget, setConfirmTarget] = useState<{ number: string; name: string } | null>(null);
  const [alertSirenActive, setAlertSirenActive] = useState<boolean>(false);
  const [smsSent, setSmsSent] = useState<boolean>(false);

  if (!isOpen) return null;

  const triggerCall = (number: string, name: string) => {
    playTapSound();
    setConfirmTarget({ number, name });
  };

  const executeConfirmedCall = () => {
    if (!confirmTarget) return;
    // Log emergency call to server
    fetch('/api/emergency/trigger', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: userProfile?.uid,
        category: 'call_dialed',
        details: `Dialed ${confirmTarget.name} (${confirmTarget.number})`,
      }),
    }).catch(() => {});

    window.location.href = `tel:${confirmTarget.number}`;
    setConfirmTarget(null);
  };

  const handleSendFamilySms = () => {
    playTapSound();
    setSmsSent(true);
    fetch('/api/emergency/trigger', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: userProfile?.uid,
        category: 'family_sms_alert',
        details: 'Sent Emergency Alert to caregiver and family contacts.',
      }),
    }).catch(() => {});
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full border-4 border-red-600 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="bg-red-600 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-2xl animate-pulse">
              <AlertTriangle className="w-8 h-8 fill-white stroke-red-600" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">{t.emergency.title}</h2>
              <p className="text-red-100 text-sm font-medium">{t.emergency.subtitle}</p>
            </div>
          </div>
          <button
            onClick={() => {
              playTapSound();
              onClose();
            }}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-2xl text-white transition-colors cursor-pointer"
            aria-label="Close emergency modal"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* Confirmation Dialog Overlay to prevent accidental clicks */}
        {confirmTarget && (
          <div className="absolute inset-0 z-20 bg-slate-900/90 flex items-center justify-center p-6 text-center text-white">
            <div className="max-w-md w-full bg-slate-800 p-8 rounded-3xl border-2 border-red-500 shadow-2xl">
              <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-bounce" />
              <h3 className="text-2xl font-black mb-2">{t.emergency.confirmTitle}</h3>
              <p className="text-slate-300 text-lg mb-6">
                {t.emergency.confirmDesc}
                <br />
                <span className="text-white font-bold text-xl block mt-2">
                  {confirmTarget.name} ({confirmTarget.number})
                </span>
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={executeConfirmedCall}
                  className="px-6 py-4 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black text-lg rounded-2xl shadow-lg transition-transform cursor-pointer"
                >
                  {t.emergency.dialNow}
                </button>
                <button
                  onClick={() => setConfirmTarget(null)}
                  className="px-6 py-4 bg-slate-700 hover:bg-slate-600 active:scale-95 text-slate-200 font-bold text-lg rounded-2xl transition-colors cursor-pointer"
                >
                  {t.emergency.cancelDial}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Main 112 & 1930 Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 112 National Helpline */}
            <button
              onClick={() => triggerCall('112', 'National Emergency (112)')}
              className="p-6 bg-red-50 hover:bg-red-100 border-3 border-red-500 rounded-3xl text-left flex items-start gap-4 transition-all hover:shadow-lg active:scale-98 cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                <PhoneCall className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-red-600 bg-red-200/60 px-2 py-0.5 rounded-md">
                  All-in-One National
                </span>
                <h4 className="text-2xl font-black text-slate-900 mt-1">112</h4>
                <p className="text-sm font-semibold text-slate-600 mt-0.5">
                  Police, Ambulance, Fire & Medical
                </p>
              </div>
            </button>

            {/* 1930 Cybercrime */}
            <button
              onClick={() => triggerCall('1930', 'Cyber Crime Fraud Helpline (1930)')}
              className="p-6 bg-amber-50 hover:bg-amber-100 border-3 border-amber-500 rounded-3xl text-left flex items-start gap-4 transition-all hover:shadow-lg active:scale-98 cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-200/60 px-2 py-0.5 rounded-md">
                  Financial Scam / Fraud
                </span>
                <h4 className="text-2xl font-black text-slate-900 mt-1">1930</h4>
                <p className="text-sm font-semibold text-slate-600 mt-0.5">
                  Freeze unauthorized bank transactions
                </p>
              </div>
            </button>
          </div>

          {/* Secondary Helplines */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => triggerCall('14567', 'National Elderline (14567)')}
              className="p-4 bg-slate-50 hover:bg-slate-100 border-2 border-slate-300 rounded-2xl flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div>
                <h5 className="font-bold text-slate-900 text-base">Elderline (14567)</h5>
                <p className="text-xs text-slate-500">Free emotional & legal support for seniors</p>
              </div>
              <span className="px-3 py-1.5 bg-blue-600 text-white font-black text-sm rounded-xl">
                Call
              </span>
            </button>

            <button
              onClick={() => triggerCall('108', 'Medical Ambulance (108)')}
              className="p-4 bg-slate-50 hover:bg-slate-100 border-2 border-slate-300 rounded-2xl flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div>
                <h5 className="font-bold text-slate-900 text-base">Ambulance (108)</h5>
                <p className="text-xs text-slate-500">Government emergency medical response</p>
              </div>
              <span className="px-3 py-1.5 bg-red-600 text-white font-black text-sm rounded-xl">
                Call
              </span>
            </button>
          </div>

          {/* Family & Caregiver Notification Section */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-blue-900 font-black text-lg">
                <UserCheck className="w-5 h-5 text-blue-600" />
                <span>{t.emergency.familyContacts}</span>
              </div>
              <button
                onClick={handleSendFamilySms}
                disabled={smsSent}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                  smsSent
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                }`}
              >
                {smsSent ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Alert Dispatched!
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-4 h-4" />
                    {t.emergency.notifyCaregiver}
                  </>
                )}
              </button>
            </div>

            {userProfile?.emergencyContacts && userProfile.emergencyContacts.length > 0 ? (
              <div className="space-y-2">
                {userProfile.emergencyContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="bg-white p-3.5 rounded-2xl border border-blue-100 flex items-center justify-between"
                  >
                    <div>
                      <h6 className="font-bold text-slate-900 text-sm sm:text-base">
                        {contact.name} ({contact.relation})
                      </h6>
                      <p className="text-xs text-slate-500">{contact.phone}</p>
                    </div>
                    <button
                      onClick={() => triggerCall(contact.phone, contact.name)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl flex items-center gap-1 shadow-xs cursor-pointer"
                    >
                      <PhoneCall className="w-4 h-4" />
                      Dial
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-600">
                Primary caregiver: Rohan Sharma (+91 98111 22233)
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
