import React, { useState } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { getTranslation } from '../../utils/translations';
import {
  HeartPulse,
  Droplets,
  Footprints,
  Moon,
  ShieldCheck,
  CheckCircle2,
  Volume2,
  Sparkles,
  Info,
} from 'lucide-react';

export const WellnessCenter: React.FC = () => {
  const { language, speak, playTapSound } = useAccessibility();
  const t = getTranslation(language);

  const [waterGlasses, setWaterGlasses] = useState(3);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    nightlight: true,
    slippers: true,
    bathroom_mat: false,
    bed_sit: true,
    cables_cleared: false,
  });

  const toggleCheck = (id: string) => {
    playTapSound();
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const addGlass = () => {
    playTapSound();
    setWaterGlasses((prev) => Math.min(12, prev + 1));
  };

  const exercises = [
    {
      title: {
        en: 'Seated Ankle Circles',
        hi: 'कुर्सी पर बैठकर पंजों को गोल घुमाना',
        mr: 'खुर्चीवर बसून पायाचे घोटे फिरवणे',
      },
      desc: {
        en: 'Sit upright in a sturdy chair. Lift one foot slightly and roll your ankle clockwise 5 times, then anticlockwise. Switch to the other foot.',
        hi: 'मजबूत कुर्सी पर बैठें। एक पैर थोड़ा ऊपर उठाकर पंजे को 5 बार गोल घुमाएं। फिर दूसरे पैर से करें।',
        mr: 'खुर्चीवर शांत बसा. एक पाय किंचित वर उचलून घोटा ५ वेळा गोल फिरवा. मग दुसरा पाय घ्या.',
      },
    },
    {
      title: {
        en: 'Gentle Shoulder Rolls',
        hi: 'कंधों को धीरे-धीरे घुमाना',
        mr: 'खांदे हळुवार फिरवणे',
      },
      desc: {
        en: 'While seated or standing, gently lift your shoulders toward your ears, roll them backward in a smooth circle, and let them drop down gently. Repeat 5 times.',
        hi: 'कंधों को कानों की तरफ उठाएं और पीछे की ओर धीरे-धीरे गोल घुमाकर नीचे लाएं। 5 बार दोहराएं।',
        mr: 'खांदे कानांकडे वर उचला आणि मागच्या बाजूने हळूच गोल फिरवून खाली आणा. ५ वेळा करा.',
      },
    },
    {
      title: {
        en: 'Sit-to-Stand Steadiness',
        hi: 'कुर्सी से संभलकर उठना और बैठना',
        mr: 'खुर्चीवरून सावकाश उठणे व बसणे',
      },
      desc: {
        en: 'Place feet flat on the floor. Lean slightly forward from your hips, push through your heels, and stand up smoothly. Sit back down slowly without plopping.',
        hi: 'पैरों को फर्श पर सीधा रखें। हल्का आगे झुकते हुए आराम से खड़े हों और फिर धीरे से बैठ जाएं।',
        mr: 'पाय जमिनीवर सरळ ठेवा. पुढे थोडे झुकून हळूच उभे राहा आणि पुन्हा सावकाश खाली बसा.',
      },
    },
  ];

  const fallHazards = [
    {
      id: 'nightlight',
      title: 'Night Light in Hallway',
      desc: 'Keep a warm night light turned on between your bedroom and the bathroom.',
    },
    {
      id: 'slippers',
      title: 'Supportive Non-Skid Slippers',
      desc: 'Wear fitted slippers with rubber soles rather than slippery smooth footwear.',
    },
    {
      id: 'bathroom_mat',
      title: 'Rubber Non-Slip Mat in Shower',
      desc: 'Ensure your shower and toilet area have a textured rubber mat that sticks firmly to tiles.',
    },
    {
      id: 'bed_sit',
      title: '30-Second Rest Before Standing',
      desc: 'Always sit upright at the edge of your bed for 30 seconds before standing in the morning.',
    },
    {
      id: 'cables_cleared',
      title: 'Floor Clear of Cords & Loose Rugs',
      desc: 'Remove electrical wires and loose small mats from common walking paths.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-black uppercase tracking-wider">
            Healthy Ageing & Mobility
          </span>
          <span className="px-3 py-1 bg-emerald-300 text-emerald-950 rounded-full text-xs font-black">
            Gentle & Safe
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight">{t.wellness.title}</h2>
        <p className="text-teal-100 text-sm sm:text-base font-medium max-w-2xl mt-1">
          {t.wellness.subtitle}
        </p>
      </div>

      {/* Hydration Tracker */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
              <Droplets className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">{t.wellness.hydrationTitle}</h3>
              <p className="text-sm font-semibold text-slate-500">
                Aim for 6-8 glasses of warm water spaced comfortably throughout the day.
              </p>
            </div>
          </div>

          <button
            onClick={addGlass}
            className="px-5 py-3 bg-cyan-600 hover:bg-cyan-700 active:scale-95 text-white font-black text-base rounded-2xl shadow-md shadow-cyan-500/20 flex items-center gap-2 transition-transform cursor-pointer"
          >
            <span>+1 Glass</span>
          </button>
        </div>

        {/* Glasses visual meter */}
        <div className="bg-cyan-50/70 p-5 rounded-2xl border border-cyan-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`w-10 h-14 rounded-xl border-2 flex items-center justify-center font-black text-base transition-all ${
                  i < waterGlasses
                    ? 'bg-cyan-500 border-cyan-600 text-white shadow-sm'
                    : 'bg-white border-cyan-200 text-slate-300'
                }`}
              >
                🥛
              </div>
            ))}
          </div>

          <div className="text-right">
            <span className="text-3xl font-black text-cyan-900">{waterGlasses}</span>
            <span className="text-sm font-bold text-slate-600 block">glasses drank today</span>
          </div>
        </div>
      </div>

      {/* Gentle Morning Mobility */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <HeartPulse className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">{t.wellness.stretchesTitle}</h3>
              <p className="text-sm font-semibold text-slate-500">
                Low-impact movements to keep blood flowing and joints comfortable.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playTapSound();
              speak('Gentle Morning Mobility: 1. Seated Ankle Circles. 2. Gentle Shoulder Rolls. 3. Sit-to-Stand Steadiness.');
            }}
            className="p-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 transition-colors cursor-pointer"
            title="Read stretches aloud"
          >
            <Volume2 className="w-5 h-5 text-emerald-600" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {exercises.map((ex, idx) => (
            <div
              key={idx}
              className="p-5 bg-slate-50 border-2 border-slate-200 rounded-2xl space-y-2"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center">
                {idx + 1}
              </div>
              <h4 className="font-bold text-slate-900 text-base">
                {ex.title[language] || ex.title.en}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                {ex.desc[language] || ex.desc.en}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Fall Prevention Checklist */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Footprints className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">{t.wellness.fallSafetyTitle}</h3>
            <p className="text-sm font-semibold text-slate-500">{t.wellness.fallSubtitle}</p>
          </div>
        </div>

        <div className="space-y-2.5">
          {fallHazards.map((item) => {
            const isChecked = !!checklist[item.id];
            return (
              <button
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`w-full p-4 rounded-2xl border-2 text-left flex items-start gap-3 transition-colors cursor-pointer ${
                  isChecked
                    ? 'bg-emerald-50/60 border-emerald-400'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div
                  className={`mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 ${
                    isChecked
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-slate-400 bg-white'
                  }`}
                >
                  {isChecked && <CheckCircle2 className="w-4 h-4" />}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">{item.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4 bg-slate-100 rounded-2xl text-xs text-slate-500 font-medium flex items-center gap-2">
        <Info className="w-4 h-4 shrink-0 text-slate-400" />
        <span>
          Medical Disclaimer: Buddy wellness features provide healthy ageing tips and fall awareness.
          Always consult your physician for personalized medical advice or acute health concerns.
        </span>
      </div>
    </div>
  );
};
