export interface OPDDepartment {
  id: string;
  name: string;
  nameHindi: string;
  floor: number;
  room: string;
  waitTime: number;
  queueCount: number;
  icon: string;
}

export interface Hospital {
  id: string;
  name: string;
  nameHindi: string;
  address: string;
  addressHindi: string;
  phone: string;
  distance: string;
  emergencyDepts: string[];
  lat: number;
  lng: number;
}

export interface Document {
  id: string;
  name: string;
  nameHindi: string;
  required: boolean;
}

export const opdDepartments: OPDDepartment[] = [
  { id: 'gen-med', name: 'General Medicine', nameHindi: 'सामान्य चिकित्सा', floor: 1, room: '101-110', waitTime: 45, queueCount: 32, icon: 'Stethoscope' },
  { id: 'ortho', name: 'Orthopaedics', nameHindi: 'अस्थि रोग', floor: 2, room: '201-208', waitTime: 30, queueCount: 18, icon: 'Bone' },
  { id: 'cardio', name: 'Cardiology', nameHindi: 'हृदय रोग', floor: 3, room: '301-306', waitTime: 60, queueCount: 24, icon: 'Heart' },
  { id: 'pediatrics', name: 'Pediatrics', nameHindi: 'बाल रोग', floor: 1, room: '120-128', waitTime: 25, queueCount: 15, icon: 'Baby' },
  { id: 'gynae', name: 'Gynecology', nameHindi: 'स्त्री रोग', floor: 2, room: '210-218', waitTime: 50, queueCount: 28, icon: 'Heart' },
  { id: 'ent', name: 'ENT', nameHindi: 'कान-नाक-गला', floor: 2, room: '230-236', waitTime: 20, queueCount: 12, icon: 'Ear' },
  { id: 'eye', name: 'Ophthalmology', nameHindi: 'नेत्र रोग', floor: 3, room: '310-316', waitTime: 35, queueCount: 20, icon: 'Eye' },
  { id: 'derm', name: 'Dermatology', nameHindi: 'त्वचा रोग', floor: 2, room: '240-246', waitTime: 15, queueCount: 8, icon: 'Hand' },
  { id: 'surgery', name: 'General Surgery', nameHindi: 'सामान्य सर्जरी', floor: 3, room: '320-328', waitTime: 55, queueCount: 22, icon: 'Scissors' },
  { id: 'neuro', name: 'Neurology', nameHindi: 'मस्तिष्क रोग', floor: 4, room: '401-408', waitTime: 70, queueCount: 30, icon: 'Brain' },
];

export const hospitals: Hospital[] = [
  {
    id: 'aiims',
    name: 'AIIMS New Delhi',
    nameHindi: 'एम्स नई दिल्ली',
    address: 'Ansari Nagar, Aurobindo Marg, New Delhi - 110029',
    addressHindi: 'अंसारी नगर, अरविंद मार्ग, नई दिल्ली - 110029',
    phone: '011-26588500',
    distance: '2.3 km',
    emergencyDepts: ['Trauma', 'Cardiac', 'Neuro', 'Pediatric'],
    lat: 28.5672,
    lng: 77.2109,
  },
  {
    id: 'safdarjung',
    name: 'Safdarjung Hospital',
    nameHindi: 'सफदरजंग अस्पताल',
    address: 'Safdarjung Campus, Ansari Nagar, New Delhi - 110029',
    addressHindi: 'सफदरजंग कैंपस, अंसारी नगर, नई दिल्ली - 110029',
    phone: '011-26165950',
    distance: '3.1 km',
    emergencyDepts: ['Trauma', 'Burns', 'General', 'Pediatric'],
    lat: 28.5682,
    lng: 77.2068,
  },
  {
    id: 'rml',
    name: 'RML Hospital',
    nameHindi: 'आरएमएल अस्पताल',
    address: 'Baba Kharak Singh Marg, New Delhi - 110001',
    addressHindi: 'बाबा खड़क सिंह मार्ग, नई दिल्ली - 110001',
    phone: '011-23365400',
    distance: '4.5 km',
    emergencyDepts: ['Trauma', 'Cardiac', 'General'],
    lat: 28.6304,
    lng: 77.2177,
  },
  {
    id: 'gtb',
    name: 'GTB Hospital',
    nameHindi: 'जीटीबी अस्पताल',
    address: 'Dilshad Garden, Delhi - 110095',
    addressHindi: 'दिलशाद गार्डन, दिल्ली - 110095',
    phone: '011-22591411',
    distance: '8.2 km',
    emergencyDepts: ['Trauma', 'General', 'Pediatric', 'Burns'],
    lat: 28.6762,
    lng: 77.3053,
  },
  {
    id: 'loknayak',
    name: 'Lok Nayak Hospital',
    nameHindi: 'लोक नायक अस्पताल',
    address: 'JLN Marg, Near Delhi Gate, New Delhi - 110002',
    addressHindi: 'जेएलएन मार्ग, दिल्ली गेट के पास, नई दिल्ली - 110002',
    phone: '011-23234571',
    distance: '5.7 km',
    emergencyDepts: ['Trauma', 'Burns', 'General', 'Cardiac'],
    lat: 28.6406,
    lng: 77.2429,
  },
];

export const documentsByVisitType: Record<string, Document[]> = {
  opd: [
    { id: 'aadhaar', name: 'Aadhaar Card', nameHindi: 'आधार कार्ड', required: true },
    { id: 'opd-slip', name: 'OPD Registration Slip', nameHindi: 'ओपीडी पंजीकरण स्लिप', required: true },
    { id: 'prev-presc', name: 'Previous Prescription', nameHindi: 'पिछला पर्चा', required: false },
    { id: 'prev-reports', name: 'Previous Reports', nameHindi: 'पिछली रिपोर्टें', required: false },
    { id: 'referral', name: 'Referral Letter (if any)', nameHindi: 'रेफरल लेटर (अगर हो)', required: false },
    { id: 'photo', name: 'Passport Size Photo', nameHindi: 'पासपोर्ट साइज फोटो', required: false },
  ],
  admission: [
    { id: 'aadhaar', name: 'Aadhaar Card', nameHindi: 'आधार कार्ड', required: true },
    { id: 'admission-slip', name: 'Admission Slip', nameHindi: 'भर्ती स्लिप', required: true },
    { id: 'doctor-ref', name: 'Doctor Referral', nameHindi: 'डॉक्टर रेफरल', required: true },
    { id: 'insurance', name: 'Insurance Card (if any)', nameHindi: 'बीमा कार्ड (अगर हो)', required: false },
    { id: 'prev-presc', name: 'Previous Prescription', nameHindi: 'पिछला पर्चा', required: false },
    { id: 'prev-reports', name: 'Previous Reports', nameHindi: 'पिछली रिपोर्टें', required: false },
    { id: 'photo', name: 'Passport Size Photo', nameHindi: 'पासपोर्ट साइज फोटो', required: false },
    { id: 'blood-group', name: 'Blood Group Report', nameHindi: 'ब्लड ग्रुप रिपोर्ट', required: true },
  ],
  emergency: [
    { id: 'aadhaar', name: 'Aadhaar Card (if available)', nameHindi: 'आधार कार्ड (अगर उपलब्ध हो)', required: false },
    { id: 'any-id', name: 'Any Government ID', nameHindi: 'कोई भी सरकारी पहचान पत्र', required: false },
    { id: 'prev-presc', name: 'Previous Prescription (if any)', nameHindi: 'पिछला पर्चा (अगर हो)', required: false },
    { id: 'med-list', name: 'Current Medication List', nameHindi: 'वर्तमान दवाइयों की सूची', required: false },
  ],
};

export const helplineNumbers = [
  { name: 'AIIMS Helpline', nameHindi: 'एम्स हेल्पलाइन', number: '011-26588500' },
  { name: 'Centralized Accident Helpline', nameHindi: 'केंद्रीय दुर्घटना हेल्पलाइन', number: '108' },
  { name: 'Women Helpline', nameHindi: 'महिला हेल्पलाइन', number: '1091' },
  { name: 'Mental Health Helpline', nameHindi: 'मानसिक स्वास्थ्य हेल्पलाइन', number: '080-46110007' },
  { name: 'Delhi Emergency', nameHindi: 'दिल्ली इमरजेंसी', number: '112' },
];

export const commonComplaints = [
  { name: 'Fever', nameHindi: 'बुखार', count: 145, opd: 'gen-med' },
  { name: 'Cough/Cold', nameHindi: 'खांसी/जुकाम', count: 98, opd: 'gen-med' },
  { name: 'Body Pain', nameHindi: 'बदन दर्द', count: 76, opd: 'ortho' },
  { name: 'Skin Problems', nameHindi: 'त्वचा समस्या', count: 62, opd: 'derm' },
  { name: 'Stomach Pain', nameHindi: 'पेट दर्द', count: 58, opd: 'gen-med' },
  { name: 'Eye Problems', nameHindi: 'आंख की समस्या', count: 45, opd: 'eye' },
  { name: 'Ear Pain', nameHindi: 'कान दर्द', count: 34, opd: 'ent' },
  { name: 'Chest Pain', nameHindi: 'सीने में दर्द', count: 29, opd: 'cardio' },
];

export const frustrationKeywords = [
  'angry', 'frustrated', 'tired', 'fed up', 'sick of', 'useless', 'worst',
  'horrible', 'terrible', 'hate', 'annoyed', 'irritated', 'helpless',
  'गुस्सा', 'परेशान', 'थका हुआ', 'निराश', 'बेकार', 'घृणा', 'तंग', 'मदद',
  'परेशानी', 'दुखी', 'क्रोध', 'उदास',
];

export const opdToSymptomMap: Record<string, string[]> = {
  'gen-med': ['fever', 'cold', 'cough', 'headache', 'stomach pain', 'body ache', 'weakness', 'nausea', 'diabetes', 'bp', 'thyroid', 'बुखार', 'जुकाम', 'खांसी', 'सिरदर्द', 'पेट दर्द', 'कमजोरी', 'मधुमेह', 'बीपी', 'थायराइड', 'उल्टी'],
  'ortho': ['bone fracture', 'joint pain', 'back pain', 'neck pain', 'sprain', 'arthritis', 'हड्डी टूटना', 'जोड़ दर्द', 'कमर दर्द', 'गर्दन दर्द', 'मोच', 'गठिया'],
  'cardio': ['chest pain', 'heart problem', 'palpitation', 'breathing difficulty', 'high bp', 'सीने में दर्द', 'दिल की समस्या', 'धड़कन', 'सांस की तकलीफ'],
  'pediatrics': ['child fever', 'baby crying', 'vaccination', 'child not eating', 'बच्चे को बुखार', 'बच्चा रो रहा', 'टीकाकरण', 'बच्चा खाना नहीं खा रहा'],
  'gynae': ['pregnancy', 'periods problem', 'female issue', 'delivery', 'pregnancy checkup', 'गर्भावस्था', 'माहवारी की समस्या', 'डिलीवरी', 'प्रेगनेंसी चेकअप'],
  'ent': ['ear pain', 'hearing problem', 'throat pain', 'nose bleeding', 'sinus', 'snoring', 'कान दर्द', 'सुनाई नहीं देता', 'गले में दर्द', 'नाक से खून', 'साइनस'],
  'eye': ['eye pain', 'blurry vision', 'red eye', 'cataract', 'glasses', 'आंख दर्द', 'धुंधली नजर', 'लाल आंख', 'मोतियाबिंद', 'चश्मा'],
  'derm': ['skin rash', 'itching', 'acne', 'eczema', 'fungal infection', 'skin allergy', 'चर्म रोग', 'खुजली', 'फुंसी', 'एक्जिमा', 'फंगल इन्फेक्शन', 'त्वचा एलर्जी'],
  'surgery': ['hernia', 'appendix', 'gallbladder stone', 'wound', 'abscess', 'हर्निया', 'अपेंडिक्स', 'पित्त की पथरी', 'घाव', 'फोड़ा'],
  'neuro': ['seizure', 'epilepsy', 'head injury', 'numbness', 'tremor', 'migraine', 'मिरगी', 'सिर की चोट', 'सुन्नपन', 'कंपन', 'माइग्रेन'],
};
