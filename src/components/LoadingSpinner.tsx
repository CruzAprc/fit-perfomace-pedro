import React from 'react';
import { FitPerformanceLogo } from './FitPerformanceLogo';

interface LoadingSpinnerProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  text = 'Carregando...', 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16'
  };

  return (
    <div className="min-h-screen fitness-gradient-bg flex flex-col items-center justify-center relative overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full opacity-20 animate-pulse-glow"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-white rounded-full opacity-30 animate-pulse-glow"></div>
        <div className="absolute bottom-32 left-16 w-3 h-3 bg-white rounded-full opacity-15 animate-pulse-glow"></div>
      </div>

      <div className="text-center relative z-10">
        {/* Fit Performance Logo with loading animation */}
        <div className="mb-6">
          <FitPerformanceLogo size={100} />
        </div>
        
        {/* Modern loading indicator */}
        <div className="mb-6">
          <div 
            className={`${sizeClasses[size]} mx-auto relative`}
            role="status"
            aria-label="Carregando"
          >
            {/* Outer ring */}
            <div className="absolute inset-0 border-4 border-white border-opacity-20 rounded-full"></div>
            {/* Animated ring */}
            <div className="absolute inset-0 border-4 border-transparent border-t-white rounded-full animate-spin"></div>
          </div>
        </div>
        
        <div className="fitness-card rounded-2xl px-6 py-4">
          <p className="text-gray-700 font-semibold">{text}</p>
          <div className="flex justify-center mt-3">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-glow"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse-glow" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse-glow" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};