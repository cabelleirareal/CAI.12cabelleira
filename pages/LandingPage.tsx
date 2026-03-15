import React from 'react';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import Guide from '../components/landing/Guide';
import Technology from '../components/landing/Technology';
import CTA from '../components/landing/CTA';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <Hero 
        onStartDiagnosis={() => navigate('/diagnostico')} 
        onOpenImageGeneration={() => navigate('/estudio')}
      />
      <Features />
      <Guide />
      <Technology />
      <CTA />
    </div>
  );
};

export default LandingPage;
