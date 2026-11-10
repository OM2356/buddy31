import React, { useState } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { getTranslation } from '../../utils/translations';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Send,
  HelpCircle,
  PhoneCall,
  CheckCircle2,
  FileText,
  Volume2,
} from 'lucide-react';
import { ScamAnalysisResult } from '../../types';

export const ScamDetector: React.FC = () => {
  const { language, speak, playTapSound } = useAccessibility();
  const t = getTranslation(language);

  const [inputMessage, setInputMessage] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ScamAnalysisResult | null>(null);

  const sampleScams = [
    {
      title: 'Electricity Bill Cut Threat',
      text: 'Dear customer, your electricity power will be disconnected tonight at 9:30 PM due to unpaid bill. Immediately contact electricity officer at 9876543210 or pay via link: http://bit.ly/quick-power-bill',
    },
    {
      title: 'Bank KYC & OTP Request',
      text: 'State Bank Notice: Your savings account has been put on hold due to missing KYC. Please share the 6-digit OTP sent to your mobile with our branch manager to restore your account.',
    },
    {
      title: 'Lottery Prize (WhatsApp/SMS)',
      text: 'Congratulations! Your mobile number won Rs 25,00,000 in KBC Lucky Draw. Enter your UPI PIN to claim your prize money directly into your bank account.',
    },
    {
      title: 'Legitimate Family Note',
      text: 'Hi Mom, I am reaching home at 7:30 PM this evening. Please do not worry, see you soon!',
    },
  ];

  const handleAnalyze = async (textToScan?: string) => {
    const text = (textToScan || inputMessage).trim();
    if (!text || isAnalyzing) return;

    playTapSound();
    setIsAnalyzing(true);

    try {
      const res = await fetch('/api/scam/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) throw new Error('Analysis failed');

      const data: ScamAnalysisResult = await res.json();
      setResult(data);

      // Speak result headline for elderly accessibility
      const headline = data.warningMessage[language] || data.warningMessage.en;
      speak(headline);
    } catch (err) {
      console.error('Scam analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-black uppercase tracking-wider">
            Cyber Safety & Fraud Intercept
          </span>
          <span className="px-3 py-1 bg-amber-300 text-amber-950 rounded-full text-xs font-black">
            Helpline 1930 Connected
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight">{t.scamDetector.title}</h2>
        <p className="text-amber-100 text-sm sm:text-base font-medium max-w-2xl mt-1">
          {t.scamDetector.subtitle}
        </p>
      </div>

      {/* Quick Test Samples */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 shadow-sm space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Try a Common Sample Message:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {sampleScams.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputMessage(sample.text);
                handleAnalyze(sample.text);
              }}
              className="p-3 bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-400 rounded-2xl text-left text-xs sm:text-sm font-semibold text-slate-800 transition-colors cursor-pointer flex items-center justify-between"
            >
              <span>{sample.title}</span>
              <span className="text-amber-700 text-xs font-bold">Scan &rarr;</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
        <label className="block text-base font-bold text-slate-900">
          Paste the message, SMS, or WhatsApp text you received:
        </label>
        <textarea
          rows={4}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder={t.scamDetector.placeholder}
          className="w-full p-4 rounded-2xl border-2 border-slate-300 focus:outline-none focus:border-amber-500 text-base sm:text-lg text-slate-900 placeholder:text-slate-400 font-medium"
        />

        <button
          onClick={() => handleAnalyze()}
          disabled={!inputMessage.trim() || isAnalyzing}
          className="w-full py-4 bg-amber-600 hover:bg-amber-700 active:scale-98 disabled:bg-slate-300 text-white font-black text-lg rounded-2xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-transform cursor-pointer disabled:cursor-not-allowed"
        >
          <ShieldAlert className="w-6 h-6" />
          <span>{isAnalyzing ? t.scamDetector.analyzing : t.scamDetector.analyzeBtn}</span>
        </button>
      </div>

      {/* Results View */}
      {result && (
        <div
          className={`rounded-3xl p-6 sm:p-8 border-3 shadow-lg space-y-6 animate-in fade-in zoom-in-95 ${
            result.isScam
              ? 'bg-rose-50 border-rose-500 text-rose-950'
              : 'bg-emerald-50 border-emerald-500 text-emerald-950'
          }`}
        >
          {/* Header Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/10">
            <div className="flex items-center gap-4">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-md ${
                  result.isScam ? 'bg-rose-600' : 'bg-emerald-600'
                }`}
              >
                {result.isScam ? (
                  <AlertTriangle className="w-9 h-9" />
                ) : (
                  <ShieldCheck className="w-9 h-9" />
                )}
              </div>
              <div>
                <span
                  className={`text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                    result.isScam
                      ? 'bg-rose-200 text-rose-800'
                      : 'bg-emerald-200 text-emerald-800'
                  }`}
                >
                  Risk Level: {result.riskLevel}
                </span>
                <h3 className="text-2xl font-black mt-1">
                  {result.warningMessage[language] || result.warningMessage.en}
                </h3>
              </div>
            </div>

            {/* Risk Gauge Score */}
            <div className="text-right sm:border-l sm:pl-6 border-black/10">
              <div className="text-3xl font-black">{result.riskScore}%</div>
              <span className="text-xs font-bold text-slate-500 uppercase">Risk Score</span>
            </div>
          </div>

          {/* Explanation */}
          <div className="space-y-2">
            <h4 className="font-black text-lg flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-600" />
              <span>Why is this flagged?</span>
            </h4>
            <p className="text-base sm:text-lg leading-relaxed font-medium bg-white/70 p-4 rounded-2xl border border-black/5">
              {result.explanation[language] || result.explanation.en}
            </p>
          </div>

          {/* Safe Actions Checklist */}
          {result.recommendedActions && result.recommendedActions.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-black text-lg">Safe Steps to Take Right Now:</h4>
              <div className="space-y-2">
                {result.recommendedActions.map((action, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-slate-200 text-slate-800 font-semibold text-base shadow-2xs"
                  >
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{action[language] || action.en}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Read aloud button */}
          <button
            onClick={() => {
              playTapSound();
              const textToSpeak = `${result.warningMessage[language] || result.warningMessage.en}. ${
                result.explanation[language] || result.explanation.en
              }`;
              speak(textToSpeak);
            }}
            className="px-5 py-3 bg-white hover:bg-slate-100 text-slate-800 rounded-2xl font-bold flex items-center gap-2 border border-slate-300 shadow-xs cursor-pointer"
          >
            <Volume2 className="w-5 h-5 text-blue-600" />
            <span>Read Safety Advice Aloud</span>
          </button>
        </div>
      )}

      {/* Cybercrime 1930 Notice Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <span className="text-amber-400 text-xs font-black uppercase tracking-wider">
            Ministry of Home Affairs (India)
          </span>
          <h4 className="text-2xl font-black">National Cyber Crime Helpline (1930)</h4>
          <p className="text-slate-300 text-sm max-w-xl">
            If you or someone in your family transferred money to a fraudulent UPI ID or bank link,
            immediately dial 1930 to freeze the transfer before the scammers withdraw it.
          </p>
        </div>

        <a
          href="tel:1930"
          className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-black font-black text-lg rounded-2xl shadow-lg flex items-center gap-2 shrink-0 transition-transform active:scale-95"
        >
          <PhoneCall className="w-5 h-5" />
          <span>Call 1930 Now</span>
        </a>
      </div>
    </div>
  );
};
