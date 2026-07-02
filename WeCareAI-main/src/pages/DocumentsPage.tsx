import { useState } from 'react';
import { FileText, Check, ClipboardList, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { documentsByVisitType } from '../data/mockData';

type VisitType = 'opd' | 'admission' | 'emergency';

const visitTypes: { id: VisitType; en: string; hi: string; icon: string }[] = [
  { id: 'opd', en: 'OPD Visit', hi: 'ओपीडी विजिट', icon: '🩺' },
  { id: 'admission', en: 'Admission', hi: 'भर्ती', icon: '🏥' },
  { id: 'emergency', en: 'Emergency', hi: 'आपातकाल', icon: '🚨' },
];

export default function DocumentsPage() {
  const { t, language } = useApp();
  const [selectedType, setSelectedType] = useState<VisitType>('opd');
  const [checkedDocs, setCheckedDocs] = useState<Set<string>>(new Set());

  const docs = documentsByVisitType[selectedType] || [];

  const toggleDoc = (id: string) => {
    setCheckedDocs(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const requiredDocs = docs.filter(d => d.required);
  const optionalDocs = docs.filter(d => !d.required);
  const checkedRequired = requiredDocs.filter(d => checkedDocs.has(d.id)).length;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
          <FileText size={20} className="text-white" />
        </div>
        <div>
          <h2 className="font-bold text-gray-800">{t('Document Checklist', 'दस्तावेज़ चेकलिस्ट')}</h2>
          <p className="text-sm text-gray-500">{t('Know what to bring before your visit', 'विजिट से पहले जानें क्या लाना है')}</p>
        </div>
      </div>

      {/* Visit Type Selector */}
      <div className="flex gap-2 mb-6">
        {visitTypes.map(vt => (
          <button
            key={vt.id}
            onClick={() => { setSelectedType(vt.id); setCheckedDocs(new Set()); }}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200
              ${selectedType === vt.id
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
          >
            <span className="mr-1.5">{vt.icon}</span>
            {t(vt.en, vt.hi)}
          </button>
        ))}
      </div>

      {/* Progress */}
      <div className="mb-6 bg-primary-50 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-primary-800">
            {t('Required Documents', 'आवश्यक दस्तावेज़')}
          </span>
          <span className="text-sm font-bold text-primary-600">
            {checkedRequired}/{requiredDocs.length}
          </span>
        </div>
        <div className="w-full bg-primary-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${requiredDocs.length ? (checkedRequired / requiredDocs.length) * 100 : 0}%` }}
          />
        </div>
        {checkedRequired === requiredDocs.length && requiredDocs.length > 0 && (
          <p className="text-xs text-accent-600 mt-2 flex items-center gap-1">
            <Check size={12} /> {t('All required documents ready!', 'सभी आवश्यक दस्तावेज़ तैयार!')}
          </p>
        )}
      </div>

      {/* Required Documents */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <AlertCircle size={16} className="text-red-500" />
          {t('Required', 'आवश्यक')}
        </h3>
        <div className="space-y-2">
          {requiredDocs.map(doc => (
            <button
              key={doc.id}
              onClick={() => toggleDoc(doc.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200
                ${checkedDocs.has(doc.id)
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-white border border-gray-100 hover:bg-gray-50'
                }`}
            >
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors
                ${checkedDocs.has(doc.id) ? 'bg-green-500' : 'bg-gray-200'}`}>
                {checkedDocs.has(doc.id) && <Check size={14} className="text-white" />}
              </div>
              <span className={`text-sm font-medium ${checkedDocs.has(doc.id) ? 'text-green-700 line-through' : 'text-gray-700'}`}>
                {language === 'hi' ? doc.nameHindi : doc.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Optional Documents */}
      {optionalDocs.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <ClipboardList size={16} className="text-gray-400" />
            {t('Optional (helpful to bring)', 'वैकल्पिक (लाना उपयोगी)')}
          </h3>
          <div className="space-y-2">
            {optionalDocs.map(doc => (
              <button
                key={doc.id}
                onClick={() => toggleDoc(doc.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200
                  ${checkedDocs.has(doc.id)
                    ? 'bg-blue-50 border border-blue-200'
                    : 'bg-white border border-gray-100 hover:bg-gray-50'
                  }`}
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors
                  ${checkedDocs.has(doc.id) ? 'bg-blue-500' : 'bg-gray-200'}`}>
                  {checkedDocs.has(doc.id) && <Check size={14} className="text-white" />}
                </div>
                <span className={`text-sm ${checkedDocs.has(doc.id) ? 'text-blue-700 line-through' : 'text-gray-600'}`}>
                  {language === 'hi' ? doc.nameHindi : doc.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
