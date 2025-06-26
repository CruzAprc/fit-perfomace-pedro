import React from 'react';

interface FitPerformanceLogoProps {
  size?: number;
  className?: string;
}

export const FitPerformanceLogo: React.FC<FitPerformanceLogoProps> = ({ 
  size = 120, 
  className = '' 
}) => {
  return (
    <div 
      className={`fitness-icon-container ${className}`} 
      style={{ width: size, height: size }}
    >
      <img 
        src="/logo.svg" 
        alt="Fit Performance Logo" 
        width={size}
        height={size}
        className="w-full h-full object-contain"
        style={{ 
          maxWidth: '100%',
          height: 'auto'
        }}
        onError={(e) => {
          console.log('Erro ao carregar logo, usando fallback');
          // Fallback para um ícone simples
          e.currentTarget.style.display = 'none';
          e.currentTarget.nextElementSibling?.setAttribute('style', 'display: block');
        }}
      />
      {/* Fallback icon */}
      <div 
        style={{ 
          display: 'none', 
          width: size, 
          height: size,
          background: 'linear-gradient(135deg, #16a34a 0%, #3b82f6 50%, #a855f7 100%)',
          borderRadius: '50%',
          color: 'white',
          fontSize: size * 0.3,
          fontWeight: 'bold',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        className="flex"
      >
        FP
      </div>
    </div>
  );
};