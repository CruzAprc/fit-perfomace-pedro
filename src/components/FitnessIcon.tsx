import React from 'react';

interface FitnessIconProps {
  size?: number;
  className?: string;
}

export const FitnessIcon: React.FC<FitnessIconProps> = ({ size = 120, className = '' }) => {
  return (
    <div className={`fitness-icon-container ${className}`} style={{ width: size, height: size }}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 120 120" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="animate-float"
      >
        {/* Background Circle with Gradient */}
        <defs>
          <linearGradient id="fitnessGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#16a34a'}} />
            <stop offset="50%" style={{stopColor: '#3b82f6'}} />
            <stop offset="100%" style={{stopColor: '#a855f7'}} />
          </linearGradient>
          <linearGradient id="dumbbellGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#ffffff'}} />
            <stop offset="100%" style={{stopColor: '#f3f4f6'}} />
          </linearGradient>
        </defs>
        
        {/* Main Circle */}
        <circle 
          cx="60" 
          cy="60" 
          r="55" 
          fill="url(#fitnessGradient)" 
          className="animate-pulse-glow"
        />
        
        {/* Inner Circle */}
        <circle 
          cx="60" 
          cy="60" 
          r="45" 
          fill="rgba(255, 255, 255, 0.1)" 
          stroke="rgba(255, 255, 255, 0.2)" 
          strokeWidth="1"
        />
        
        {/* Dumbbell Icon */}
        <g transform="translate(30, 45)">
          {/* Left Weight */}
          <rect x="0" y="10" width="8" height="20" rx="4" fill="url(#dumbbellGradient)" />
          <rect x="2" y="5" width="4" height="30" rx="2" fill="url(#dumbbellGradient)" />
          
          {/* Handle */}
          <rect x="8" y="13" width="44" height="14" rx="7" fill="url(#dumbbellGradient)" />
          
          {/* Right Weight */}
          <rect x="52" y="10" width="8" height="20" rx="4" fill="url(#dumbbellGradient)" />
          <rect x="54" y="5" width="4" height="30" rx="2" fill="url(#dumbbellGradient)" />
          
          {/* Center dot */}
          <circle cx="30" cy="20" r="1.5" fill="#16a34a" />
        </g>
        
        {/* Energy Particles */}
        <circle cx="25" cy="25" r="2" fill="#16a34a" opacity="0.6" className="animate-pulse-glow" />
        <circle cx="95" cy="35" r="1.5" fill="#3b82f6" opacity="0.7" className="animate-pulse-glow" />
        <circle cx="20" cy="95" r="1" fill="#a855f7" opacity="0.8" className="animate-pulse-glow" />
        <circle cx="100" cy="85" r="2" fill="#16a34a" opacity="0.5" className="animate-pulse-glow" />
      </svg>
    </div>
  );
};