import { useState, useEffect } from 'react';
import { BarChart3, Users, TrendingUp, Clock, Activity, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { opdDepartments, commonComplaints } from '../data/mockData';

interface TokenEntry {
  id: number;
  tokenNo: string;
  patientName: string;
  opd: string;
  status: 'waiting' | 'in-progress' | 'done';
  time: string;
}

const mockTokens: TokenEntry[] = [
  { id: 1, tokenNo: 'TKN-101', patientName: 'Ramesh Kumar', opd: 'General Medicine', status: 'in-progress', time: '09:15 AM' },
  { id: 2, tokenNo: 'TKN-102', patientName: 'Priya Sharma', opd: 'Gynecology', status: 'waiting', time: '09:22 AM' },
  { id: 3, tokenNo: 'TKN-103', patientName: 'Arun Singh', opd: 'Orthopaedics', status: 'waiting', time: '09:30 AM' },
  { id: 4, tokenNo: 'TKN-104', patientName: 'Sunita Devi', opd: 'Cardiology', status: 'in-progress', time: '09:35 AM' },
  { id: 5, tokenNo: 'TKN-105', patientName: 'Vikram Patel', opd: 'ENT', status: 'waiting', time: '09:41 AM' },
  { id: 6, tokenNo: 'TKN-106', patientName: 'Anita Gupta', opd: 'Dermatology', status: 'done', time: '08:50 AM' },
  { id: 7, tokenNo: 'TKN-107', patientName: 'Manoj Tiwari', opd: 'General Medicine', status: 'done', time: '08:30 AM' },
  { id: 8, tokenNo: 'TKN-108', patientName: 'Kavita Joshi', opd: 'Ophthalmology', status: 'waiting', time: '09:50 AM' },
];

export default function AdminPage() {
  const { t, language } = useApp();
  const [patientCount, setPatientCount] = useState(1247);
  const [tokens] = useState(mockTokens);

  useEffect(() => {
    const interval = setInterval(() => {
      setPatientCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const maxLoad = Math.max(...opdDepartments.map(d => d.queueCount));

  const statusColors = {
    'waiting': 'bg-yellow-100 text-yellow-700',
    'in-progress': 'bg-blue-100 text-blue-700',
    'done': 'bg-green-100 text-green-700',
  };

  const statusLabels = {
    'waiting': t('Waiting', 'प्रतीक्षा'),
    'in-progress': t('In Progress', 'जारी'),
    'done': t('Done', 'हो गया'),
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary-700 rounded-xl flex items-center justify-center">
          <BarChart3 size={20} className="text-white" />
        </div>
        <div>
          <h2 className="font-bold text-gray-800">{t('Admin Dashboard', 'एडमिन डैशबोर्ड')}</h2>
          <p className="text-sm text-gray-500">{t('Hospital operations overview', 'अस्पताल संचालन अवलोकन')}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <div className="card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users size={16} className="text-primary-500" />
            <span className="text-xs text-gray-400">{t('Today\'s Patients', 'आज के मरीज')}</span>
          </div>
          <p className="text-2xl font-bold text-primary-900">{patientCount.toLocaleString()}</p>
          <p className="text-xs text-accent-600 mt-1 flex items-center gap-1">
            <TrendingUp size={10} /> +12% {t('from yesterday', 'कल से')}
          </p>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className="text-amber-500" />
            <span className="text-xs text-gray-400">{t('Avg Wait Time', 'औसत प्रतीक्षा')}</span>
          </div>
          <p className="text-2xl font-bold text-primary-900">38 min</p>
          <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
            <AlertTriangle size={10} /> {t('High load', 'उच्च भार')}
          </p>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity size={16} className="text-green-500" />
            <span className="text-xs text-gray-400">{t('Active OPDs', 'सक्रिय ओपीडी')}</span>
          </div>
          <p className="text-2xl font-bold text-primary-900">{opdDepartments.length}</p>
          <p className="text-xs text-gray-400 mt-1">{t('All operational', 'सभी चालू')}</p>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 size={16} className="text-blue-500" />
            <span className="text-xs text-gray-400">{t('Tokens Issued', 'टोकन जारी')}</span>
          </div>
          <p className="text-2xl font-bold text-primary-900">{patientCount - 847}</p>
          <p className="text-xs text-gray-400 mt-1">{t('Today', 'आज')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* OPD Load Chart */}
        <div className="card p-5">
          <h3 className="font-semibold text-gray-800 mb-4">{t('OPD-wise Patient Load', 'ओपीडीवार मरीज भार')}</h3>
          <div className="space-y-3">
            {opdDepartments
              .sort((a, b) => b.queueCount - a.queueCount)
              .map(dept => {
                const pct = (dept.queueCount / maxLoad) * 100;
                const barColor = dept.waitTime > 45 ? 'bg-red-500' : dept.waitTime > 20 ? 'bg-amber-500' : 'bg-green-500';
                return (
                  <div key={dept.id}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-700">
                        {language === 'hi' ? dept.nameHindi : dept.name}
                      </span>
                      <span className="text-sm font-semibold text-gray-800">{dept.queueCount}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full transition-all duration-500 ${barColor}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Common Complaints */}
        <div className="card p-5">
          <h3 className="font-semibold text-gray-800 mb-4">{t('Most Common Complaints', 'सबसे आम शिकायतें')}</h3>
          <div className="space-y-2">
            {commonComplaints.map((complaint, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-primary-50 rounded-full flex items-center justify-center text-xs font-bold text-primary-600">
                    {i + 1}
                  </span>
                  <span className="text-sm text-gray-700">
                    {language === 'hi' ? complaint.nameHindi : complaint.name}
                  </span>
                </div>
                <span className="text-sm font-semibold text-gray-800">{complaint.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Token Queue */}
      <div className="card p-5 mt-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <div className="pulse-dot" />
          {t('Live Token Queue', 'लाइव टोकन कतार')}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 text-xs uppercase tracking-wider">
                <th className="pb-3 pr-4">{t('Token', 'टोकन')}</th>
                <th className="pb-3 pr-4">{t('Patient', 'मरीज')}</th>
                <th className="pb-3 pr-4">{t('OPD', 'ओपीडी')}</th>
                <th className="pb-3 pr-4">{t('Time', 'समय')}</th>
                <th className="pb-3">{t('Status', 'स्थिति')}</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map(token => (
                <tr key={token.id} className="border-t border-gray-50">
                  <td className="py-3 pr-4 font-mono font-semibold text-primary-600">{token.tokenNo}</td>
                  <td className="py-3 pr-4 text-gray-700">{token.patientName}</td>
                  <td className="py-3 pr-4 text-gray-600">{token.opd}</td>
                  <td className="py-3 pr-4 text-gray-500">{token.time}</td>
                  <td className="py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[token.status]}`}>
                      {statusLabels[token.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
