import { Course } from '../types';

export const LEARNING_COURSES: Course[] = [
  {
    id: 'smartphone-basics',
    title: {
      en: 'Smartphone Basics',
      hi: 'स्मार्टफोन की बुनियादी बातें',
      mr: 'स्मार्टफोनची मूलभूत माहिती'
    },
    description: {
      en: 'Learn touch gestures, volume control, charging, screen locks, and flashlight with complete ease.',
      hi: 'टच स्क्रीन चलाना, आवाज बढ़ाना/घटाना, फोन चार्ज करना और टॉर्च चालू करना आसानी से सीखें।',
      mr: 'टच स्क्रीन वापरणे, आवाज नियंत्रित करणे, चार्जिंग आणि टॉर्च सहजपणे शिकून घ्या.'
    },
    iconName: 'Smartphone',
    level: 'beginner',
    category: 'basics',
    lessons: [
      {
        id: 'touch-gestures',
        title: {
          en: 'Holding and Tapping the Screen',
          hi: 'स्क्रीन को छूना और टैप करना',
          mr: 'स्क्रीनला स्पर्श करणे आणि टॅप करणे'
        },
        durationMinutes: 5,
        summary: {
          en: 'Understand tap, long-press, swipe, and zoom without feeling rushed.',
          hi: 'टैप करना, दबाकर रखना और स्क्रीन को ऊपर-नीचे सरकाना समझें।',
          mr: 'हलका स्पर्श, दाबून ठेवणे आणि स्वाइप करणे सोप्या पद्धतीने समजून घ्या.'
        },
        steps: [
          {
            title: {
              en: 'Step 1: Single Tap (Like pressing a door bell gently)',
              hi: 'कदम १: सिंगल टैप (जैसे घंटी का बटन हल्के से दबाना)',
              mr: 'पायरी १: सिंगल टॅप (हलकेच बेल वाजवल्यासारखे)'
            },
            description: {
              en: 'Lightly touch the glass with the pad of your index finger and lift it immediately. Do not press too hard.',
              hi: 'अपनी तर्जनी उंगली के पोर से कांच को हल्के से छुएं और तुरंत उठा लें। बहुत जोर से न दबाएं।',
              mr: 'तर्जनीने स्क्रीनला हलकेच स्पर्श करा आणि लगेच बोट उचला. जोरात दाबू नका.'
            },
            tip: {
              en: 'If an app doesn’t open, you might be holding your finger down too long.',
              hi: 'यदि ऐप नहीं खुला, तो शायद आपने उंगली ज्यादा देर तक दबाए रखी है।',
              mr: 'ॲप उघडले नाही तर बोट जास्त वेळ स्क्रीनवर ठेवले असू शकते.'
            },
            iconName: 'Hand'
          },
          {
            title: {
              en: 'Step 2: Swiping (Like turning a book page)',
              hi: 'कदम २: स्वाइप करना (जैसे किताब का पन्ना पलटना)',
              mr: 'पायरी २: स्वाइप करणे (पुस्तकाचे पान उलटल्याप्रमाणे)'
            },
            description: {
              en: 'Place your finger on the screen and slide it smoothly left, right, up, or down, then lift.',
              hi: 'उंगली स्क्रीन पर रखें और उसे आराम से बाईं, दाईं, ऊपर या नीचे की ओर सरकाएं।',
              mr: 'बोट स्क्रीनवर ठेवा आणि हलकेच डावीकडे, उजवीकडे किंवा वर-खाली सरकवा.'
            },
            iconName: 'Move'
          },
          {
            title: {
              en: 'Step 3: Long Press (To see more options)',
              hi: 'कदम ३: थोड़ी देर दबाकर रखना (और विकल्प देखने के लिए)',
              mr: 'पायरी ३: थोडा वेळ दाबून ठेवणे (अधिक पर्याय पाहण्यासाठी)'
            },
            description: {
              en: 'Keep your finger pressed on an item for 2 seconds without moving it until a small menu appears.',
              hi: 'किसी फोटो या मेसेज पर अपनी उंगली २ सेकंड तक बिना हिलाए रखें जब तक नया मेनू न आ जाए।',
              mr: 'फोटो किंवा मेसेजवर २ सेकंद बोट न हलवता दाबून ठेवा जोपर्यंत पर्याय दिसत नाहीत.'
            },
            iconName: 'Clock'
          }
        ],
        quiz: [
          {
            id: 'q1',
            question: {
              en: 'To open an app or read a message, what should you do?',
              hi: 'किसी ऐप को खोलने या मेसेज पढ़ने के लिए क्या करना चाहिए?',
              mr: 'एखादे ॲप उघडण्यासाठी काय करावे?'
            },
            options: {
              en: ['Tap gently once', 'Shake the phone', 'Press very hard for 1 minute'],
              hi: ['एक बार हल्के से टैप करें', 'फोन को जोर से हिलाएं', '१ मिनट तक जोर से दबाएं'],
              mr: ['एकदा हलकेच टॅप करा', 'फोन जोरात हलवा', '१ मिनिट जोराने दाबून ठेवा']
            },
            correctIndex: 0,
            explanation: {
              en: 'A gentle single tap opens any application on your smartphone.',
              hi: 'हल्का सा एक टैप किसी भी ऐप को तुरंत खोल देता है।',
              mr: 'हलकेच एक टॅप केल्याने ॲप लगेच उघडते.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'whatsapp-basics',
    title: {
      en: 'WhatsApp Mastery',
      hi: 'व्हाट्सएप चलाना सीखें',
      mr: 'व्हॉट्सॲप वापरणे शिका'
    },
    description: {
      en: 'Send messages, send voice notes to grandchildren, share pictures, and block annoying spam.',
      hi: 'मेसेज भेजना, बच्चों को आवाज रिकॉर्ड कर भेजना, फोटो भेजना और स्पैम रोकना सीखें।',
      mr: 'मेसेज पाठवणे, व्हॉइस मेसेज रेकॉर्ड करणे, फोटो शेअर करणे आणि स्पॅम थांबवणे शिका.'
    },
    iconName: 'MessageSquare',
    level: 'beginner',
    category: 'communication',
    lessons: [
      {
        id: 'voice-notes',
        title: {
          en: 'Sending Voice Notes (No typing needed!)',
          hi: 'आवाज का संदेश भेजना (टाइपिंग की जरूरत नहीं!)',
          mr: 'व्हॉइस मेसेज पाठवणे (टायपिंग करण्याची गरज नाही!)'
        },
        durationMinutes: 4,
        summary: {
          en: 'You do not need to type on a tiny keyboard. Just hold the mic and speak your heart out.',
          hi: 'छोटे कीबोर्ड पर टाइप करने की जरूरत नहीं। बस माइक दबाएं और बोलें।',
          mr: 'लहान कीबोर्डवर टाईप करण्याची गरज नाही. फक्त माइक दाबून बोला.'
        },
        steps: [
          {
            title: {
              en: 'Step 1: Open the family member chat',
              hi: 'कदम १: अपने परिवार के सदस्य की चैट खोलें',
              mr: 'पायरी १: कुटुंबियांचे चॅट उघडा'
            },
            description: {
              en: 'Tap on WhatsApp icon, then tap on your son, daughter, or grandchild’s name.',
              hi: 'व्हाट्सएप खोलें और अपने बेटे, बेटी या पोते-पोती के नाम पर टैप करें।',
              mr: 'व्हॉट्सॲप उघडा आणि मुलांचे किंवा नातवंडांचे नाव निवडा.'
            },
            iconName: 'Users'
          },
          {
            title: {
              en: 'Step 2: Press and hold the green Microphone icon',
              hi: 'कदम २: नीचे हरे माइक वाले बटन को दबाकर रखें',
              mr: 'पायरी २: खाली असलेल्या हिरव्या माइकच्या चिन्हाला दाबून ठेवा'
            },
            description: {
              en: 'At the bottom right, hold down the round microphone icon with your thumb and start speaking.',
              hi: 'निचले दाएं कोने में गोल माइक को अंगूठे से दबाए रखें और बोलना शुरू करें।',
              mr: 'उजव्या कोपऱ्यातील गोल माइक बोटाने दाबून ठेवा आणि बोलायला सुरुवात करा.'
            },
            tip: {
              en: 'Keep your thumb on the button while you speak. When finished, simply lift your thumb to send.',
              hi: 'बोलते समय अंगूठा दबाए रखें। बात पूरी होने पर अंगूठा उठा लें, संदेश खुद चला जाएगा।',
              mr: 'बोलताना बोट तसेच दाबून ठेवा. बोलणे संपल्यावर बोट उचला, मेसेज लगेच जाईल.'
            },
            iconName: 'Mic'
          }
        ],
        quiz: [
          {
            id: 'qw1',
            question: {
              en: 'What happens when you release the microphone button after speaking?',
              hi: 'बोलने के बाद माइक का बटन छोड़ देने पर क्या होता है?',
              mr: 'बोलून झाल्यावर माइकचे बटन सोडल्यावर काय होते?'
            },
            options: {
              en: ['The voice message is sent immediately', 'The phone shuts down', 'Money is deducted'],
              hi: ['आवाज का संदेश तुरंत पहुंच जाता है', 'फोन बंद हो जाता है', 'खाते से पैसे कट जाते हैं'],
              mr: ['व्हॉइस मेसेज लगेच पाठवला जातो', 'फोन बंद होतो', 'पैसे कापले जातात']
            },
            correctIndex: 0,
            explanation: {
              en: 'WhatsApp automatically sends your audio recording the moment you release the microphone.',
              hi: 'माइक छोड़ने पर व्हाट्सएप अपने आप आपकी आवाज का संदेश भेज देता है।',
              mr: 'माइक सोडताच व्हॉट्सॲप तुमचा आवाज लगेच पाठवून देतो.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'video-calling',
    title: {
      en: 'Video Calling Family',
      hi: 'वीडियो कॉलिंग करना',
      mr: 'कुटुंबियांशी व्हिडिओ कॉल करणे'
    },
    description: {
      en: 'See your children and friends face-to-face from anywhere in the world on WhatsApp or Meet.',
      hi: 'दुनिया में कहीं भी बैठे अपने बच्चों और पोते-पोतियों का चेहरा देखकर बात करें।',
      mr: 'कुठेही असणाऱ्या मुलांशी आणि नातवंडांशी समोरासमोर पाहून मनसोक्त बोला.'
    },
    iconName: 'Video',
    level: 'beginner',
    category: 'communication',
    lessons: [
      {
        id: 'start-video-call',
        title: {
          en: 'Starting and Answering a Video Call',
          hi: 'वीडियो कॉल शुरू करना और उठाना',
          mr: 'व्हिडिओ कॉल सुरू करणे आणि उचलणे'
        },
        durationMinutes: 6,
        summary: {
          en: 'Tap the camera icon at the top of a chat to call, or swipe green up to answer.',
          hi: 'कॉल करने के लिए ऊपर कैमरे वाले निशान पर टैप करें।',
          mr: 'कॉल करण्यासाठी वरच्या कॅमेऱ्याच्या चिन्हावर टॅप करा.'
        },
        steps: [
          {
            title: {
              en: 'Step 1: Tap the Video Camera icon at top right',
              hi: 'कदम १: ऊपर दाईं ओर वीडियो कैमरा निशान पर टैप करें',
              mr: 'पायरी १: वर उजवीकडील व्हिडिओ कॅमेऱ्याच्या चिन्हावर टॅप करा'
            },
            description: {
              en: 'Inside any WhatsApp chat, look at the top bar. You will see a small camera symbol. Tap it once.',
              hi: 'चैट में ऊपर एक छोटा सा कैमरा दिखेगा। उस पर एक बार टैप करें।',
              mr: 'चॅटमध्ये वर लहान कॅमेरा दिसेल. त्यावर एकदा टॅप करा.'
            },
            iconName: 'Video'
          },
          {
            title: {
              en: 'Step 2: Hold the phone at eye level',
              hi: 'कदम २: फोन को अपनी आंखों की सीध में रखें',
              mr: 'पायरी २: फोन डोळ्यांच्या समोर सरळ धरा'
            },
            description: {
              en: 'Hold the phone about an arm length away so the other person can see your smiling face clearly.',
              hi: 'फोन को थोड़ा दूर रखें ताकि आपका चेहरा अच्छी रोशनी में साफ दिखाई दे।',
              mr: 'फोन थोडा लांब धरा जेणेकरून तुमचा चेहरा स्पष्ट आणि उजेडात दिसेल.'
            },
            iconName: 'Smile'
          }
        ],
        quiz: [
          {
            id: 'qv1',
            question: {
              en: 'Which symbol is used to start a video call where you can see the person?',
              hi: 'किस निशान को दबाने से चेहरा देखने वाला वीडियो कॉल शुरू होता है?',
              mr: 'समोरासमोर चेहरा पाहून बोलण्यासाठी कोणते चिन्ह वापरतात?'
            },
            options: {
              en: ['Video camera icon', 'Trash bin icon', 'Airplane icon'],
              hi: ['वीडियो कैमरा का निशान', 'कचरे के डिब्बे का निशान', 'हवाई जहाज का निशान'],
              mr: ['व्हिडिओ कॅमेऱ्याचे चिन्ह', 'कचऱ्याच्या डब्याचे चिन्ह', 'विमानाचे चिन्ह']
            },
            correctIndex: 0,
            explanation: {
              en: 'The small video camera icon launches face-to-face video calling.',
              hi: 'वीडियो कैमरा निशान से चेहरा देखने वाला कॉल शुरू होता है।',
              mr: 'व्हिडिओ कॅमेऱ्याच्या चिन्हाने समोरासमोर बोलता येते.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'google-search',
    title: {
      en: 'Internet and Google Search',
      hi: 'इंटरनेट और गूगल खोज',
      mr: 'इंटरनेट आणि गुगल सर्च'
    },
    description: {
      en: 'Find today’s weather, devotional songs, bhajan lyrics, recipes, and city news.',
      hi: 'आज का मौसम, भजन, पुराने गाने, समाचार और घरेलू नुस्खे आसानी से खोजें।',
      mr: 'हवामान, भक्तीगीते, जुनी गाणी, बातम्या आणि रेसिपी सहज शोधा.'
    },
    iconName: 'Search',
    level: 'beginner',
    category: 'knowledge',
    lessons: [
      {
        id: 'voice-search',
        title: {
          en: 'Using Google Voice Search (Just Speak!)',
          hi: 'गूगल में बोलकर खोजना (बस मुंह से बोलें)',
          mr: 'गुगलवर बोलून शोधणे (फक्त आवाजाने सांगा)'
        },
        durationMinutes: 5,
        summary: {
          en: 'Tap the colorful microphone on Google and ask what you want to know.',
          hi: 'गूगल पर रंगीन माइक को छुएं और अपनी भाषा में पूछें।',
          mr: 'गुगलवर रंगीत माइक चिन्हाला स्पर्श करा आणि आपल्या भाषेत विचारा.'
        },
        steps: [
          {
            title: {
              en: 'Step 1: Tap the Google search bar microphone',
              hi: 'कदम १: गूगल खोज पट्टी पर माइक के निशान को दबाएं',
              mr: 'पायरी १: गुगल सर्च बारमधील माइकवर टॅप करा'
            },
            description: {
              en: 'Open Google or Chrome. Tap the small microphone inside the search box.',
              hi: 'गूगल खोलें और सर्च बॉक्स के अंदर बने माइक पर टैप करें।',
              mr: 'गुगल उघडा आणि सर्च बॉक्समधील लहान माइकवर टॅप करा.'
            },
            iconName: 'Mic'
          },
          {
            title: {
              en: 'Step 2: Say your query clearly in Hindi, Marathi, or English',
              hi: 'कदम २: अपनी भाषा में साफ-साफ बोलें (उदा. "आज का मौसम कैसा है")',
              mr: 'पायरी २: मराठीत स्पष्ट बोला (उदा. "आजचे हवामान कसे आहे")'
            },
            description: {
              en: 'Say: "Lata Mangeshkar old songs" or "Today weather forecast". Google will show results immediately.',
              hi: 'बोलें: "लता मंगेशकर के पुराने गाने" या "आज का मौसम"। गूगल तुरंत गाने और जानकारी दिखा देगा।',
              mr: 'बोला: "लता मंगेशकर यांची जुनी गाणी" किंवा "आजचा पाऊस". गुगल लगेच माहिती देईल.'
            },
            iconName: 'Volume2'
          }
        ],
        quiz: [
          {
            id: 'qs1',
            question: {
              en: 'Can you search on Google in Marathi or Hindi using your voice?',
              hi: 'क्या आप गूगल पर हिंदी या मराठी में बोलकर खोज सकते हैं?',
              mr: 'तुम्ही गुगलवर मराठी किंवा हिंदीत बोलून शोधू शकता का?'
            },
            options: {
              en: ['Yes, absolutely!', 'No, only English is allowed', 'Only computer engineers can'],
              hi: ['हाँ, बिल्कुल!', 'नहीं, केवल अंग्रेजी चलती है', 'सिर्फ इंजीनियर ही कर सकते हैं'],
              mr: ['होय, नक्कीच!', 'नाही, फक्त इंग्रजी चालते', 'फक्त इंजिनिअर करू शकतात']
            },
            correctIndex: 0,
            explanation: {
              en: 'Google understands Hindi, Marathi, and many Indian languages when you speak into the mic.',
              hi: 'गूगल आपकी हिंदी और मराठी भाषा को बहुत अच्छी तरह समझता है।',
              mr: 'गुगल आपली मराठी आणि हिंदी भाषा अगदी अचूकपणे समजून घेतो.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'email-usage',
    title: {
      en: 'Email Usage (Gmail)',
      hi: 'ईमेल का उपयोग (जीमेल)',
      mr: 'ईमेल वापरणे (जीमेल)'
    },
    description: {
      en: 'Read bank notices, electricity bills, and messages from relatives in your Gmail inbox.',
      hi: 'बैंक के नोटिस, बिजली बिल और रिश्तेदारों के ईमेल सुरक्षित रूप से पढ़ना सीखें।',
      mr: 'बँकेचे संदेश, लाईट बिल आणि महत्वाचे ईमेल वाचणे शिका.'
    },
    iconName: 'Mail',
    level: 'beginner',
    category: 'basics',
    lessons: [
      {
        id: 'reading-email',
        title: {
          en: 'Opening and Reading Your Mail',
          hi: 'ईमेल खोलना और पढ़ना',
          mr: 'ईमेल उघडणे आणि वाचणे'
        },
        durationMinutes: 5,
        summary: {
          en: 'Tap Gmail (red M logo) to view your unread messages in bold font.',
          hi: 'जीमेल (लाल M लोगो) खोलें। जो संदेश गहरे रंग में हैं, वे नए संदेश हैं।',
          mr: 'जीमेल (लाल M चिन्ह) उघडा. ठळक अक्षरातील संदेश नवीन आलेले असतात.'
        },
        steps: [
          {
            title: {
              en: 'Step 1: Open the Gmail App',
              hi: 'कदम १: जीमेल ऐप खोलें',
              mr: 'पायरी १: जीमेल ॲप उघडा'
            },
            description: {
              en: 'Find the red and white envelope marked with the letter "M". Tap it once.',
              hi: 'लाल और सफेद रंग का लिफाफा जिसमें "M" लिखा है, उस पर टैप करें।',
              mr: 'लाल आणि पांढऱ्या रंगाचे "M" चिन्ह असलेला ॲप उघडा.'
            },
            iconName: 'Inbox'
          },
          {
            title: {
              en: 'Step 2: Never click suspicious blue links inside unknown emails',
              hi: 'कदम २: अनजान ईमेल के अंदर किसी नीले लिंक पर कभी क्लिक न करें',
              mr: 'पायरी २: अनोळखी ईमेलमधील कोणत्याही निळ्या लिंकवर क्लिक करू नका'
            },
            description: {
              en: 'If an email claims you won 50 Lakh rupees or your electricity will be cut, do NOT click the link. It is fake.',
              hi: 'यदि ईमेल में लिखा हो कि आपने लॉटरी जीती है या बिजली कट जाएगी, तो लिंक न दबाएं। यह झूठ है।',
              mr: 'जर ईमेलमध्ये लॉटरी लागल्याचे किंवा वीज कापण्याचे लिहिले असेल तर लिंक दाबू नका. ती फसवणूक असते.'
            },
            iconName: 'AlertTriangle'
          }
        ],
        quiz: [
          {
            id: 'qe1',
            question: {
              en: 'If an unknown email says "Click here to claim 25 Lakh Rupees Lottery", what should you do?',
              hi: 'यदि अनजान ईमेल कहे कि "२५ लाख की लॉटरी पाने के लिए यहां क्लिक करें", तो क्या करें?',
              mr: 'अनोळखी ईमेलमध्ये "२५ लाखांची लॉटरी मिळवण्यासाठी येथे क्लिक करा" आल्यास काय कराल?'
            },
            options: {
              en: ['Delete it and do NOT click any link', 'Click immediately', 'Send bank password'],
              hi: ['डिलीट करें और लिंक पर कभी क्लिक न करें', 'तुरंत क्लिक करें', 'बैंक पासवर्ड भेजें'],
              mr: ['डिलीट करा आणि लिंकवर क्लिक करू नका', 'लगेच क्लिक करा', 'बँकेचा पासवर्ड पाठवा']
            },
            correctIndex: 0,
            explanation: {
              en: 'Lottery emails are 100% fake cyber scams trying to steal your money.',
              hi: 'लॉटरी वाले ईमेल हमेशा धोखेबाज होते हैं। इन्हें तुरंत डिलीट कर दें।',
              mr: 'लॉटरीचे सर्व ईमेल्स खोटे असतात. ते लगेच डिलीट करावेत.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'upi-safety',
    title: {
      en: 'Digital Payments & UPI Safety',
      hi: 'डिजिटल भुगतान और यूपीआई सुरक्षा',
      mr: 'डिजिटल पेमेंट आणि UPI सुरक्षा'
    },
    description: {
      en: 'Learn Google Pay, PhonePe, and Paytm safely. The golden rule: PIN is NEVER needed to receive money!',
      hi: 'गूगल पे और फोनपे सुरक्षित तरीके से चलाएं। सुनहरा नियम: पैसे लेने के लिए कभी पिन नहीं लगता!',
      mr: 'गुगल पे आणि फोनपे सुरक्षितपणे वापरा. सुवर्ण नियम: पैसे मिळवण्यासाठी पिन लागत नाही!'
    },
    iconName: 'CreditCard',
    level: 'beginner',
    category: 'finance',
    lessons: [
      {
        id: 'upi-golden-rule',
        title: {
          en: 'The Golden Rule of UPI PIN',
          hi: 'यूपीआई पिन का सबसे बड़ा नियम',
          mr: 'UPI PIN चा सर्वात महत्त्वाचा नियम'
        },
        durationMinutes: 7,
        summary: {
          en: 'Your 4 or 6 digit UPI PIN is like your bank vault key. Only enter it when you are paying out.',
          hi: 'आपका यूपीआई पिन आपकी तिजोरी की चाबी है। इसे केवल पैसे भेजते समय ही डालें।',
          mr: 'तुमचा UPI PIN हा तिजोरीच्या चावीसारखा आहे. तो फक्त स्वतः पैसे देतानाच टाकावा.'
        },
        steps: [
          {
            title: {
              en: 'Step 1: Understanding Send vs Receive',
              hi: 'कदम १: पैसे भेजना बनाम पैसे पाना समझें',
              mr: 'पायरी १: पैसे पाठवणे आणि मिळणे यातील फरक समजा'
            },
            description: {
              en: 'When someone sends you money (pension, relative gift, vegetable refund), money enters directly into your bank account. You do NOT have to press anything or enter any PIN.',
              hi: 'जब कोई आपको पैसे भेजता है, तो पैसे सीधे बैंक में आते हैं। आपको कोई पिन नहीं डालना होता।',
              mr: 'जेव्हा कोणी तुम्हाला पैसे पाठवते, तेव्हा पैसे थेट बँकेत जमा होतात. तुम्हाला कोणताही पिन टाकावा लागत नाही.'
            },
            tip: {
              en: 'If a buyer or caller asks you to enter PIN to "verify" or "accept" payment, disconnect immediately!',
              hi: 'यदि कोई कहे कि पैसे पाने के लिए पिन डालें, तो तुरंत फोन काट दें! वह चोर है।',
              mr: 'पैसे मिळवण्यासाठी पिन टाका असे कोणी सांगितल्यास तात्काळ फोन कट करा! ती फसवणूक आहे.'
            },
            iconName: 'ShieldAlert'
          },
          {
            title: {
              en: 'Step 2: Checking the Amount Before Entering PIN',
              hi: 'कदम २: पिन डालने से पहले रुपए की रकम ध्यान से पढ़ें',
              mr: 'पायरी २: पिन टाकण्यापूर्वी रकमेचा आकडा नीट तपासा'
            },
            description: {
              en: 'When paying milkman or grocery shop, always look at the number on the screen (e.g. ₹60) and the merchant name before typing your PIN.',
              hi: 'दुकानदार को भुगतान करते समय स्क्रीन पर रुपए (उदा. ₹६०) और उसका नाम अच्छी तरह जांच लें।',
              mr: 'दुकानदाराला पैसे देताना स्क्रीनवर दाखवलेली रक्कम (उदा. ₹६०) आणि नाव काळजीपूर्वक तपासा.'
            },
            iconName: 'CheckCircle'
          }
        ],
        quiz: [
          {
            id: 'qu1',
            question: {
              en: 'Someone calls and says: "I am sending you ₹5,000 pension refund, please enter your UPI PIN to accept it." What will happen if you enter your PIN?',
              hi: 'कोई फोन करके कहे: "मैं आपकी ₹५,००० पेंशन भेज रहा हूँ, इसे स्वीकार करने के लिए अपना यूपीआई पिन डालें।" यदि आप पिन डालेंगे तो क्या होगा?',
              mr: 'कोणी फोन करून म्हटले: "मी तुमचे ₹५,००० पाठवत आहे, ते जमा करण्यासाठी UPI पिन टाका." पिन टाकल्यास काय होईल?'
            },
            options: {
              en: ['Money will be STOLEN from your bank account', 'You will receive ₹5,000', 'Nothing will happen'],
              hi: ['आपके बैंक खाते से पैसे कट कर चोरी हो जाएंगे', 'आपको ₹५,००० मिल जाएंगे', 'कुछ नहीं होगा'],
              mr: ['तुमच्या बँक खात्यातून पैसे चोरीला जातील', 'तुम्हाला ₹५,००० मिळतील', 'काही होणार नाही']
            },
            correctIndex: 0,
            explanation: {
              en: 'Entering your UPI PIN ALWAYS debits (removes) money from your account. Never enter PIN to receive money!',
              hi: 'पिन डालते ही आपके खाते से पैसे कट जाते हैं। पैसे मिलने के लिए कभी पिन नहीं लगता।',
              mr: 'पिन टाकताच तुमच्या खात्यातून पैसे वजा होतात. पैसे मिळवण्यासाठी कधीही पिन टाकू नये!'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'online-banking-safety',
    title: {
      en: 'Online Banking Safety',
      hi: 'ऑनलाइन बैंकिंग सुरक्षा',
      mr: 'ऑनलाइन बँकिंग सुरक्षा'
    },
    description: {
      en: 'Keep your fixed deposits, savings, passbooks, and net banking safe from fraudsters.',
      hi: 'अपनी एफडी, पेंशन और बैंक बचत को धोखेबाजों की नजर से सुरक्षित रखें।',
      mr: 'तुमची मुदत ठेव (FD), पेन्शन आणि बँक खाते भामट्यांपासून सुरक्षित ठेवा.'
    },
    iconName: 'Lock',
    level: 'intermediate',
    category: 'finance',
    lessons: [
      {
        id: 'otp-protection',
        title: {
          en: 'Why Bank Staff NEVER Ask for OTP',
          hi: 'बैंक कर्मचारी कभी OTP क्यों नहीं मांगते',
          mr: 'बँकेचे कर्मचारी कधीही OTP का मागत नाहीत'
        },
        durationMinutes: 5,
        summary: {
          en: 'OTP means One-Time Password. Sharing it is like handing someone your bank vault keys.',
          hi: 'OTP किसी को भी फोन पर बताना अपनी तिजोरी की चाबी सौंपने जैसा है।',
          mr: 'OTP कोणालाही सांगणे म्हणजे आपल्या तिजोरीची चावी दुसऱ्याच्या हातात देण्यासारखे आहे.'
        },
        steps: [
          {
            title: {
              en: 'Step 1: Recognize fake bank calls',
              hi: 'कदम १: फर्जी बैंक फोन कॉल को पहचानें',
              mr: 'पायरी १: बनावट बँक फोन कॉल ओळखा'
            },
            description: {
              en: 'Scammers pretend: "Your ATM card or KYC has expired. Tell me the 6-digit code on your SMS to renew it." This is always a fraud.',
              hi: 'धोखेबाज कहते हैं: "आपका एटीएम कार्ड बंद हो गया है, नवीनीकरण के लिए आया हुआ ६ अंकों का कोड बताएं।" यह हमेशा धोखा होता है।',
              mr: 'भामटे म्हणतात: "तुमचे एटीएम कार्ड ब्लॉक झाले आहे, चालू करण्यासाठी SMS वरील ६ अंकी कोड सांगा." हे पूर्णपणे खोटे असते.'
            },
            iconName: 'PhoneOff'
          },
          {
            title: {
              en: 'Step 2: What to do if you suspect a scam call',
              hi: 'कदम २: ऐसा कॉल आने पर क्या करें',
              mr: 'पायरी २: असा फोन आल्यास काय करावे'
            },
            description: {
              en: 'Cut the call immediately. Walk to your local bank branch at your own pace or ask your son/daughter to accompany you.',
              hi: 'तुरंत फोन काट दें। सीधे अपनी बैंक शाखा में जाकर मैनेजर से बात करें।',
              mr: 'तात्काळ फोन कट करा. तुमच्या नेहमीच्या बँक शाखेत प्रत्यक्ष जाऊन चौकशी करा.'
            },
            iconName: 'Building'
          }
        ],
        quiz: [
          {
            id: 'qb1',
            question: {
              en: 'Does your actual SBI, HDFC, or ICICI bank branch manager ever call you to ask for your OTP?',
              hi: 'क्या आपके असली बैंक मैनेजर कभी फोन पर आपसे OTP मांगते हैं?',
              mr: 'तुमच्या बँकेचे मॅनेजर कधीही फोनवर OTP मागतात का?'
            },
            options: {
              en: ['No, NEVER! Banks never ask for OTP', 'Yes, every Monday', 'Yes, for KYC renewal'],
              hi: ['नहीं, कभी नहीं! बैंक कभी OTP नहीं मांगता', 'हाँ, हर सोमवार', 'हाँ, केवाईसी के लिए'],
              mr: ['नाही, कधीच नाही! बँक कधीही OTP मागत नाही', 'होय, दर सोमवारी', 'होय, केवायसीसाठी']
            },
            correctIndex: 0,
            explanation: {
              en: 'Official RBI banking regulations strictly forbid bank employees from asking customers for their OTP.',
              hi: 'आरबीआई के नियमों के अनुसार बैंक का कोई भी कर्मचारी कभी ग्राहक से OTP नहीं मांग सकता।',
              mr: 'आरबीआयच्या नियमांनुसार बँकेचा कोणताही कर्मचारी कधीही ग्राहकाकडे OTP मागत नाही.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'cybersecurity-awareness',
    title: {
      en: 'Cybersecurity Awareness',
      hi: 'साइबर सुरक्षा जागरूकता',
      mr: 'सायबर सुरक्षा जनजागृती'
    },
    description: {
      en: 'Learn how to detect fake electricity bill SMS, digital arrest threats, and malicious APK files.',
      hi: 'बिजली बिल कटने वाले फर्जी एसएमएस, नकली पुलिस वीडियो कॉल और खतरनाक ऐप को पहचानें।',
      mr: 'लाईट बिल कापण्याचे खोटे मेसेज, डिजिटल अरेस्टच्या धमक्या आणि धोकादायक ॲप्स ओळखा.'
    },
    iconName: 'ShieldCheck',
    level: 'intermediate',
    category: 'safety',
    lessons: [
      {
        id: 'fake-police-scam',
        title: {
          en: 'Understanding the Fake Police / "Digital Arrest" Scam',
          hi: 'नकली पुलिस और "डिजिटल अरेस्ट" के धोखे को समझें',
          mr: 'बनावट पोलीस आणि "डिजिटल अरेस्ट" ची फसवणूक ओळखा'
        },
        durationMinutes: 7,
        summary: {
          en: 'No Indian police, CBI, or court ever interrogates citizens over Skype or WhatsApp video call.',
          hi: 'भारत की कोई भी पुलिस, सीबीआई या अदालत कभी भी व्हाट्सएप वीडियो कॉल पर जांच नहीं करती।',
          mr: 'भारतातील कोणतेही पोलीस किंवा न्यायालय व्हॉट्सॲप व्हिडिओ कॉलवर चौकशी करत नाही.'
        },
        steps: [
          {
            title: {
              en: 'Step 1: The Scammer’s Threat',
              hi: 'कदम १: धोखेबाजों की धमकी को पहचानें',
              mr: 'पायरी १: भामट्यांची धमकी ओळखा'
            },
            description: {
              en: 'Fraudsters wear fake police uniforms on video call, claim your Aadhaar was found in illegal drug parcels, and order you to stay on camera and transfer money.',
              hi: 'धोखेबाज नकली पुलिस वर्दी पहनकर वीडियो कॉल करते हैं और कहते हैं कि आपके आधार कार्ड पर नशीला पार्सल पकड़ा गया है। वे पैसे ट्रांसफर करने को कहते हैं।',
              mr: 'भामटे पोलिसांचा बनावट गणवेश घालून व्हिडिओ कॉल करतात आणि म्हणतात तुमच्या नावावर पार्सल सापडले आहे, पैसे भरा.'
            },
            iconName: 'AlertCircle'
          },
          {
            title: {
              en: 'Step 2: Know the Law — "Digital Arrest" Does NOT Exist',
              hi: 'कदम २: कानून जानें — "डिजिटल अरेस्ट" नाम की कोई चीज नहीं होती',
              mr: 'पायरी २: कायदा जाणून घ्या — "डिजिटल अरेस्ट" असा कोणताही प्रकार अस्तित्वात नाही'
            },
            description: {
              en: 'Indian law has no provision for arresting someone on video call or demanding verification money. Disconnect immediately and call 1930.',
              hi: 'भारतीय कानून में वीडियो कॉल पर किसी को गिरफ्तार करने या पैसे मांगने का कोई प्रावधान नहीं है। तुरंत फोन काटें और १९३० पर कॉल करें।',
              mr: 'व्हिडिओ कॉलवर अटक करण्याचा कोणताही कायदा नाही. ताबडतोब कॉल कट करा आणि १९३० वर तक्रार नोंदवा.'
            },
            iconName: 'PhoneCall'
          }
        ],
        quiz: [
          {
            id: 'qc1',
            question: {
              en: 'Can Mumbai Police or CBI arrest you over a WhatsApp video call?',
              hi: 'क्या पुलिस या सीबीआई आपको व्हाट्सएप वीडियो कॉल पर गिरफ्तार कर सकती है?',
              mr: 'पोलीस किंवा सीबीआय तुम्हाला व्हॉट्सॲप व्हिडिओ कॉलवर अटक करू शकतात का?'
            },
            options: {
              en: ['No! "Digital Arrest" is a complete fraud', 'Yes, if they wear uniform', 'Yes, on Sundays'],
              hi: ['नहीं! "डिजिटल अरेस्ट" पूरी तरह से फर्जी धोखा है', 'हाँ, अगर वर्दी में हों', 'हाँ, केवल रविवार को'],
              mr: ['नाही! "डिजिटल अरेस्ट" ही निव्वळ फसवणूक आहे', 'होय, गणवेशात असल्यास', 'होय, रविवारी']
            },
            correctIndex: 0,
            explanation: {
              en: 'Law enforcement agencies never arrest or demand money via video calls. Report to 1930 immediately.',
              hi: 'पुलिस कभी वीडियो कॉल पर पैसे नहीं मांगती। ऐसा कॉल आने पर तुरंत १९३० पर कॉल करें।',
              mr: 'पोलीस कधीही व्हिडिओ कॉलवर पैसे मागत नाहीत. असा कॉल आल्यास तात्काळ १९३० ला कळवा.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'government-services',
    title: {
      en: 'Government Digital Services',
      hi: 'सरकारी डिजिटल सेवाएं',
      mr: 'शासकीय डिजिटल सेवा'
    },
    description: {
      en: 'Submit Life Certificate (Jeevan Pramaan) from home, access DigiLocker, and check pension status.',
      hi: 'घर बैठे जीवन प्रमाण पत्र (डिजिटल लाइफ सर्टिफिकेट) जमा करें और पेंशन स्थिति देखें।',
      mr: 'घरी बसून जीवन प्रमाणपत्र (Jeevan Pramaan) सादर करा आणि पेन्शन तपासा.'
    },
    iconName: 'Landmark',
    level: 'intermediate',
    category: 'government',
    lessons: [
      {
        id: 'jeevan-pramaan',
        title: {
          en: 'Submitting Life Certificate (Jeevan Pramaan) from Home',
          hi: 'घर बैठे डिजिटल जीवन प्रमाण पत्र जमा करना',
          mr: 'घरी बसून डिजिटल जीवन प्रमाणपत्र देणे'
        },
        durationMinutes: 6,
        summary: {
          en: 'You no longer need to stand in long bank queues every November. Use your phone camera face authentication.',
          hi: 'अब हर नवंबर बैंक की लंबी कतारों में खड़े होने की जरूरत नहीं। फोन के कैमरे से चेहरा दिखाकर प्रमाण पत्र जमा करें।',
          mr: 'दर नोव्हेंबरला बँकेच्या रांगेत उभे राहण्याची गरज नाही. मोबाईलच्या कॅमेऱ्याने चेहरा दाखवून प्रमाणपत्र सादर करा.'
        },
        steps: [
          {
            title: {
              en: 'Step 1: Download Jeevan Pramaan & AadhaarFaceRd App',
              hi: 'कदम १: जीवन प्रमाण और आधार फेस ऑथेंटिकेशन ऐप डाउनलोड करें',
              mr: 'पायरी १: जीवन प्रमाण आणि आधार फेस ऑथेंटिकेशन ॲप डाऊनलोड करा'
            },
            description: {
              en: 'Install official Govt app from Google Play Store with help of family.',
              hi: 'गूगल प्ले स्टोर से भारत सरकार का आधिकारिक ऐप डाउनलोड करें।',
              mr: 'गुगल प्ले स्टोअरवरून अधिकृत सरकारी ॲप डाऊनलोड करा.'
            },
            iconName: 'Download'
          },
          {
            title: {
              en: 'Step 2: Look into the camera and blink gently',
              hi: 'कदम २: कैमरे में देखें और हल्के से पलकें झपकाएं',
              mr: 'पायरी २: कॅमेऱ्यात पहा आणि हलकेच डोळ्यांची पापणी लववा'
            },
            description: {
              en: 'Hold your head straight in good room light. When prompted, blink once. Your certificate is submitted instantly to the bank!',
              hi: 'अच्छी रोशनी में बैठें, कैमरे की ओर देखें और एक बार पलक झपकाएं। आपका प्रमाण पत्र सीधे बैंक में जमा हो जाएगा!',
              mr: 'चांगल्या प्रकाशात बसा, कॅमेऱ्याकडे पहा आणि पापणी लववा. तुमचे प्रमाणपत्र थेट बँकेत जमा होईल!'
            },
            iconName: 'Eye'
          }
        ],
        quiz: [
          {
            id: 'qg1',
            question: {
              en: 'What is the government portal to submit pension life certificates digitally from home?',
              hi: 'घर से पेंशन का जीवन प्रमाण पत्र जमा करने वाले सरकारी ऐप का क्या नाम है?',
              mr: 'घरी बसून पेन्शनचे जीवन प्रमाणपत्र सादर करणाऱ्या सरकारी ॲपचे नाव काय आहे?'
            },
            options: {
              en: ['Jeevan Pramaan', 'Candy Crush', 'Netflix'],
              hi: ['जीवन प्रमाण (Jeevan Pramaan)', 'कैंडी क्रश', 'नेटफ्लिक्स'],
              mr: ['जीवन प्रमाण (Jeevan Pramaan)', 'कँडी क्रश', 'नेटफ्लिक्स']
            },
            correctIndex: 0,
            explanation: {
              en: 'Jeevan Pramaan is the official Govt of India platform for digital life certificates for pensioners.',
              hi: 'जीवन प्रमाण भारत सरकार का आधिकारिक पेंशन पोर्टल है।',
              mr: 'जीवन प्रमाण हे भारत सरकारचे अधिकृत पेन्शन पोर्टल आहे.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'computer-skills',
    title: {
      en: 'Basic Computer & Tablet Skills',
      hi: 'कंप्यूटर और टैबलेट की बुनियादी बातें',
      mr: 'संगणक आणि टॅब्लेटची प्राथमिक माहिती'
    },
    description: {
      en: 'Learn how to use mouse pointer, keyboard buttons, web browser, and adjust zoom for easy reading.',
      hi: 'माउस चलाना, कीबोर्ड पर लिखना, स्क्रीन बड़ी करना और कंप्यूटर पर अखबार पढ़ना सीखें।',
      mr: 'माऊस वापरणे, कीबोर्ड, फॉन्ट मोठा करणे आणि संगणकावर वर्तमानपत्र वाचणे शिका.'
    },
    iconName: 'Monitor',
    level: 'beginner',
    category: 'basics',
    lessons: [
      {
        id: 'mouse-and-zoom',
        title: {
          en: 'Using the Mouse and Zooming Large Letters',
          hi: 'माउस चलाना और अक्षरों को बड़ा करना',
          mr: 'माऊस वापरणे आणि अक्षरे मोठी करणे'
        },
        durationMinutes: 5,
        summary: {
          en: 'Hold the mouse comfortably and press Ctrl and + to make small letters easy on your eyes.',
          hi: 'माउस को आराम से पकड़ें और अक्षरों को बड़ा करने के लिए कीबोर्ड पर Ctrl और + दबाएं।',
          mr: 'माऊस सहजपणे धरा आणि अक्षरे मोठी दिसण्यासाठी कीबोर्डवर Ctrl आणि + दाबा.'
        },
        steps: [
          {
            title: {
              en: 'Step 1: Holding the Mouse Comfortably',
              hi: 'कदम १: माउस को आराम से हथेली में रखें',
              mr: 'पायरी १: माऊस तळहातावर सहजपणे ठेवा'
            },
            description: {
              en: 'Rest your right hand over the mouse gently. Your index finger rests on the left button.',
              hi: 'माउस पर अपना हाथ आराम से रखें। आपकी तर्जनी उंगली बाईं ओर के बटन पर रहेगी।',
              mr: 'माऊसवर हात हलकेच ठेवा. तर्जनी डाव्या बटनावर ठेवा.'
            },
            iconName: 'Mouse'
          },
          {
            title: {
              en: 'Step 2: Zooming In on Small Newspaper Words',
              hi: 'कदम २: छोटे अक्षरों को बड़ा करना (ज़ूम इन)',
              mr: 'पायरी २: लहान अक्षरे मोठी करणे (झूम इन)'
            },
            description: {
              en: 'Hold down the "Ctrl" key at the bottom corner and tap the "+" key. The text will become big and clear.',
              hi: 'कीबोर्ड पर "Ctrl" बटन दबाए रखें और "+" दबाएं। अक्षर बड़े और साफ हो जाएंगे।',
              mr: 'कीबोर्डवरील "Ctrl" बटन दाबून धरून "+" दाबा. सर्व अक्षरे मोठी आणि सुस्पष्ट दिसतील.'
            },
            iconName: 'ZoomIn'
          }
        ],
        quiz: [
          {
            id: 'qc2',
            question: {
              en: 'If words on a computer screen are too small to read, what can you do?',
              hi: 'यदि कंप्यूटर पर अक्षर बहुत छोटे दिख रहे हों, तो क्या करें?',
              mr: 'संगणकावर अक्षरे खूप लहान दिसत असल्यास काय करावे?'
            },
            options: {
              en: ['Use Ctrl and + to zoom in and make them large', 'Throw the computer', 'Close eyes'],
              hi: ['Ctrl और + दबाकर अक्षरों को बड़ा करें', 'कंप्यूटर फेंक दें', 'आंखें बंद कर लें'],
              mr: ['Ctrl आणि + दाबून अक्षरे मोठी करा', 'संगणक फेकून द्या', 'डोळे बंद करा']
            },
            correctIndex: 0,
            explanation: {
              en: 'Zooming increases text size so your eyes don’t feel tired.',
              hi: 'ज़ूम करने से अक्षर बड़े हो जाते हैं जिससे आंखों पर जोर नहीं पड़ता।',
              mr: 'झूम केल्याने अक्षरे मोठी होतात आणि डोळ्यांवर ताण येत नाही.'
            }
          }
        ]
      }
    ]
  }
];
