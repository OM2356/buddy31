import React, { useState } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { getTranslation } from '../../utils/translations';
import { VERIFIED_HELPLINES } from '../../data/emergencyHelplines';
import {
  FolderOpen,
  PhoneCall,
  Search,
  ExternalLink,
  ShieldCheck,
  Building2,
  FileCheck2,
  HelpCircle,
  Volume2,
} from 'lucide-react';

export const KnowledgeHub: React.FC = () => {
  const { language, speak, playTapSound } = useAccessibility();
  const t = getTranslation(language);

  const [searchQuery, setSearchQuery] = useState('');

  const governmentSchemes = [
    {
      title: {
        en: 'Jeevan Pramaan (Digital Life Certificate for Pensioners)',
        hi: 'जीवन प्रमाण (पेंशनभोगियों के लिए डिजिटल जीवन प्रमाण पत्र)',
        mr: 'जीवन प्रमाण (पेन्शनधारकांसाठी डिजिटल हयातीचा दाखला)',
      },
      dept: 'Ministry of Electronics & IT / Pensioners Welfare',
      desc: {
        en: 'Central and state government pensioners can now submit their annual life certificate from home using facial recognition on an Android smartphone or visiting their local post office.',
        hi: 'पेंशनभोगी अब घर बैठे अपने एंड्रॉइड फोन पर चेहरा स्कैन करके वार्षिक जीवन प्रमाण पत्र जमा कर सकते हैं।',
        mr: 'पेन्शनधारक आता घरबसल्या मोबाईलवर चेहरा स्कॅन करून हयातीचा दाखला सादर करू शकतात.',
      },
      action: 'Available on Google Play & Post Offices',
    },
    {
      title: {
        en: 'Ayushman Bharat Senior Coverage (70+ Age Universal Healthcare)',
        hi: 'आयुष्मान भारत वरिष्ठ नागरिक स्वास्थ्य योजना (70+ वर्ष)',
        mr: 'आयुष्मान भारत ज्येष्ठ नागरिक आरोग्य संरक्षण (७०+ वर्षे)',
      },
      dept: 'National Health Authority (India)',
      desc: {
        en: 'All senior citizens aged 70 and above receive Rs 5 Lakh free health insurance coverage every year for hospital treatments, regardless of family income.',
        hi: '70 वर्ष या उससे अधिक आयु के सभी बुजुर्गों को हर साल 5 लाख रुपये तक का मुफ्त अस्पताल उपचार कवर मिलता है।',
        mr: '७० वर्षे आणि त्यावरील सर्व ज्येष्ठ नागरिकांना दरवर्षी ५ लाख रुपयांपर्यंतचे मोफत वैद्यकीय उपचार मिळतात.',
      },
      action: 'Apply via PMJAY Portal or CSC',
    },
    {
      title: {
        en: 'DigiLocker for Elderly Citizens',
        hi: 'डिजिलॉकर - सुरक्षित डिजिटल लॉकर',
        mr: 'डिजीलॉकर - महत्त्वाची कागदपत्रे साठवणूक',
      },
      dept: 'Digital India',
      desc: {
        en: 'Carry your Aadhaar card, pension order, COVID vaccination certificate, and PAN card safely on your phone without carrying original paper documents.',
        hi: 'आधार कार्ड, पेंशन आदेश और स्वास्थ्य दस्तावेज अपने फोन में सुरक्षित रखें। कागज खोने का कोई डर नहीं।',
        mr: 'आधार कार्ड, पेन्शन ऑर्डर मोबाईलमध्ये सुरक्षित ठेवा, कागदपत्रे हरवण्याची भीती नाही.',
      },
      action: 'Official Digital India App',
    },
  ];

  const filteredHelplines = VERIFIED_HELPLINES.filter((h) => {
    const q = searchQuery.toLowerCase();
    const name = (h.name[language] || h.name.en).toLowerCase();
    const desc = (h.description[language] || h.description.en).toLowerCase();
    return name.includes(q) || desc.includes(q) || h.number.includes(q);
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-800 via-indigo-900 to-blue-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-black uppercase tracking-wider">
            Verified Indian Senior Resources
          </span>
          <span className="px-3 py-1 bg-blue-400 text-blue-950 rounded-full text-xs font-black">
            Government Helplines
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight">{t.nav.knowledge}</h2>
        <p className="text-blue-100 text-sm sm:text-base font-medium max-w-2xl mt-1">
          Official toll-free eldercare helplines, digital pension procedures, and healthcare schemes.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search helplines by name, number, or topic (e.g. 14567, pension, cyber)..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-200 bg-white text-base font-medium focus:outline-none focus:border-blue-600 text-slate-900 shadow-sm"
        />
      </div>

      {/* Verified Helplines Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <PhoneCall className="w-5 h-5 text-blue-600" />
          <span>Toll-Free National Helplines:</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredHelplines.map((helpline) => (
            <div
              key={helpline.id}
              className="bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-blue-400 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-xl font-black text-xs">
                    {helpline.authority}
                  </span>
                  <button
                    onClick={() => {
                      playTapSound();
                      speak(
                        `${helpline.name[language] || helpline.name.en}. Call ${helpline.number}. ${
                          helpline.description[language] || helpline.description.en
                        }`
                      );
                    }}
                    className="p-2 hover:bg-slate-100 rounded-lg text-slate-500"
                    title="Read helpline details"
                  >
                    <Volume2 className="w-4 h-4 text-blue-600" />
                  </button>
                </div>

                <h4 className="text-lg font-black text-slate-900">
                  {helpline.name[language] || helpline.name.en}
                </h4>

                <p className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed">
                  {helpline.description[language] || helpline.description.en}
                </p>
              </div>

              <a
                href={`tel:${helpline.number}`}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-base rounded-2xl shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-98"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Dial {helpline.number}</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Government Welfare & Digital Schemes */}
      <div className="space-y-4 pt-4">
        <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-indigo-600" />
          <span>Key Government Services for Older Adults:</span>
        </h3>

        <div className="space-y-4">
          {governmentSchemes.map((scheme, idx) => (
            <div
              key={idx}
              className="bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-xl font-bold text-xs">
                  {scheme.dept}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-lg">
                  {scheme.action}
                </span>
              </div>

              <h4 className="text-xl font-black text-slate-900">
                {scheme.title[language] || scheme.title.en}
              </h4>

              <p className="text-sm sm:text-base font-medium text-slate-600 leading-relaxed">
                {scheme.desc[language] || scheme.desc.en}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
