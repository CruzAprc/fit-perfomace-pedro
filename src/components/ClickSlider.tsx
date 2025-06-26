import React from 'react';

interface ClickSliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  unit: string;
  label: string;
  step?: number;
}

const ClickSlider: React.FC<ClickSliderProps> = ({ 
  min, 
  max, 
  value, 
  onChange, 
  unit, 
  label, 
  step = 1 
}) => {
  const percentage = ((value - min) / (max - min)) * 100;
  const totalSteps = Math.ceil((max - min) / step);
  const stepsToShow = Math.min(totalSteps, 20); // Máximo 20 pontos clicáveis
  const stepSize = (max - min) / (stepsToShow - 1);

  const handleTrackClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickPercentage = (clickX / rect.width) * 100;
    const newValue = Math.round(min + (clickPercentage / 100) * (max - min));
    const clampedValue = Math.max(min, Math.min(max, newValue));
    onChange(clampedValue);
  };

  return (
    <div style={{
      backgroundColor: '#1f2937',
      padding: '24px',
      borderRadius: '12px',
      border: '1px solid #374151',
      marginBottom: '12px'
    }}>
      {/* Display Value */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ 
          fontSize: '48px', 
          fontWeight: 'bold', 
          color: 'white', 
          marginBottom: '8px' 
        }}>
          {value} <span style={{ fontSize: '32px', color: '#9ca3af' }}>{unit}</span>
        </div>
        <div style={{ color: '#9ca3af', fontWeight: 'bold' }}>{label}</div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Minus Button */}
        <button
          onClick={() => onChange(Math.max(value - step, min))}
          style={{
            width: '48px',
            height: '48px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '24px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
        >
          -
        </button>

        {/* Track Area */}
        <div style={{ flex: 1, position: 'relative' }}>
          {/* Track Background */}
          <div
            onClick={handleTrackClick}
            style={{
              height: '20px',
              backgroundColor: '#4b5563',
              borderRadius: '10px',
              position: 'relative',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#374151'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4b5563'}
          >
            {/* Progress Fill */}
            <div style={{
              height: '100%',
              width: `${percentage}%`,
              backgroundColor: '#3b82f6',
              borderRadius: '10px',
              transition: 'width 0.2s ease'
            }} />
            
            {/* Thumb */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: `${percentage}%`,
              transform: 'translate(-50%, -50%)',
              width: '28px',
              height: '28px',
              backgroundColor: '#3b82f6',
              border: '3px solid white',
              borderRadius: '50%',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }} />

            {/* Click Points */}
            {Array.from({ length: stepsToShow }, (_, i) => {
              const stepValue = Math.round(min + i * stepSize);
              const stepPercentage = ((stepValue - min) / (max - min)) * 100;
              
              return (
                <div
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(stepValue);
                  }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: `${stepPercentage}%`,
                    transform: 'translate(-50%, -50%)',
                    width: '12px',
                    height: '12px',
                    backgroundColor: value === stepValue ? '#fbbf24' : '#6b7280',
                    border: '2px solid white',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    zIndex: 2
                  }}
                  onMouseEnter={(e) => {
                    if (value !== stepValue) {
                      e.currentTarget.style.backgroundColor = '#9ca3af';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (value !== stepValue) {
                      e.currentTarget.style.backgroundColor = '#6b7280';
                    }
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Plus Button */}
        <button
          onClick={() => onChange(Math.min(value + step, max))}
          style={{
            width: '48px',
            height: '48px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '24px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
        >
          +
        </button>
      </div>

      {/* Range indicators */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginTop: '12px', 
        fontSize: '14px', 
        color: '#6b7280' 
      }}>
        <span>{min}</span>
        <span style={{ color: 'white', fontWeight: 'bold' }}>{value}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default ClickSlider;