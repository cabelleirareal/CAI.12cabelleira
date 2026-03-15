import React from 'react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility for merging tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * AuthCard - Glassmorphism card with shine effect
 */
export const AuthCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn("login-card-glow p-8 md:p-12 w-full max-w-lg", className)}
    >
      {children}
    </motion.div>
  );
};

/**
 * AuthInput - Glassmorphism input field
 */
export const AuthInput: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string }> = ({ label, className, ...props }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className="text-sm font-medium text-white/60 ml-1">{label}</label>}
      <input
        className={cn("login-input-glass", className)}
        {...props}
      />
    </div>
  );
};

/**
 * PrimaryButton - Neon gradient button
 */
export const PrimaryButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => {
  return (
    <button
      className={cn("login-btn-gradient w-full", className)}
      {...props}
    >
      {children}
    </button>
  );
};

/**
 * SocialLoginButton - Glassmorphism button for social login
 */
export const SocialLoginButton: React.FC<{ icon: React.ReactNode; onClick?: () => void }> = ({ icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-14 h-14 bg-white/10 border border-white/10 rounded-full hover:bg-white/20 hover:border-white/30 transition-all duration-300 group"
    >
      <span className="text-white group-hover:scale-110 transition-transform">{icon}</span>
    </button>
  );
};

/**
 * BackgroundParticles - Subtle light particles for the background
 */
export const BackgroundParticles: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-cyber-purple/20 blur-xl"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            width: Math.random() * 200 + 50,
            height: Math.random() * 200 + 50,
            opacity: Math.random() * 0.3,
          }}
          animate={{
            y: [null, Math.random() * 100 + "%"],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};
