import { useState } from 'react';
import { Ticket, User, Calendar, FileText, Printer, Clock, Building, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { opdDepartments } from '../data/mockData';

interface TokenData {
  tokenNo: string;
  name: string;
  age: string;
  problem: string;
  opdId: string;
  opdName: string;
  estimatedTime: string;
  date: string;
  hospitalName: string;
}

export default function TokenPage() {
  const { t, language } = useApp();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [problem, setProblem] = useState('');
  const [selectedOpd, setSelectedOpd] = useState('');
  const [token, setToken] = useState<TokenData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    if (!name || !age || !problem || !selectedOpd) return;
    setLoading(true);

    setTimeout(() => {
      const dept = opdDepartments.find(d => d.id === selectedOpd);
      if (!dept) return;

      const tokenNo = `TKN-${String(Math.floor(Math.random() * 900) + 100)}`;
      const now = new Date();
      const estimatedMinutes = dept.waitTime + Math.floor(Math.random() * 15);
      const estimatedTime = new Date(now.getTime() + estimatedMinutes * 60000);

      setToken({
        tokenNo,
        name,
        age,
        problem,
        opdId: selectedOpd,
        opdName: language === 'hi' ? dept.nameHindi : dept.name,
        estimatedTime: estimatedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: now.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
        hospitalName: language === 'hi' ? 'एम्स नई दिल्ली' : 'AIIMS New Delhi',
      });
      setLoading(false);
    }, 1500);
  };

  const handlePrint = () => {
    window.print();
  };

  if (token) {
    return (
      <div className="animate-fade-in max-w-lg mx-auto">
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Check size={28} className="text-white" />
          </div>
          <h2 className="font-bold text-gray-800 text-xl">{t('Token Generated!', 'टोकन बन गया!')}</h2>
          <p className="text-sm text-gray-500">{t('Show this at the OPD counter', 'इसे ओपीडी काउंटर पर दिखाएं')}</p>
        </div>

        {/* Token Card */}
        <div className="token-print print-area bg-white border-2 border-dashed border-primary-600 rounded-2xl p-6 relative">
          {/* Header */}
          <div className="text-center pb-4 border-b border-gray-200">
            <p className="text-xs text-gray-400 uppercase tracking-wider">{token.hospitalName}</p>
            <p className="text-[10px] text-gray-300 mt-1">{t('Government of NCT of Delhi', 'दिल्ली एनसीटी सरकार')}</p>
          </div>

          {/* Token Number */}
          <div className="text-center py-5">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{t('Token Number', 'टोकन नंबर')}</p>
            <p className="text-4xl font-bold text-primary-700 tracking-wider">{token.tokenNo}</p>
          </div>

          {/* Details */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{t('Patient Name', 'मरीज का नाम')}</span>
              <span className="font-medium text-gray-800">{token.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{t('Age', 'उम्र')}</span>
              <span className="font-medium text-gray-800">{token.age} {t('years', 'साल')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{t('Problem', 'समस्या')}</span>
              <span className="font-medium text-gray-800">{token.problem}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{t('OPD Department', 'ओपीडी विभाग')}</span>
              <span className="font-medium text-primary-600">{token.opdName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 flex items-center gap-1"><Clock size={13} /> {t('Estimated Time', 'अनुमानित समय')}</span>
              <span className="font-medium text-gray-800">{token.estimatedTime}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{t('Date', 'तारीख')}</span>
              <span className="font-medium text-gray-800">{token.date}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6 no-print">
          <button onClick={handlePrint} className="btn-primary flex-1 flex items-center justify-center gap-2">
            <Printer size={16} /> {t('Print Token', 'टोकन प्रिंट करें')}
          </button>
          <button
            onClick={() => { setToken(null); setName(''); setAge(''); setProblem(''); setSelectedOpd(''); }}
            className="btn-secondary flex-1"
          >
            {t('New Token', 'नया टोकन')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center">
          <Ticket size={20} className="text-white" />
        </div>
        <div>
          <h2 className="font-bold text-gray-800">{t('Token Generator', 'टोकन जनरेटर')}</h2>
          <p className="text-sm text-gray-500">{t('Get your digital OPD token', 'अपना डिजिटल ओपीडी टोकन पाएं')}</p>
        </div>
      </div>

      <div className="card p-6 space-y-4">
        {/* Name */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block flex items-center gap-1.5">
            <User size={14} /> {t('Patient Name', 'मरीज का नाम')} *
          </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder={t('Enter your name', 'अपना नाम लिखें')}
            className="input-field"
          />
        </div>

        {/* Age */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block flex items-center gap-1.5">
            <Calendar size={14} /> {t('Age', 'उम्र')} *
          </label>
          <input
            type="number"
            value={age}
            onChange={e => setAge(e.target.value)}
            placeholder={t('Enter age in years', 'उम्र सालों में लिखें')}
            className="input-field"
            min="0"
            max="120"
          />
        </div>

        {/* Problem */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block flex items-center gap-1.5">
            <FileText size={14} /> {t('Problem / Symptoms', 'समस्या / लक्षण')} *
          </label>
          <textarea
            value={problem}
            onChange={e => setProblem(e.target.value)}
            placeholder={t('Describe your problem...', 'अपनी समस्या बताएं...')}
            className="input-field resize-none"
            rows={3}
          />
        </div>

        {/* OPD Selection */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block flex items-center gap-1.5">
            <Building size={14} /> {t('Select OPD Department', 'ओपीडी विभाग चुनें')} *
          </label>
          <select
            value={selectedOpd}
            onChange={e => setSelectedOpd(e.target.value)}
            className="input-field"
          >
            <option value="">{t('-- Select Department --', '-- विभाग चुनें --')}</option>
            {opdDepartments.map(dept => (
              <option key={dept.id} value={dept.id}>
                {language === 'hi' ? dept.nameHindi : dept.name} - {t('Floor', 'फ्लोर')} {dept.floor}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!name || !age || !problem || !selectedOpd || loading}
          className="btn-primary w-full flex items-center justify-center gap-2 mt-2
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              {t('Generating...', 'बना रहा है...')}
            </>
          ) : (
            <>
              <Ticket size={18} /> {t('Generate Token', 'टोकन बनाएं')}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
