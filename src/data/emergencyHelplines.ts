export interface EmergencyHelpline {
  id: string;
  name: {
    en: string;
    hi: string;
    mr: string;
  };
  number: string;
  description: {
    en: string;
    hi: string;
    mr: string;
  };
  authority: string;
  category: 'senior' | 'cybercrime' | 'police' | 'medical' | 'women';
  icon: string;
}

export const VERIFIED_HELPLINES: EmergencyHelpline[] = [
  {
    id: 'senior-line',
    name: {
      en: 'National Senior Citizen Helpline (Elderline)',
      hi: 'राष्ट्रीय वरिष्ठ नागरिक हेल्पलाइन (एल्डरलाइन)',
      mr: 'राष्ट्रीय ज्येष्ठ नागरिक हेल्पलाइन (एल्डरलाईन)'
    },
    number: '14567',
    description: {
      en: 'Toll-free national helpline offering emotional support, pension guidance, abuse prevention, and doorstep field assistance for seniors across India.',
      hi: 'वरिष्ठ नागरिकों के लिए निःशुल्क हेल्पलाइन - पेंशन, देखभाल, भावनात्मक समर्थन और आपातकालीन सहायता।',
      mr: 'ज्येष्ठ नागरिकांसाठी विनामूल्य हेल्पलाइन - पेन्शन, आरोग्य सहाय्य, आणि तातडीची मदत.'
    },
    authority: 'Ministry of Social Justice and Empowerment, Govt. of India',
    category: 'senior',
    icon: 'HeartHandshake'
  },
  {
    id: 'cybercrime-line',
    name: {
      en: 'National Cyber Crime Reporting Helpline',
      hi: 'राष्ट्रीय साइबर अपराध रिपोर्टिंग हेल्पलाइन',
      mr: 'राष्ट्रीय सायबर गुन्हे नोंदणी हेल्पलाइन'
    },
    number: '1930',
    description: {
      en: 'Immediate financial fraud reporting helpline. Call within 1 to 2 hours of unauthorized bank or UPI transaction to freeze money before fraudsters withdraw.',
      hi: 'ऑनलाइन वित्तीय धोखाधड़ी, अनधिकृत यूपीआई लेनदेन होने पर तुरंत 1930 पर कॉल करें ताकि बैंक खाते फ्रीज किए जा सकें।',
      mr: 'ऑनलाइन फसवणूक किंवा खात्यातून अनधिकृत पैसे कापले गेल्यास तात्काळ १९३० वर संपर्क साधा.'
    },
    authority: 'Indian Cyber Crime Coordination Centre (I4C), MHA',
    category: 'cybercrime',
    icon: 'ShieldAlert'
  },
  {
    id: 'emergency-112',
    name: {
      en: 'National Emergency Response Service (ERSS)',
      hi: 'अखिल भारतीय आपातकालीन नंबर',
      mr: 'राष्ट्रीय आणीबाणी प्रतिसाद क्रमांक'
    },
    number: '112',
    description: {
      en: 'Single pan-India emergency number for immediate Police, Fire, and Ambulance assistance.',
      hi: 'पुलिस, अग्निशमन और चिकित्सा आपातकाल के लिए एकल अखिल भारतीय नंबर।',
      mr: 'पोलीस, अग्निशामक आणि रुग्णवाहिका मदतीसाठी एकात्मिक राष्ट्रीय क्रमांक.'
    },
    authority: 'Govt. of India ERSS',
    category: 'police',
    icon: 'PhoneCall'
  },
  {
    id: 'ambulance-108',
    name: {
      en: 'Medical Ambulance Emergency Service',
      hi: 'चिकित्सा एम्बुलेंस आपातकालीन सेवा',
      mr: 'वैद्यकीय रुग्णवाहिका सेवा'
    },
    number: '108',
    description: {
      en: 'Free 24x7 emergency medical transport and basic/advanced life support ambulance service.',
      hi: '२४x७ आपातकालीन एम्बुलेंस और अस्पताल सहायता सेवा।',
      mr: '२४x७ आपत्कालीन रुग्णवाहिका आणि वैद्यकीय मदत.'
    },
    authority: 'National Health Mission',
    category: 'medical',
    icon: 'Activity'
  }
];

export const SENIOR_GOLDEN_SAFETY_RULES = [
  {
    id: 'rule-upi-pin',
    rule: {
      en: 'NEVER enter your UPI PIN to receive money',
      hi: 'पैसे प्राप्त करने के लिए कभी भी UPI PIN न डालें',
      mr: 'पैसे मिळवण्यासाठी कधीही UPI PIN टाकू नका'
    },
    explanation: {
      en: 'Your PIN is only entered when sending money out. Anyone asking you to enter PIN to claim lottery, pension, or reward is a scammer.',
      hi: 'पिन केवल आपके खाते से पैसे कटने पर ही डाला जाता है। पैसे मिलने के लिए कोई पिन नहीं लगता।',
      mr: 'पिन फक्त पैसे पाठवण्यासाठी असतो. पैसे जमा होण्यासाठी कधीही पिन लागत नाही.'
    }
  },
  {
    id: 'rule-otp-bank',
    rule: {
      en: 'NEVER share OTP with anyone on phone call',
      hi: 'फोन कॉल पर किसी के साथ भी OTP साझा न करें',
      mr: 'फोनवर कोणालाही OTP सांगू नका'
    },
    explanation: {
      en: 'Bank managers and police officers will NEVER ask for your OTP or password over phone call.',
      hi: 'बैंक कर्मचारी या पुलिस अधिकारी कभी भी फोन पर आपका OTP नहीं मांगते।',
      mr: 'बँकेचे कर्मचारी किंवा पोलीस कधीही फोनवर OTP मागत नाहीत.'
    }
  },
  {
    id: 'rule-remote-app',
    rule: {
      en: 'NEVER install AnyDesk, TeamViewer or APK links sent by strangers',
      hi: 'अपरिचितों द्वारा भेजे गए AnyDesk, TeamViewer या APK ऐप डाउनलोड न करें',
      mr: 'अनोळखी व्यक्तीने पाठवलेले AnyDesk, TeamViewer किंवा लिंक डाऊनलोड करू नका'
    },
    explanation: {
      en: 'These apps allow fraudsters to view your phone screen and steal your passwords and money.',
      hi: 'ये ऐप धोखेबाजों को आपके फोन की स्क्रीन देखने और पासवर्ड चुराने की अनुमति देते हैं।',
      mr: 'या ॲप्समुळे भामटे तुमच्या मोबाईलची स्क्रीन पाहून बँक खात्यातील पैसे चोरू शकतात.'
    }
  }
];
