import { useState, useEffect } from 'react';
import { Clock, Users, RefreshCw, BarChart2, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { opdDepartments } from '../data/mockData';

export default function QueuePage() {
  const { t, language } = useApp();
  const [departments, setDepartments] = useState(opdDepartments);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const refreshQueue = () => {
    setDepartments(prev =>
      prev.map(d => ({
        ...d,
        waitTime: Math.max(5, d.waitTime + Math.floor(Math.random() * 11) - 5),
        queueCount: Math.max(1, d.queueCount + Math.floor(Math.random() * 7) - 3),
      }))
    );
    setLastUpdated(new Date());
  };

  useEffect(() => {
    const interval = setInterval(refreshQueue, 30000);
    return () => clearInterval(interval);
  }, []);

  const getWaitColor = (time: number) => {
    if (time <= 20) return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200', dot: 'bg-green-500' };
    if (time <= 45) return { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200', dot: 'bg-yellow-500' };
    return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' };
  };

  const totalPatients = departments.reduce((sum, d) => sum + d.queueCount, 0);
  const avgWait = Math.round(departments.reduce((sum, d) => sum + d.waitTime, 0) / departments.length);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
            <Clock size={20} className="text-white" />
          </div>
          <div>
            <h2 className="font-bold text-gray-800">{t('Queue & Wait Time', 'कतार और प्रतीक्षा समय')}</h2>
            <p className="text-sm text-gray-500">{t('Live OPD queue status', 'लाइव ओपीडी कतार स्थिति')}</p>
          </div>
        </div>
        <button
          onClick={refreshQueue}
          className="btn-secondary flex items-center gap-2 text-sm"
        >
          <RefreshCw size={14} />
          {t('Refresh', 'रिफ्रेश')}
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="card p-4 text-center">
          <Users size={20} className="mx-auto text-primary-500 mb-1" />
          <p className="text-2xl font-bold text-primary-900">{totalPatients}</p>
          <p className="text-xs text-gray-500">{t('Total Waiting', 'कुल प्रतीक्षा')}</p>
        </div>
        <div className="card p-4 text-center">
          <BarChart2 size={20} className="mx-auto text-amber-500 mb-1" />
          <p className="text-2xl font-bold text-primary-900">{avgWait}</p>
          <p className="text-xs text-gray-500">{t('Avg Wait (min)', 'औसत प्रतीक्षा (मिनट)')}</p>
        </div>
        <div className="card p-4 text-center">
          <TrendingUp size={20} className="mx-auto text-red-500 mb-1" />
          <p className="text-2xl font-bold text-primary-900">{departments.filter(d => d.waitTime > 45).length}</p>
          <p className="text-xs text-gray-500">{t('High Load OPDs', 'उच्च भार ओपीडी')}</p>
        </div>
      </div>

      {/* Last Updated */}
      <p className="text-xs text-gray-400 mb-4 flex items-center gap-1">
        <div className="pulse-dot" />
        {t('Last updated', 'अंतिम अपडेट')}: {lastUpdated.toLocaleTimeString()}
      </p>

      {/* Color Legend */}
      <div className="flex items-center gap-4 mb-4 text-xs">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" /> {t('Short (≤20 min)', 'कम (≤20 मिनट)')}</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500" /> {t('Medium (21-45 min)', 'मध्यम (21-45 मिनट)')}</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> {t('Long (>45 min)', 'लंबी (>45 मिनट)')}</span>
      </div>

      {/* Department List */}
      <div className="space-y-3">
        {departments
          .sort((a, b) => b.waitTime - a.waitTime)
          .map(dept => {
            const colors = getWaitColor(dept.waitTime);
            return (
              <div key={dept.id} className={`card p-4 border ${colors.border} animate-slide-in`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${colors.dot}`} />
                    <h3 className="font-semibold text-gray-800">
                      {language === 'hi' ? dept.nameHindi : dept.name}
                    </h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${colors.bg} ${colors.text}`}>
                    ~{dept.waitTime} min
                  </span>
                </div>
                {/* Wait time bar */}
                <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${colors.dot}`}
                    style={{ width: `${Math.min((dept.waitTime / 90) * 100, 100)}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Users size={12} /> {dept.queueCount} {t('patients in queue', 'कतार में मरीज')}
                  </span>
                  <span>{t('Floor', 'फ्लोर')} {dept.floor} | {t('Room', 'कमरा')} {dept.room}</span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
