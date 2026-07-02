import {
  MessageSquare, Building2, FileText, Clock,
  Siren, Ticket, ArrowRight, Heart, Shield,Activity

} from 'lucide-react';
import { useApp } from '../context/AppContext';

const features = [
  { icon: MessageSquare, en: 'AI Chat Assistant', hi: 'AI चैट सहायक', descEn: 'Tell us your symptoms, get OPD guidance', descHi: 'अपने लक्षण बताएं, ओपीडी मार्गदर्शन पाएं', page: 'chat' as const, color: 'bg-blue-500' },
  { icon: Building2, en: 'OPD Navigator', hi: 'ओपीडी नेविगेटर', descEn: 'Find the right department instantly', descHi: 'सही विभाग तुरंत खोजें', page: 'opd' as const, color: 'bg-emerald-500' },
  { icon: FileText, en: 'Document Checklist', hi: 'दस्तावेज़ चेकलिस्ट', descEn: 'Know what documents to bring', descHi: 'जानें कौन से दस्तावेज़ लाने हैं', page: 'documents' as const, color: 'bg-amber-500' },
  { icon: Clock, en: 'Queue Status', hi: 'कतार स्थिति', descEn: 'Check live wait times', descHi: 'लाइव प्रतीक्षा समय देखें', page: 'queue' as const, color: 'bg-purple-500' },
  { icon: Siren, en: 'Emergency Finder', hi: 'आपातकाल खोज', descEn: 'Find nearest hospitals now', descHi: 'अभी निकटतम अस्पताल खोजें', page: 'emergency' as const, color: 'bg-red-500' },
  { icon: Ticket, en: 'Token Generator', hi: 'टोकन जनरेटर', descEn: 'Get your digital OPD token', descHi: 'अपना डिजिटल ओपीडी टोकन पाएं', page: 'token' as const, color: 'bg-teal-500' },
  {
  icon: Activity,
  en: 'Report Analyzer',
  hi: 'रिपोर्ट विश्लेषक',
  descEn: 'Upload and analyze medical reports',
  descHi: 'मेडिकल रिपोर्ट अपलोड और विश्लेषण करें',
  page: 'report' as const,
  color: 'bg-indigo-500',
},
];

const stats = [
  { icon: Building2, value: 'Delhi NCR', en: 'Coverage Area', hi: 'कवरेज क्षेत्र' },
  { icon: Shield, value: 'AI Powered', en: 'Smart Guidance', hi: 'स्मार्ट मार्गदर्शन' },
  { icon: Clock, value: '24/7', en: 'Always Available', hi: 'हमेशा उपलब्ध' },
];

export default function HomePage() {
  const { setCurrentPage, t } = useApp();

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950 rounded-2xl p-8 md:p-12 text-white overflow-hidden mb-8">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-400 rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Heart size={20} className="text-red-400" />
            <span className="text-primary-200 text-sm font-medium">{t('Powered by AI', 'AI द्वारा संचालित')}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            {t('Welcome to WeCareAI', 'WeCareAI में आपका स्वागत है')}
          </h1>
          <p className="text-primary-200 text-lg md:text-xl mb-8 max-w-2xl">
  {t(
    'Your AI-powered healthcare assistant for navigating major government hospitals across Delhi NCR. Get OPD guidance, document assistance, emergency support, and more.',
    'दिल्ली एनसीआर के प्रमुख सरकारी अस्पतालों में मार्गदर्शन के लिए आपका AI-संचालित स्वास्थ्य सहायक। ओपीडी मार्गदर्शन, दस्तावेज़ सहायता, आपातकालीन सहायता और अन्य सेवाएं प्राप्त करें।'
  )}
</p>
          <button
            onClick={() => setCurrentPage('chat')}
            className="inline-flex items-center gap-2 bg-white text-primary-900 px-6 py-3 rounded-xl
                       font-semibold hover:bg-primary-50 transition-all duration-200
                       active:scale-[0.98] shadow-lg"
          >
            {t('Start Conversation', 'बातचीत शुरू करें')}
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="card p-5 flex items-center gap-4 animate-slide-in" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                <Icon size={22} className="text-primary-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{t(stat.en, stat.hi)}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature Grid */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">{t('Quick Services', 'त्वरित सेवाएं')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feat, i) => {
          const Icon = feat.icon;
          return (
            <button
              key={i}
              onClick={() => setCurrentPage(feat.page)}
              className="card p-6 text-left group animate-slide-in hover:shadow-lg transition-all duration-200"
              style={{ animationDelay: `${(i + 3) * 80}ms` }}
            >
              <div className={`w-10 h-10 ${feat.color} rounded-lg flex items-center justify-center mb-3
                              group-hover:scale-110 transition-transform duration-200`}>
                <Icon size={20} className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{t(feat.en, feat.hi)}</h3>
              <p className="text-sm text-gray-500">{t(feat.descEn, feat.descHi)}</p>
              <div className="mt-3 flex items-center gap-1 text-primary-600 text-sm font-medium opacity-0
                              group-hover:opacity-100 transition-opacity duration-200">
                {t('Open', 'खोलें')} <ArrowRight size={14} />
              </div>
            </button>
          );
        })}
      </div>

            {/* Emergency Banner */}
      <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Siren size={24} className="text-red-600 shrink-0" />
        <div className="flex-1">
          <h3 className="font-semibold text-red-800">
            {t('Medical Emergency?', 'मेडिकल इमरजेंसी?')}
          </h3>
          <p className="text-sm text-red-600">
            {t(
              'Call 112 or find the nearest hospital now',
              '112 पर कॉल करें या अभी निकटतम अस्पताल खोजें'
            )}
          </p>
        </div>
        <button
          onClick={() => setCurrentPage('emergency')}
          className="bg-red-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors active:scale-[0.98] shrink-0"
        >
          {t('Find Hospital', 'अस्पताल खोजें')}
        </button>
      </div>

      {/* Credits */}
      <div className="mt-10 text-center text-sm text-gray-500 border-t border-gray-200 pt-6">
        <p className="font-medium">
          Developed by{' '}
          <span className="text-primary-700 font-bold">
            Aditya Upadhyay
          </span>{' '}
          (23119037)
        </p>
        <p className="mt-1">
          Jaypee Institute of Information Technology (JIIT), Noida
        </p>
      </div>
    </div>
  );
}