import React from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { getTranslation } from '../../utils/translations';
import { ShieldCheck, PhoneCall, Heart, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language } = useAccessibility();
  const t = getTranslation(language);

  return (
    <footer className="bg-slate-900 text-slate-300 mt-16 border-t-2 border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-sm">
                B
              </div>
              <h4 className="text-white font-black text-lg">{t.appName}</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{t.tagline}</p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Multi-Agent Architecture with Zero PII Leaks</span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <h5 className="text-white font-black text-sm uppercase tracking-wider">
              Emergency Direct Helplines (India)
            </h5>
            <ul className="text-xs space-y-1.5 text-slate-300 font-medium">
              <li>
                <strong className="text-white">112:</strong> National Emergency (Police, Medical, Fire)
              </li>
              <li>
                <strong className="text-white">1930:</strong> Cyber Financial Fraud & Online Theft
              </li>
              <li>
                <strong className="text-white">14567:</strong> Elderline (Senior Citizen National Helpline)
              </li>
              <li>
                <strong className="text-white">108:</strong> Emergency Medical Response & Ambulance
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <h5 className="text-white font-black text-sm uppercase tracking-wider">
              Senior Privacy & Consent
            </h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Conversations with Buddy are private and respectful. Caregiver progress reporting is
              strictly opt-in and consent-based. No banking PINs, OTPs, or medical diagnoses are
              requested or stored.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Buddy Elder AI. Built for accessibility, dignity, and independent golden years.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <Lock className="w-3.5 h-3.5" />
              TLS & Firebase Secure
            </span>
            <span>English • हिंदी • मराठी</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
