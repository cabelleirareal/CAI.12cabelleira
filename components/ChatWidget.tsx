import React, { useState, useRef, useEffect } from 'react';
import { streamChatResponse } from '../services/geminiService';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ sender: 'bot', text: 'Olá! Sou a Cabelleira.IA. Posso te ajudar com colorimetria, fórmulas ou dicas para o salão?' }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  // Click outside to close logic
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        isOpen &&
        chatContainerRef.current &&
        !chatContainerRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input; // capture for stream
    setInput('');
    setIsLoading(true);

    let botResponse = '';
    const botMessage: Message = { sender: 'bot', text: '' };
    setMessages(prev => [...prev, botMessage]);

    try {
      const stream = await streamChatResponse(currentInput);
      for await (const chunk of stream) {
        botResponse += chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { sender: 'bot', text: botResponse };
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Chat stream error:', error);
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = { sender: 'bot', text: 'Desculpe, tive um problema técnico. Pode tentar de novo?' };
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFabClick = () => {
    if (isOpen) {
      handleSend();
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleFabClick}
        className={`fixed bottom-6 right-6 h-14 w-14 md:h-16 md:w-16 bg-gradient-to-r from-brand-purple to-brand-pink text-white rounded-full shadow-lg shadow-purple-500/40 hover:scale-110 transition-all duration-300 z-[45] flex items-center justify-center`}
      >
        <div className={`transition-transform duration-300 ${isOpen ? 'scale-100 rotate-0' : 'scale-100'}`}>
             {isOpen ? (
                // Send Icon (Paper Plane) when open
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 translate-x-0.5 translate-y-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
            ) : (
                // Chat Icon when closed
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            )}
        </div>
      </button>

      <div 
        ref={chatContainerRef}
        className={`fixed z-40 bg-white shadow-2xl flex flex-col border border-slate-100 transition-all duration-300 
        ${isOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-10 opacity-0 pointer-events-none'}
        bottom-0 right-0 w-full h-[80dvh] rounded-t-[2rem] 
        md:bottom-28 md:right-6 md:w-[22rem] md:max-w-[calc(100vw-3rem)] md:h-[32rem] md:rounded-[2rem] md:origin-bottom-right`}
      >
          {/* Header */}
          <header className="bg-gradient-to-r from-brand-purple to-brand-pink text-white p-4 md:p-5 rounded-t-[2rem] flex items-center shadow-md select-none">
            <div className="bg-white/20 p-2 rounded-full mr-3 backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div>
                <h3 className="font-bold text-lg leading-tight">Cabelleira.IA</h3>
                <p className="text-xs text-purple-100 flex items-center"><span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span> Online</p>
            </div>
          </header>
          
          {/* Body */}
          <div ref={chatBodyRef} className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-4 scroll-smooth">
            {messages.map((msg, index) => (
              <div key={index} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-purple to-brand-pink flex-shrink-0 mr-2 flex items-center justify-center text-white text-xs shadow-sm">
                        AI
                    </div>
                )}
                <div className={`max-w-[80%] px-4 py-3 text-sm shadow-sm ${
                    msg.sender === 'user' 
                    ? 'bg-brand-purple text-white rounded-2xl rounded-tr-sm' 
                    : 'bg-white text-slate-700 rounded-2xl rounded-tl-sm border border-slate-100'
                }`}>
                  {msg.text || (isLoading && msg.sender === 'bot' ? (
                      <div className="flex space-x-1 h-4 items-center">
                          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                      </div>
                  ) : '')}
                </div>
              </div>
            ))}
          </div>
          
          {/* Footer */}
          <div className="p-3 bg-white border-t border-slate-100 md:rounded-b-[2rem]">
            <div className="flex items-center bg-slate-50 rounded-full border border-slate-200 px-2 py-1 focus-within:border-brand-purple focus-within:ring-1 focus-within:ring-brand-purple transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                className="flex-1 p-2 bg-transparent focus:outline-none text-sm text-slate-700"
                placeholder="Digite sua dúvida..."
                disabled={isLoading}
              />
              <button 
                onClick={handleSend} 
                disabled={isLoading || !input.trim()} 
                className="p-2 bg-slate-200 text-slate-500 rounded-full hover:bg-brand-purple hover:text-white disabled:opacity-50 disabled:hover:bg-slate-200 disabled:hover:text-slate-500 transition-colors shadow-sm md:flex hidden"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <div className="text-center mt-1 pb-safe">
                <p className="text-[10px] text-slate-400">Powered by Google Gemini</p>
            </div>
          </div>
        </div>
    </>
  );
};

export default ChatWidget;