
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ChatMessage } from '../types';
import { GoogleGenAI } from "@google/genai";

interface ChatProps {
  currentUser: User;
}

const CHAT_CHANNEL = 'sc_live_chat';
const STORAGE_KEY = 'sc_chat_history_v2';

const Chat: React.FC<ChatProps> = ({ currentUser }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const socket = new WebSocket(`${protocol}//${window.location.host}`);

    socket.onopen = () => {
      console.log('Connected to chat server');
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'SYNC_HISTORY') {
          setMessages(data.payload);
        } else if (data.type === 'NEW_MESSAGE') {
          setMessages(prev => {
            // Avoid duplicates (if any)
            if (prev.some(m => m.id === data.payload.id)) return prev;
            return [...prev, data.payload];
          });
        }
      } catch (err) {
        console.error('Error parsing socket message:', err);
      }
    };

    socket.onclose = () => {
      console.log('Disconnected from chat server');
      // Simple reconnection logic
      setTimeout(() => {
        // Re-trigger effect or handle reconnection
      }, 3000);
    };

    socketRef.current = socket;

    return () => socket.close();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const handleAiResponse = async (userPrompt: string) => {
    setIsTyping(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `أنت "المساعد الإبداعي الرسمي" لـ منصة مبدعون (Sudanese Creators).
        معلومات العضو الذي يكلمك:
        - الاسم: ${currentUser.fullName}
        - رقم العضوية: ${currentUser.username}
        - المجموعة: ${currentUser.group}
        
        سألك العضو: "${userPrompt}".
        رد عليه بأسلوب "حقيقي"، مشجع، وملهم. استخدم لهجة سودانية مهذبة وراقية (فصحى بلمسة عامية خفيفة). ذكره دائماً أن مجده الإبداعي يبدأ بخطوة.`,
        config: { thinkingConfig: { thinkingBudget: 2000 } }
      });

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        userId: 'ai-assistant',
        userName: 'مساعد مبدعون الذكي',
        text: response.text || "أهلاً بك يا مبدع، أنا معك.",
        timestamp: new Date().toISOString()
      };

      // Send AI message to server to broadcast
      socketRef.current?.send(JSON.stringify({ type: 'NEW_MESSAGE', payload: aiMsg }));
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      userId: currentUser.id,
      userName: currentUser.fullName,
      text: textToSend,
      timestamp: new Date().toISOString()
    };

    // Send to server
    socketRef.current?.send(JSON.stringify({ type: 'NEW_MESSAGE', payload: newMessage }));

    if (textToSend.includes('@منصة') || textToSend.includes('يا مساعد')) {
      handleAiResponse(textToSend);
    }

    if (!textOverride) setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-white relative rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-2xl shadow-gray-200/50">
      <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-white/90 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-teal-900/20">AI</div>
          <div>
            <h3 className="font-black text-gray-900 text-base tracking-tight">مجلس المبدعين</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <p className="text-[10px] text-green-600 font-black uppercase tracking-widest">متصل الآن</p>
            </div>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 bg-gray-50/30 no-scrollbar">
        {messages.map((msg) => {
          const isMe = msg.userId === currentUser.id;
          const isAi = msg.userId === 'ai-assistant';
          
          return (
            <motion.div 
              key={msg.id} 
              initial={{ opacity: 0, x: isMe ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex flex-col ${isMe ? 'items-start' : 'items-end'}`}
            >
              <div className={`flex items-end gap-3 max-w-[85%] ${isMe ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center font-black text-xs shadow-sm ${
                  isMe ? 'bg-gray-900 text-white' : isAi ? 'bg-gradient-to-br from-teal-600 to-emerald-600 text-white' : 'bg-white text-gray-400 border border-gray-100'
                }`}>
                  {msg.userName.charAt(0)}
                </div>
                <div className={`px-6 py-4 rounded-[1.5rem] shadow-sm border ${
                  isMe ? 'bg-white text-gray-800 border-gray-100 rounded-br-none' : isAi ? 'bg-teal-600 text-white border-teal-500 rounded-bl-none shadow-teal-900/10' : 'bg-white text-gray-800 border-gray-100 rounded-bl-none'
                }`}>
                  {!isMe && <p className={`text-[9px] font-black mb-1.5 uppercase tracking-widest ${isAi ? 'text-teal-100' : 'text-teal-600'}`}>{msg.userName}</p>}
                  <p className="text-sm leading-relaxed font-medium">{msg.text}</p>
                </div>
              </div>
              <p className="text-[8px] text-gray-400 font-black uppercase tracking-widest mt-2 px-12">{new Date(msg.timestamp).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}</p>
            </motion.div>
          );
        })}
        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-teal-600 rounded-xl flex items-center justify-center text-white font-black animate-pulse">AI</div>
            <div className="bg-teal-50 px-6 py-3 rounded-2xl border border-teal-100">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-white border-t border-gray-50">
        <div className="flex gap-3 bg-gray-50/50 p-2 rounded-[1.5rem] border border-gray-100 focus-within:ring-4 focus-within:ring-teal-500/5 focus-within:bg-white transition-all">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="اسأل المساعد... (استخدم @منصة)"
            className="flex-1 bg-transparent px-6 py-3 text-sm outline-none font-medium placeholder:text-gray-400"
          />
          <button onClick={() => handleSend()} className="bg-gray-900 text-white w-12 h-12 rounded-2xl hover:bg-teal-600 transition-all flex items-center justify-center shadow-lg active:scale-95">
            <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
