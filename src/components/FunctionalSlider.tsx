import React, { useEffect } from 'react';

interface FunctionalSliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  unit: string;
  label: string;
}

const FunctionalSlider: React.FC<FunctionalSliderProps> = ({ min, max, value, onChange, unit, label }) => {
  // Debug logs
  useEffect(() => {
    console.log(`[${label}] FunctionalSlider montado:`, { min, max, value, unit });
  }, [label, min, max, value, unit]);

  useEffect(() => {
    console.log(`[${label}] Value mudou para:`, value);
  }, [value, label]);

  const percentage = ((value - min) / (max - min)) * 100;

  const handleDecrement = () => {
    const newValue = Math.max(value - 1, min);
    console.log(`[${label}] Decrement: ${value} -> ${newValue}`);
    onChange(newValue);
  };

  const handleIncrement = () => {
    const newValue = Math.min(value + 1, max);
    console.log(`[${label}] Increment: ${value} -> ${newValue}`);
    onChange(newValue);
  };

  const handleQuickValue = (quickValue: number) => {
    console.log(`[${label}] Quick value: ${value} -> ${quickValue}`);
    onChange(quickValue);
  };

  const handleTrackClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    
    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickPercentage = clickX / rect.width;
    const rawValue = min + (clickPercentage * (max - min));
    const newValue = Math.round(Math.max(min, Math.min(max, rawValue)));
    
    console.log(`[${label}] Track click:`, {
      clickX,
      width: rect.width,
      clickPercentage,
      rawValue,
      newValue,
      currentValue: value
    });
    
    onChange(newValue);
  };

  // Valores rápidos baseados no tipo
  const getQuickValues = () => {
    if (label === 'PESO ATUAL') return [50, 70, 90];
    if (label === 'ALTURA') return [160, 175, 190];
    if (label === 'IDADE') return [20, 30, 40];
    return [];
  };

  const quickValues = getQuickValues();

  return (
    <div 
      style={{
        marginBottom: '16px',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      {/* Display com design original */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <div 
          style={{
            backgroundColor: 'rgba(30, 41, 59, 0.5)',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid rgba(71, 85, 105, 0.4)',
            position: 'relative',
            backdropFilter: 'blur(4px)'
          }}
        >
          {/* Cantos azuis */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '16px',
            height: '16px',
            borderTop: '2px solid rgba(148, 163, 184, 0.6)',
            borderLeft: '2px solid rgba(148, 163, 184, 0.6)'
          }} />
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '16px',
            height: '16px',
            borderTop: '2px solid rgba(148, 163, 184, 0.6)',
            borderRight: '2px solid rgba(148, 163, 184, 0.6)'
          }} />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '16px',
            height: '16px',
            borderBottom: '2px solid rgba(148, 163, 184, 0.6)',
            borderLeft: '2px solid rgba(148, 163, 184, 0.6)'
          }} />
          <div style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '16px',
            height: '16px',
            borderBottom: '2px solid rgba(148, 163, 184, 0.6)',
            borderRight: '2px solid rgba(148, 163, 184, 0.6)'
          }} />
          
          <div style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '12px'
          }}>
            {value}
            <span style={{
              fontSize: '24px',
              color: '#cbd5e1',
              marginLeft: '8px'
            }}>
              {unit}
            </span>
          </div>
          <div style={{
            color: '#cbd5e1',
            fontWeight: 'bold',
            fontSize: '16px'
          }}>
            {label}
          </div>
        </div>
      </div>

      {/* Controles */}
      <div style={{
        backgroundColor: 'rgba(30, 41, 59, 0.4)',
        backdropFilter: 'blur(4px)',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '12px',
        border: '1px solid rgba(71, 85, 105, 0.4)'
      }}>
        
        {/* Botões + barra */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '24px'
        }}>
          {/* Botão - */}
          <button
            type="button"
            onClick={handleDecrement}
            disabled={value <= min}
            style={{
              width: '64px',
              height: '64px',
              backgroundColor: value <= min ? '#4b5563' : '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '24px',
              fontWeight: 'bold',
              cursor: value <= min ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              opacity: value <= min ? 0.5 : 1
            }}
            onMouseEnter={(e) => {
              if (value > min) {
                e.currentTarget.style.backgroundColor = '#1d4ed8';
                e.currentTarget.style.transform = 'scale(1.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (value > min) {
                e.currentTarget.style.backgroundColor = '#2563eb';
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
          >
            -
          </button>
          
          {/* Barra clicável */}
          <div style={{ flex: 1, padding: '0 16px' }}>
            <div style={{ position: 'relative' }}>
              <div
                onClick={handleTrackClick}
                style={{
                  width: '100%',
                  height: '16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${percentage}%, #6b7280 ${percentage}%, #6b7280 100%)`,
                  transition: 'all 0.2s ease',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scaleY(1.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scaleY(1)';
                }}
              >
                {/* Thumb */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: `${percentage}%`,
                    width: '24px',
                    height: '24px',
                    backgroundColor: '#3b82f6',
                    border: '3px solid white',
                    borderRadius: '50%',
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    pointerEvents: 'none' // Evita interferência com cliques na barra
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Botão + */}
          <button
            type="button"
            onClick={handleIncrement}
            disabled={value >= max}
            style={{
              width: '64px',
              height: '64px',
              backgroundColor: value >= max ? '#4b5563' : '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '24px',
              fontWeight: 'bold',
              cursor: value >= max ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              opacity: value >= max ? 0.5 : 1
            }}
            onMouseEnter={(e) => {
              if (value < max) {
                e.currentTarget.style.backgroundColor = '#1d4ed8';
                e.currentTarget.style.transform = 'scale(1.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (value < max) {
                e.currentTarget.style.backgroundColor = '#2563eb';
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
          >
            +
          </button>
        </div>
        
        {/* Indicadores de range */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '14px',
          color: '#9ca3af'
        }}>
          <span>{min}</span>
          <span style={{ color: 'white', fontWeight: 'bold' }}>{value}</span>
          <span>{max}</span>
        </div>
      </div>

      {/* Botões de valores rápidos */}
      {quickValues.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px'
        }}>
          {quickValues.map(quickValue => (
            <button
              key={quickValue}
              onClick={() => handleQuickValue(quickValue)}
              style={{
                backgroundColor: value === quickValue ? 'rgba(59, 130, 246, 0.2)' : 'rgba(30, 41, 59, 0.6)',
                backdropFilter: 'blur(4px)',
                border: value === quickValue ? '2px solid #3b82f6' : '2px solid rgba(71, 85, 105, 0.5)',
                borderRadius: '12px',
                padding: '12px',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: value === quickValue ? '0 0 20px rgba(59, 130, 246, 0.25)' : '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                if (value !== quickValue) {
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.7)';
                  e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
                }
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                if (value !== quickValue) {
                  e.currentTarget.style.borderColor = 'rgba(71, 85, 105, 0.5)';
                  e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.6)';
                }
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {quickValue}{unit}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FunctionalSlider;