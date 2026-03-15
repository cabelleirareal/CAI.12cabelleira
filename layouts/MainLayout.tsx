import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ChatWidget from '../components/ChatWidget';

const MainLayout: React.FC = () => {
  return (
    <div className="bg-cyber-bg w-full min-h-screen font-sans text-white selection:bg-cyber-purple selection:text-white flex flex-col relative animate-[fadeIn_0.5s_ease-out]">
      {/* Global Cyber Grid */}
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-50"></div>
      
      <Header />
      
      <main className="flex-1 w-full relative z-0">
        <Outlet />
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default MainLayout;
