import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  BotMessageSquare,
  Sparkles,
  RotateCcw,
  ShieldCheck,
  AlertCircle,
  Radio,
  Thermometer,
  Wind,
  Droplets,
} from 'lucide-react';
import { useAirQuality } from '../context/AirQualityContext';
import { useFamilyProfile } from '../context/FamilyProfileContext';
import { ChatMessage, SuggestedPrompt } from '../types/chat';
import { sendChatMessage, checkBackendHealth } from '../services/api';

const SUGGESTED_PROMPTS: SuggestedPrompt[] = [
  {
    id: 'p1',
    label: 'Morning Jog & Inversion',
    prompt: 'Given the current AQI and weather in my city, is it safe to go for a morning jog or should I exercise indoors?',
    category: 'winter-smog',
  },
  {
    id: 'p2',
    label: 'Air Purifier Night Settings',
    prompt: 'What are the best HEPA air purifier settings given our current winter smog and room temperature?',
    category: 'indoor',
  },
  {
    id: 'p3',
    label: 'Protecting Kids & Seniors',
    prompt: 'How can I protect my children and elderly family members from today\'s specific PM2.5 levels during commutes?',
    category: 'safety',
  },
  {
    id: 'p4',
    label: 'Weather & Smog Dispersion',
    prompt: 'How are today\'s temperature, humidity, and wind speed affecting smog buildup in my city?',
    category: 'winter-smog',
  },
  {
    id: 'p5',
    label: 'Sustainable Commute Swaps',
    prompt: 'What are 3 practical low-carbon daily commute habits I can adopt to avoid adding to urban smog?',
    category: 'habits',
  },
];

const STORAGE_CHAT_KEY = 'breathewise_chat_history';

export const AssistantPage: React.FC = () => {
  const { aqiData, isLiveFeed } = useAirQuality();
  const { profile } = useFamilyProfile();

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CHAT_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'msg-welcome',
        role: 'assistant',
        content: `Hello! I am **BreatheWise AI**, your real-time winter smog and urban air pollution assistant.
        
I am monitoring telemetry for **${aqiData?.city || profile.city}** (Current AQI: **${aqiData?.aqi || 342}** — **${aqiData?.category || 'Very Poor'}** • Temp: **${aqiData?.temperature || 18}°C** • Wind: **${aqiData?.windSpeed || 4} km/h** • **${isLiveFeed ? 'LIVE Sensor Telemetry' : 'DEMO Simulation Data'}**).

I can help your family choose safe exercise windows, configure HEPA filters, prepare school commutes, and adopt green daily habits. How can I help you breathe easier today?`,
        timestamp: 'Just now',
      },
    ];
  });

  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [backendStatus, setBackendStatus] = useState<{ checked: boolean; hasKey: boolean; service?: string }>({
    checked: false,
    hasKey: true,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CHAT_KEY, JSON.stringify(messages));
    } catch (err) {
      console.error('Failed to save chat to localStorage:', err);
    }
  }, [messages]);

  useEffect(() => {
    checkBackendHealth().then((res) => {
      setBackendStatus({
        checked: true,
        hasKey: res.hasGeminiKey,
        service: res.service,
      });
    });
  }, []);

  const handleSend = async (messageText: string) => {
    const textToSend = messageText.trim();
    if (!textToSend || isLoading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await sendChatMessage(textToSend, messages, profile, aqiData);

      const assistantMessage: ChatMessage = {
        id: `ast-${Date.now()}`,
        role: 'assistant',
        content: result.text,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        isFallback: result.isFallback,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content:
          'I apologize, but I encountered a momentary connection difficulty. Please check your network or backend server connection and try again.',
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    const initialMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'assistant',
      content: `Chat history cleared. I am ready with fresh recommendations for **${aqiData?.city || profile.city}**. How can I help you today?`,
      timestamp: 'Just now',
    };
    setMessages([initialMsg]);
    localStorage.removeItem(STORAGE_CHAT_KEY);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] max-w-5xl mx-auto space-y-3">
      {/* Top Banner: Context Info & Status */}
      <div className="bg-white rounded-2xl p-3.5 px-4 border border-slate-200/90 shadow-sm flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center shrink-0 shadow-sm">
            <BotMessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-sm font-bold text-slate-800">BreatheWise Environmental Assistant</h1>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                Gemini Powered
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                  isLiveFeed
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-amber-50 border-amber-300 text-amber-800'
                }`}
              >
                {isLiveFeed ? (
                  <>
                    <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
                    <span>LIVE SENSOR FEED</span>
                  </>
                ) : (
                  <span>DEMO READING</span>
                )}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5 flex-wrap">
              <span>{aqiData?.city || profile.city}</span>
              <span>•</span>
              <span className="font-semibold text-slate-700">AQI {aqiData?.aqi || 342} ({aqiData?.category || 'Very Poor'})</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Thermometer className="w-3 h-3 text-blue-500" />
                <span>{aqiData?.temperature || 18}°C</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Droplets className="w-3 h-3 text-teal-500" />
                <span>{aqiData?.humidity || 75}%</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Wind className="w-3 h-3 text-emerald-600" />
                <span>{aqiData?.windSpeed || 4} km/h</span>
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {backendStatus.checked && !backendStatus.hasKey && (
            <span
              title="Add GEMINI_API_KEY to your .env file to enable live Gemini AI generation."
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-300 text-amber-800 text-xs font-medium"
            >
              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>Local Knowledge Mode</span>
            </span>
          )}

          <button
            onClick={handleClearChat}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            title="Reset Conversation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Chat</span>
          </button>
        </div>
      </div>

      {/* API Key Missing Notice (Friendly & Non-intrusive) */}
      {backendStatus.checked && !backendStatus.hasKey && (
        <div className="bg-amber-50/90 border border-amber-200/90 rounded-xl p-3 px-4 text-xs text-amber-900 flex items-start gap-2.5 shrink-0">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold text-amber-950">Friendly Setup Notice: </span>
            The assistant is currently running via its intelligent local environmental knowledge engine. To unlock live Google Gemini AI capabilities, simply paste your free API key into <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono text-amber-900 font-semibold">GEMINI_API_KEY</code> in the project <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono text-amber-900">.env</code> file.
          </div>
        </div>
      )}

      {/* Chat Messages Scroll Container */}
      <div className="flex-1 overflow-y-auto bg-white rounded-3xl p-4 lg:p-6 border border-slate-200/90 shadow-sm space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  isUser
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-emerald-950 text-emerald-300 border border-emerald-700/50 shadow-sm'
                }`}
              >
                {isUser ? 'You' : <BotMessageSquare className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed ${
                  isUser
                    ? 'bg-emerald-600 text-white rounded-tr-none'
                    : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-none'
                }`}
              >
                {/* Text content with custom markdown-like render */}
                <div className="whitespace-pre-wrap space-y-2">
                  {msg.content.split('\n\n').map((paragraph, pIdx) => {
                    // Check for headers
                    if (paragraph.startsWith('### ')) {
                      return (
                        <h4 key={pIdx} className="font-bold text-base text-emerald-900 border-b border-emerald-100 pb-1 mt-2">
                          {paragraph.replace('### ', '')}
                        </h4>
                      );
                    }
                    if (paragraph.startsWith('> ')) {
                      return (
                        <blockquote key={pIdx} className="border-l-4 border-emerald-500 pl-3 py-1 bg-emerald-50/70 text-emerald-900 italic text-xs rounded-r">
                          {paragraph.replace('> ', '')}
                        </blockquote>
                      );
                    }
                    return <p key={pIdx}>{paragraph}</p>;
                  })}
                </div>

                <div
                  className={`flex items-center justify-between gap-2 mt-2 pt-2 text-[10px] ${
                    isUser ? 'text-emerald-200 border-t border-emerald-500/40' : 'text-slate-400 border-t border-slate-200/60'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {!isUser && (
                    <span className="flex items-center gap-1 font-medium">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>Certified CPCB Scale Guidance</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-950 text-emerald-300 flex items-center justify-center shrink-0">
              <BotMessageSquare className="w-4 h-4" />
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-none p-4 text-sm flex items-center gap-2 text-slate-500">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]" />
              </div>
              <span className="text-xs font-medium">Synthesizing personalized environmental guidance...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 shrink-0 scrollbar-none">
        <span className="text-xs font-semibold text-slate-400 shrink-0 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Suggestions:</span>
        </span>
        {SUGGESTED_PROMPTS.map((item) => (
          <button
            key={item.id}
            onClick={() => handleSend(item.prompt)}
            disabled={isLoading}
            className="text-xs bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-emerald-800 px-3 py-1.5 rounded-full whitespace-nowrap transition-colors font-medium shrink-0 disabled:opacity-50 cursor-pointer"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="bg-white rounded-2xl p-2 border border-slate-200/90 shadow-sm flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask about smog risks, N95 masks, exercise hours, or air purifiers in ${aqiData?.city || profile.city}...`}
          disabled={isLoading}
          className="flex-1 bg-transparent px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
        />

        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-semibold text-sm transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
