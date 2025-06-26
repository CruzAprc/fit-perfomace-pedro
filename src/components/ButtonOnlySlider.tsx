import React from 'react';

interface ButtonOnlySliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  unit: string;
  label: string;
}

const ButtonOnlySlider: React.FC<ButtonOnlySliderProps> = ({ min, max, value, onChange, unit, label }) => {
  const percentage = ((value - min) / (max - min)) * 100;

  const handleIncrement = (step: number = 1) => {
    const newValue = Math.min(value + step, max);
    onChange(newValue);
  };

  const handleDecrement = (step: number = 1) => {
    const newValue = Math.max(value - step, min);
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

  // Calcular steps inteligentes baseados no range
  const range = max - min;
  const smallStep = 1;
  const mediumStep = Math.ceil(range / 20); // ~5% do range
  const largeStep = Math.ceil(range / 10);  // ~10% do range

  return (
    <div style={{ marginBottom: '16px' }}>
      {/* Display com design original */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <div style={{
          backgroundColor: 'rgba(30, 41, 59, 0.5)',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid rgba(71, 85, 105, 0.4)',
          position: 'relative',
          backdropFilter: 'blur(4px)'
        }}>
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

      {/* Controles principais */}
      <div style={{
        backgroundColor: 'rgba(30, 41, 59, 0.4)',
        backdropFilter: 'blur(4px)',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '12px',
        border: '1px solid rgba(71, 85, 105, 0.4)'
      }}>
        
        {/* Barra visual (apenas visual, não clicável) */}
        <div style={{
          width: '100%',
          height: '16px',
          borderRadius: '8px',
          position: 'relative',
          overflow: 'hidden',
          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${percentage}%, #6b7280 ${percentage}%, #6b7280 100%)`,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          marginBottom: '20px'
        }}>
          {/* Thumb visual */}
          <div style={{
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
            pointerEvents: 'none'
          }} />
        </div>

        {/* Controles de incremento inteligentes */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '8px',
          marginBottom: '16px'
        }}>
          {/* Decrementos */}
          <button
            onClick={() => handleDecrement(largeStep)}
            disabled={value <= min}
            style={{
              padding: '8px 4px',
              backgroundColor: value <= min ? '#4b5563' : '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 'bold',
              cursor: value <= min ? 'not-allowed' : 'pointer',
              opacity: value <= min ? 0.5 : 1,
              transition: 'all 0.2s'
            }}
          >
            --{largeStep}
          </button>
          
          <button
            onClick={() => handleDecrement(mediumStep)}
            disabled={value <= min}
            style={{
              padding: '8px 4px',
              backgroundColor: value <= min ? '#4b5563' : '#f59e0b',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 'bold',
              cursor: value <= min ? 'not-allowed' : 'pointer',
              opacity: value <= min ? 0.5 : 1,
              transition: 'all 0.2s'
            }}
          >
            -{mediumStep}
          </button>

          {/* Controle principal */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <button
              onClick={() => handleDecrement(smallStep)}
              disabled={value <= min}
              style={{
                width: '100%',
                height: '48px',
                backgroundColor: value <= min ? '#4b5563' : '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '20px',
                fontWeight: 'bold',
                cursor: value <= min ? 'not-allowed' : 'pointer',
                opacity: value <= min ? 0.5 : 1,
                transition: 'all 0.2s'
              }}
            >
              -
            </button>
          </div>

          {/* Incrementos */}
          <button
            onClick={() => handleIncrement(mediumStep)}
            disabled={value >= max}
            style={{
              padding: '8px 4px',
              backgroundColor: value >= max ? '#4b5563' : '#f59e0b',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 'bold',
              cursor: value >= max ? 'not-allowed' : 'pointer',
              opacity: value >= max ? 0.5 : 1,
              transition: 'all 0.2s'
            }}
          >
            +{mediumStep}
          </button>
          
          <button
            onClick={() => handleIncrement(largeStep)}
            disabled={value >= max}
            style={{
              padding: '8px 4px',
              backgroundColor: value >= max ? '#4b5563' : '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 'bold',
              cursor: value >= max ? 'not-allowed' : 'pointer',
              opacity: value >= max ? 0.5 : 1,
              transition: 'all 0.2s'
            }}
          >
            ++{largeStep}
          </button>
        </div>

        {/* Botão principal + */}
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <button
            onClick={() => handleIncrement(smallStep)}
            disabled={value >= max}
            style={{
              width: '64px',
              height: '48px',
              backgroundColor: value >= max ? '#4b5563' : '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '20px',
              fontWeight: 'bold',
              cursor: value >= max ? 'not-allowed' : 'pointer',
              opacity: value >= max ? 0.5 : 1,
              transition: 'all 0.2s'
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
              onClick={() => onChange(quickValue)}
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

export default ButtonOnlySlider;