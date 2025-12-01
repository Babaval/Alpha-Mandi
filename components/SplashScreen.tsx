import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinish, 500); // Wait for fade out animation
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="text-center animate-fade-in-up">
        <div className="mb-6 relative">
          <div className="w-24 h-24 mx-auto border border-primary/20 rounded-full animate-[spin_10s_linear_infinite]" />
          <div className="w-20 h-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-primary/40 rounded-full animate-[spin_8s_linear_infinite_reverse]" />
          <div className="absolute inset-0 flex items-center justify-center">
             <span className="text-4xl font-serif text-primary font-bold">A</span>
          </div>
        </div>
        <h1 className="text-3xl md:text-5xl font-serif text-white tracking-[0.2em] uppercase font-bold mb-3">
          Alpha <span className="text-primary italic">Mandi</span>
        </h1>
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-4"></div>
        <p className="text-gray-600 text-[10px] tracking-[0.6em] uppercase animate-pulse">
          Fine Dining Reimagined
        </p>
      </div>
    </div>
  );
};