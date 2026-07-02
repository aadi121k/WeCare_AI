import { useState } from 'react';
import { Search, MapPin, Clock, Users, ArrowRight, Stethoscope } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { opdDepartments, opdToSymptomMap } from '../data/mockData';

export default function OPDPage() {
  const {
    t,
    language,
    setCurrentPage,
    recommendedDepartment,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [matchedOpd, setMatchedOpd] = useState<string | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    const lower = query.toLowerCase();

    for (const [opdId, symptoms] of Object.entries(opdToSymptomMap)) {
      if (symptoms.some(s => lower.includes(s.toLowerCase()))) {
        setMatchedOpd(opdId);
        return;
      }
    }

    setMatchedOpd(null);
  };

  const getWaitColor = (time: number) => {
    if (time <= 20) return 'status-green';
    if (time <= 45) return 'status-yellow';
    return 'status-red';
  };

  // Match department using partial text
 const normalizedDepartment = (() => {
  const dept = recommendedDepartment.toLowerCase();

  if (dept.includes("hematology")) return "General Medicine";
  if (dept.includes("anemia")) return "General Medicine";
  if (dept.includes("heart")) return "Cardiology";
  if (dept.includes("cardio")) return "Cardiology";
  if (dept.includes("bone")) return "Orthopaedics";
  if (dept.includes("ortho")) return "Orthopaedics";
  if (dept.includes("brain")) return "Neurology";
  if (dept.includes("neuro")) return "Neurology";
  if (dept.includes("eye")) return "Ophthalmology";
  if (dept.includes("skin")) return "Dermatology";
  if (dept.includes("ent")) return "ENT";
  if (dept.includes("ear")) return "ENT";
  if (dept.includes("nose")) return "ENT";
  if (dept.includes("throat")) return "ENT";
  if (dept.includes("child")) return "Pediatrics";
  if (dept.includes("pediatric")) return "Pediatrics";
  if (dept.includes("preg")) return "Gynecology";
  if (dept.includes("gyn")) return "Gynecology";

  return recommendedDepartment;
})();

const aiMatchedDepartment = opdDepartments.find(
  dept =>
    dept.name.toLowerCase() ===
    normalizedDepartment.toLowerCase()
);

  const highlightedDepartment = aiMatchedDepartment?.id || matchedOpd;

  const filteredDepartments = searchQuery
    ? opdDepartments.filter(
        d =>
          d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.nameHindi.includes(searchQuery) ||
          (highlightedDepartment && d.id === highlightedDepartment)
      )
    : opdDepartments;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
          <Stethoscope size={20} className="text-white" />
        </div>
        <div>
          <h2 className="font-bold text-gray-800">{t('OPD Navigator', 'ओपीडी नेविगेटर')}</h2>
          <p className="text-sm text-gray-500">{t('Find the right department for your symptoms', 'अपने लक्षणों के लिए सही विभाग खोजें')}</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => handleSearch(e.target.value)}
          placeholder={t('Type your symptoms (e.g., fever, chest pain)...', 'अपने लक्षण लिखें (जैसे, बुखार, सीने में दर्द)...')}
          className="input-field pl-10"
        />
      </div>

      {/* Matched OPD Highlight */}
      {matchedOpd && (
        <div className="mb-6 bg-primary-50 border-2 border-primary-200 rounded-xl p-5 animate-slide-in">
          <div className="flex items-center gap-2 mb-2">
            <ArrowRight size={18} className="text-primary-600" />
            <span className="text-sm font-semibold text-primary-700">{t('Recommended Department', 'सुझावित विभाग')}</span>
          </div>
          {(() => {
            const dept = opdDepartments.find(d => d.id === matchedOpd);
            if (!dept) return null;
            return (
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-primary-900">
                    {language === 'hi' ? dept.nameHindi : dept.name}
                  </h3>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className="flex items-center gap-1 text-gray-600">
                      <MapPin size={14} /> {t('Floor', 'फ्लोर')} {dept.floor}
                    </span>
                    <span className="flex items-center gap-1 text-gray-600">
                      {t('Room', 'कमरा')} {dept.room}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getWaitColor(dept.waitTime)}`}>
                    <Clock size={14} className="inline mr-1" />
                    ~{dept.waitTime} min
                  </span>
                  <button
                    onClick={() => setCurrentPage('token')}
                    className="btn-primary text-sm"
                  >
                    {t('Get Token', 'टोकन लें')}
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Department List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredDepartments.map(dept => (
          <div key={dept.id} className="card p-4 animate-slide-in">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">
                  {language === 'hi' ? dept.nameHindi : dept.name}
                </h3>
                <div className="flex items-center gap-3 mt-1.5 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin size={13} /> {t('Floor', 'फ्लोर')} {dept.floor}
                  </span>
                  <span>{t('Room', 'कमरा')} {dept.room}</span>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getWaitColor(dept.waitTime)}`}>
                {dept.waitTime} min
              </span>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Users size={13} /> {dept.queueCount} {t('in queue', 'कतार में')}
              </div>
              <button
                onClick={() => setCurrentPage('token')}
                className="text-primary-600 text-xs font-medium hover:underline flex items-center gap-1"
              >
                {t('Get Token', 'टोकन लें')} <ArrowRight size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
