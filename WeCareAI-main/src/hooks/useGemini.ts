import { useState, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { opdToSymptomMap, opdDepartments, frustrationKeywords, helplineNumbers } from '../data/mockData';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isFrustrated?: boolean;
  empathyResponse?: string;
}

const fallbackResponses: Record<string, string> = {
  opd: "Based on your symptoms, I recommend visiting the {opd} department. It's located on Floor {floor}, Room {room}. The current estimated wait time is approximately {waitTime} minutes.",
  opdHindi: "आपके लक्षणों के आधार पर, मैं {opd} विभाग में जाने की सलाह देता हूं। यह फ्लोर {floor}, कमरा {room} पर स्थित है। वर्तमान अनुमानित प्रतीक्षा समय लगभग {waitTime} मिनट है।",
  general: "I'm here to help you navigate the hospital. You can tell me your symptoms, ask about required documents, or inquire about OPD departments. How can I assist you today?",
  generalHindi: "मैं अस्पताल में आपकी मदद करने के लिए यहां हूं। आप मुझे अपने लक्षण बता सकते हैं, आवश्यक दस्तावेजों के बारे में पूछ सकते हैं, या ओपीडी विभागों के बारे में पूछ सकते हैं। आज मैं आपकी कैसे मदद कर सकता हूं?",
  frustration: "I understand this can be stressful. Please know that you're not alone — hospital visits can be overwhelming. Here are some helpline numbers that might help:\n\n",
  frustrationHindi: "मैं समझता हूं कि यह तनावपूर्ण हो सकता है। कृपया जानें कि आप अकेले नहीं हैं — अस्पताल की यात्रा भारी हो सकती है। यहां कुछ हेल्पलाइन नंबर हैं जो मदद कर सकते हैं:\n\n",
};

function detectOPD(message: string): { id: string; name: string; nameHindi: string; floor: number; room: string; waitTime: number } | null {
  const lowerMsg = message.toLowerCase();
  for (const [opdId, symptoms] of Object.entries(opdToSymptomMap)) {
    for (const symptom of symptoms) {
      if (lowerMsg.includes(symptom.toLowerCase())) {
        const dept = opdDepartments.find(d => d.id === opdId);
        if (dept) return { id: dept.id, name: dept.name, nameHindi: dept.nameHindi, floor: dept.floor, room: dept.room, waitTime: dept.waitTime };
      }
    }
  }
  return null;
}

function detectFrustration(message: string): boolean {
  const lowerMsg = message.toLowerCase();
  const exclamations = (message.match(/!/g) || []).length;
  const capsRatio = (message.replace(/[^A-Z]/g, '').length) / Math.max(message.replace(/[^a-zA-Z]/g, '').length, 1);
  return frustrationKeywords.some(kw => lowerMsg.includes(kw)) || exclamations >= 3 || capsRatio > 0.5;
}

export function useGemini() {
  const { geminiApiKey, language } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const generateResponse = useCallback(async (userMessage: string): Promise<string> => {
    const opd = detectOPD(userMessage);
    const isFrustrated = detectFrustration(userMessage);

    if (geminiApiKey) {
      try {
        console.log("CURRENT KEY =", geminiApiKey);
        console.log("API KEY FOUND:", geminiApiKey);
        const systemPrompt = `You are WeCareAI, an AI assistant for Indian government hospital patients. Help patients find the right OPD department, understand document requirements, and navigate the hospital. Be empathetic, clear, and supportive. Respond in ${language === 'hi' ? 'Hindi' : 'English'}. If the patient seems frustrated, show empathy first. Keep responses concise and practical. ${opd ? `Based on symptoms, the patient should visit ${opd.name} on Floor ${opd.floor}, Room ${opd.room}. Wait time ~${opd.waitTime} mins.` : ''}`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                { role: 'user', parts: [{ text: systemPrompt }] },
                { role: 'model', parts: [{ text: 'Understood. I will help patients navigate the hospital with empathy and clarity.' }] },
                { role: 'user', parts: [{ text: userMessage }] },
              ],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 500,
              },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            let result = text;
            if (isFrustrated) {
              const helplineText = helplineNumbers.map(h =>
                `${h.name}: ${h.number}`
              ).join('\n');
              result = (language === 'hi' ? fallbackResponses.frustrationHindi : fallbackResponses.frustration) + helplineText + '\n\n' + result;
            }
            return result;
          }
        }
      }  catch (error) {
  console.error("Gemini Error:", error);
}
    }

    // Fallback responses
    if (isFrustrated) {
      const helplineText = helplineNumbers.map(h =>
        `• ${language === 'hi' ? h.nameHindi : h.name}: ${h.number}`
      ).join('\n');
      return (language === 'hi' ? fallbackResponses.frustrationHindi : fallbackResponses.frustration) + helplineText;
    }

    if (opd) {
      const template = language === 'hi' ? fallbackResponses.opdHindi : fallbackResponses.opd;
      return template
        .replace('{opd}', language === 'hi' ? opd.nameHindi : opd.name)
        .replace('{floor}', String(opd.floor))
        .replace('{room}', opd.room)
        .replace('{waitTime}', String(opd.waitTime));
    }

    return language === 'hi' ? fallbackResponses.generalHindi : fallbackResponses.general;
  }, [geminiApiKey, language]);

  const sendMessage = useCallback(async (content: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
      isFrustrated: detectFrustration(content),
    };

    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const response = await generateResponse(content);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        isFrustrated: userMsg.isFrustrated,
        empathyResponse: userMsg.isFrustrated ? (language === 'hi' ? 'आपकी भावनाओं को समझा जाता है' : 'Your feelings are understood') : undefined,
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch {
      const errMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: language === 'hi' ? 'क्षमा करें, कुछ गलत हो गया। कृपया पुनः प्रयास करें।' : 'Sorry, something went wrong. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  }, [generateResponse, language]);

  const clearMessages = useCallback(() => setMessages([]), []);

  return { messages, loading, sendMessage, clearMessages };
}
