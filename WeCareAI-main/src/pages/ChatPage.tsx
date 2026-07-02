import { useState, useRef, useEffect } from 'react';
import {
  Send, Bot, User, Loader2, AlertTriangle, Phone,
  Trash2, Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useGemini } from '../hooks/useGemini';
import { helplineNumbers } from '../data/mockData';

export default function ChatPage() {
  const { t, language } = useApp();
  const { messages, loading, sendMessage, clearMessages } = useGemini();
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const [showHelpline, setShowHelpline] = useState(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || loading) return;
    sendMessage(input.trim());
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickPrompts = language === 'hi'
    ? ['मुझे बुखार है', 'पेट दर्द हो रहा है', 'कौन से दस्तावेज़ चाहिए', 'आपातकालीन अस्पताल खोजें']
    : ['I have fever', 'I have stomach pain', 'What documents do I need?', 'Find emergency hospital'];

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h2 className="font-bold text-gray-800">{t('AI Chat Assistant', 'AI चैट सहायक')}</h2>
            <div className="flex items-center gap-1.5">
              <div className="pulse-dot" />
              <span className="text-xs text-gray-500">{t('Online', 'ऑनलाइन')}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHelpline(!showHelpline)}
            className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
            title="Helpline"
          >
            <Phone size={18} />
          </button>
          <button
            onClick={clearMessages}
            className="p-2 rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors"
            title="Clear chat"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Helpline Panel */}
      {showHelpline && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-xl p-4 animate-slide-in">
          <h3 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
            <Phone size={16} /> {t('Emergency Helplines', 'आपातकालीन हेल्पलाइन')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {helplineNumbers.map((h, i) => (
              <a key={i} href={`tel:${h.number}`} className="flex items-center justify-between bg-white rounded-lg p-2 px-3 text-sm hover:bg-red-50 transition-colors">
                <span className="text-gray-700">{language === 'hi' ? h.nameHindi : h.name}</span>
                <span className="font-mono font-semibold text-red-600">{h.number}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mb-4">
              <Sparkles size={28} className="text-primary-500" />
            </div>
            <h3 className="font-semibold text-gray-700 mb-2">
              {t('How can I help you today?', 'आज मैं आपकी कैसे मदद कर सकता हूं?')}
            </h3>
            <p className="text-sm text-gray-400 mb-6 max-w-md">
              {t('Tell me your symptoms and I\'ll guide you to the right OPD, or ask about documents, wait times, and more.',
                  'मुझे अपने लक्षण बताएं और मैं आपको सही ओपीडी तक पहुंचाऊंगा, या दस्तावेज़ों, प्रतीक्षा समय आदि के बारे में पूछें।')}
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(prompt)}
                  className="px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm
                             hover:bg-primary-100 transition-colors font-medium"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-3 animate-slide-in ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                <Bot size={16} className="text-primary-600" />
              </div>
            )}
            <div className="flex flex-col">
              {msg.isFrustrated && msg.role === 'user' && (
                <div className="flex items-center gap-1 mb-1 ml-auto">
                  <AlertTriangle size={12} className="text-amber-500" />
                  <span className="text-[10px] text-amber-600">{t('Frustration detected', 'निराशा पहचानी गई')}</span>
                </div>
              )}
              <div className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}>
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
              {msg.empathyResponse && (
                <div className="mt-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 max-w-[80%]">
                  <p className="text-xs text-amber-700 flex items-center gap-1">
                    <Heart size={12} className="text-red-400" />
                    {msg.empathyResponse}
                  </p>
                </div>
              )}
            </div>
            {msg.role === 'user' && (
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center shrink-0">
                <User size={16} className="text-white" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 animate-fade-in">
            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
              <Bot size={16} className="text-primary-600" />
            </div>
            <div className="chat-bubble-ai flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-primary-500" />
              <span className="text-sm text-gray-400">{t('Thinking...', 'सोच रहा हूं...')}</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-100 pt-4">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('Type your symptoms or question...', 'अपने लक्षण या सवाल लिखें...')}
            className="input-field flex-1 resize-none min-h-[44px] max-h-[120px]"
            rows={1}
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="btn-primary px-4 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Heart({ size, className }: { size: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}
