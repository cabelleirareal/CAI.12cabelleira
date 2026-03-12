import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ImageAnalysisModal from './components/ImageAnalysisModal';
import ImageGenerationModal from './components/ImageGenerationModal';
import ChatWidget from './components/ChatWidget';
import LoginScreen from './components/LoginScreen';
import SplashScreen from './components/SplashScreen';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAnalysisModalOpen, setAnalysisModalOpen] = useState(false);
  const [isGenerationModalOpen, setGenerationModalOpen] = useState(false);

  // Handle Splash Screen Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500); // 2.5 seconds splash duration

    return () => clearTimeout(timer);
  }, []);

  // 1. Show Splash Screen first
  if (showSplash) {
    return <SplashScreen />;
  }

  // 2. Show Login Screen if not authenticated
  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  // 3. Show Main App
  return (
    // SHELL CONTAINER: Fixed 100% height, no overflow
    <div className="bg-slate-50 w-full h-full font-sans text-slate-800 selection:bg-brand-purple selection:text-white flex flex-col overflow-hidden relative animate-[fadeIn_0.5s_ease-out]">
      
      <Header />
      
      {/* SCROLLABLE AREA: Only this element scrolls. It pushes content behind the header. */}
      <main id="app-main" className="flex-1 w-full overflow-y-auto overflow-x-hidden scrollbar-hide scroll-smooth relative z-0">
        <Hero 
          onStartDiagnosis={() => setAnalysisModalOpen(true)} 
          onOpenImageGeneration={() => setGenerationModalOpen(true)}
        />
      </main>

      <ChatWidget />
      
      {/* MODALS: Highest Z-Index to cover everything */}
      {isAnalysisModalOpen && <ImageAnalysisModal onClose={() => setAnalysisModalOpen(false)} />}
      {isGenerationModalOpen && <ImageGenerationModal onClose={() => setGenerationModalOpen(false)} />}
    </div>
  );
};

export default App;