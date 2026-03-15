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
        className="fixed bottom-6 right-6 h-16 w-16 bg-cyber-gradient text-white rounded-full shadow-neon-glow hover:shadow-neon-glow-strong hover:scale-110 transition-all duration-300 z-[45] flex items-center justify-center"
      >
        <div className={`transition-transform duration-300 ${isOpen ? 'scale-100 rotate-0' : 'scale-100'}`}>
             {isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 translate-x-0.5 translate-y-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            )}
        </div>
      </button>

      <div 
        ref={chatContainerRef}
        className={`fixed z-40 glass-card shine-effect flex flex-col transition-all duration-500 
        ${isOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-10 opacity-0 pointer-events-none'}
        bottom-0 right-0 w-full h-[80dvh] rounded-t-[30px] 
        md:bottom-28 md:right-6 md:w-[24rem] md:max-w-[calc(100vw-3rem)] md:h-[36rem] md:rounded-[30px] md:origin-bottom-right`}
      >
          {/* Header */}
          <header className="bg-cyber-gradient text-white p-5 rounded-t-[30px] flex items-center shadow-lg select-none">
            <div className="bg-white/20 p-2.5 rounded-xl mr-4 backdrop-blur-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div>
                <h3 className="font-black text-xl leading-tight tracking-tight">Cabelleira.IA</h3>
                <p className="text-xs text-white/70 flex items-center font-bold uppercase tracking-widest mt-0.5"><span className="w-2 h-2 bg-green-400 rounded-full mr-2 shadow-[0_0_8px_rgba(74,222,128,0.5)]"></span> Online</p>
            </div>
          </header>
          
          {/* Body */}
          <div ref={chatBodyRef} className="flex-1 p-5 overflow-y-auto bg-cyber-dark/50 space-y-5 scroll-smooth custom-scrollbar">
            {messages.map((msg, index) => (
              <div key={index} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'bot' && (
                    <div className="w-9 h-9 rounded-xl bg-cyber-gradient flex-shrink-0 mr-3 flex items-center justify-center text-white text-[10px] font-black shadow-neon-glow">
                        AI
                    </div>
                )}
                <div className={`max-w-[85%] px-5 py-3.5 text-sm font-medium leading-relaxed ${
                    msg.sender === 'user' 
                    ? 'bg-cyber-purple text-white rounded-2xl rounded-tr-none shadow-neon-glow' 
                    : 'bg-white/10 backdrop-blur-md text-white rounded-2xl rounded-tl-none border border-white/10'
                }`}>
                  {msg.text || (isLoading && msg.sender === 'bot' ? (
                      <div className="flex space-x-1.5 h-4 items-center">
                          <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce delay-75"></div>
                          <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce delay-150"></div>
                      </div>
                  ) : '')}
                </div>
              </div>
            ))}
          </div>
          
          {/* Footer */}
          <div className="p-4 bg-cyber-deep/80 backdrop-blur-xl border-t border-white/10 md:rounded-b-[30px]">
            <div className="flex items-center bg-white/5 rounded-2xl border border-white/10 px-3 py-1.5 focus-within:border-cyber-purple focus-within:ring-2 focus-within:ring-cyber-purple/30 transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                className="flex-1 p-2.5 bg-transparent focus:outline-none text-sm text-white placeholder-white/30 font-medium"
                placeholder="Digite sua dúvida..."
                disabled={isLoading}
              />
              <button 
                onClick={handleSend} 
                disabled={isLoading || !input.trim()} 
                className="p-3 bg-cyber-gradient text-white rounded-xl hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all shadow-neon-glow"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <div className="text-center mt-2 pb-safe">
                <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Powered by Google Gemini</p>
            </div>
          </div>
        </div>
    </>
  );
};

export default ChatWidget;