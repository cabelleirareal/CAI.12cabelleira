import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DiagnosisPage from './pages/DiagnosisPage';
import StudioPage from './pages/StudioPage';
import SplashScreen from './components/SplashScreen';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  // Handle Splash Screen Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500); // 2.5 seconds splash duration

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/diagnostico" 
            element={
              <ProtectedRoute>
                <DiagnosisPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/estudio" 
            element={
              <ProtectedRoute>
                <StudioPage />
              </ProtectedRoute>
            } 
          />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
