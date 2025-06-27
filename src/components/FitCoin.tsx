import React from 'react';

interface FitCoinProps {
  amount: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
}

const FitCoin: React.FC<FitCoinProps> = ({ 
  amount, 
  size = 'md', 
  showLabel = true, 
  animated = false,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-lg'
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {/* FitCoin Logo Image */}
      <div className={`${animated ? 'animate-pulse' : ''}`}>
        <img 
          src="/fitcoin.png" 
          alt="FitCoin"
          className={`${sizeClasses[size]} drop-shadow-lg`}
          style={{
            filter: 'drop-shadow(0 2px 4px rgba(255, 193, 7, 0.3))'
          }}
        />
      </div>
      
      {/* Amount Display */}
      {showLabel && (
        <span className={`font-bold text-yellow-400 ${textSizes[size]} drop-shadow-sm`}>
          {amount.toLocaleString()}
        </span>
      )}
    </div>
  );
};

export default FitCoin; 