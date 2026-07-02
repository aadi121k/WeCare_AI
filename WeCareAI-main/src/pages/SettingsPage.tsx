import { Settings, Globe, Shield, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function SettingsPage() {
  const { t } = useApp();

  return (
    <div className="animate-fade-in max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gray-600 rounded-xl flex items-center justify-center">
          <Settings size={20} className="text-white" />
        </div>

        <div>
          <h2 className="font-bold text-gray-800">
            {t('Settings', 'सेटिंग्स')}
          </h2>

          <p className="text-sm text-gray-500">
            {t(
              'Manage your application preferences',
              'अपनी एप्लिकेशन सेटिंग्स प्रबंधित करें'
            )}
          </p>
        </div>
      </div>

      {/* Language */}
      <div className="card p-6 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Globe size={18} className="text-primary-600" />
          <h3 className="font-semibold text-gray-800">
            {t('Language', 'भाषा')}
          </h3>
        </div>

        <p className="text-sm text-gray-500">
          English / हिन्दी
        </p>
      </div>

      {/* Privacy */}
      <div className="card p-6 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Shield size={18} className="text-primary-600" />
          <h3 className="font-semibold text-gray-800">
            {t('Privacy', 'गोपनीयता')}
          </h3>
        </div>

        <p className="text-sm text-gray-500 leading-6">
          {t(
            'Your uploaded medical reports are securely processed for analysis and are not permanently stored.',
            'आपकी मेडिकल रिपोर्ट सुरक्षित रूप से विश्लेषण के लिए प्रोसेस की जाती हैं और स्थायी रूप से संग्रहीत नहीं की जाती हैं।'
          )}
        </p>
      </div>

      {/* About */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-3">
          <Info size={18} className="text-primary-600" />
          <h3 className="font-semibold text-gray-800">
            {t('About WeCare AI', 'WeCare AI के बारे में')}
          </h3>
        </div>

        <div className="space-y-3 text-sm text-gray-500 leading-6">
          <p>
            {t(
              'WeCare AI is an intelligent healthcare assistant that helps patients understand medical reports, navigate hospitals, and access healthcare services with AI-powered guidance.',
              'WeCare AI एक बुद्धिमान हेल्थकेयर सहायक है जो मरीजों को मेडिकल रिपोर्ट समझने, अस्पताल में सही विभाग तक पहुंचने और स्वास्थ्य सेवाओं का उपयोग करने में सहायता करता है।'
            )}
          </p>

          <p>
            {t(
              'Designed to make healthcare simpler, faster and more accessible for everyone.',
              'स्वास्थ्य सेवाओं को सभी के लिए सरल, तेज़ और अधिक सुलभ बनाने के उद्देश्य से विकसित किया गया है।'
            )}
          </p>
        </div>
      </div>
    </div>
  );
}