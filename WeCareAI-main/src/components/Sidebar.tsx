import {
  Home, MessageSquare, Building2, FileText, Clock,
  Siren, Ticket, BarChart3, Settings, Globe, Menu, X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const navItems = [
  { id: 'home' as const, icon: Home, en: 'Home', hi: 'होम' },
  { id: 'chat' as const, icon: MessageSquare, en: 'AI Chat', hi: 'AI चैट' },
  { id: 'opd' as const, icon: Building2, en: 'OPD Navigator', hi: 'ओपीडी नेविगेटर' },
  { id: 'documents' as const, icon: FileText, en: 'Documents', hi: 'दस्तावेज़' },
  { id: 'queue' as const, icon: Clock, en: 'Queue Status', hi: 'कतार स्थिति' },
  { id: 'emergency' as const, icon: Siren, en: 'Emergency', hi: 'आपातकाल' },
  { id: 'token' as const, icon: Ticket, en: 'Token', hi: 'टोकन' },

  { id: 'report' as const, icon: FileText, en: 'Report Analyzer', hi: 'रिपोर्ट विश्लेषण' },

  { id: 'admin' as const, icon: BarChart3, en: 'Admin', hi: 'एडमिन' },
  { id: 'settings' as const, icon: Settings, en: 'Settings', hi: 'सेटिंग्स' },
];

export default function Sidebar() {
  const { currentPage, setCurrentPage, language, toggleLanguage, t, sidebarOpen, setSidebarOpen } = useApp();

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-primary-800 text-white rounded-lg shadow-lg"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-primary-900 to-primary-950
        z-40 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-primary-900 font-bold text-lg">W</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">WeCareAI</h1>
              <p className="text-primary-300 text-xs">{t('Hospital Assistant', 'अस्पताल सहायक')}</p>
            </div>
          </div>
        </div>

        {/* Language Toggle */}
        <div className="px-4 py-3 border-b border-white/10">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg bg-white/10 text-white text-sm
                       hover:bg-white/20 transition-colors"
          >
            <Globe size={16} />
            <span>{language === 'en' ? 'हिंदी में देखें' : 'View in English'}</span>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setCurrentPage(item.id); setSidebarOpen(false); }}
                className={isActive ? 'sidebar-link-active w-full' : 'sidebar-link w-full'}
              >
                <Icon size={18} />
                <span>{t(item.en, item.hi)}</span>
                {isActive && <div className="ml-auto w-1.5 h-1.5 bg-accent-400 rounded-full" />}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-primary-400 text-xs">
            <div className="pulse-dot" />
            <span>{t('System Online', 'सिस्टम चालू है')}</span>
          </div>
          <p className="text-primary-500 text-[10px] mt-2">
            {t('Delhi Govt. Hospital Network', 'दिल्ली सरकार अस्पताल नेटवर्क')}
          </p>
        </div>
      </aside>
    </>
  );
}
