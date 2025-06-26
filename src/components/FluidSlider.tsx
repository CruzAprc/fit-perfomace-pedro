import React, { useState, useRef, useEffect, useCallback } from 'react';

interface FluidSliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  unit: string;
  label: string;
}

const FluidSlider: React.FC<FluidSliderProps> = ({ min, max, value, onChange, unit, label }) => {
  const percentage = ((value - min) / (max - min)) * 100;
  const [isHolding, setIsHolding] = useState<'inc' | 'dec' | null>(null);
  const [holdSpeed, setHoldSpeed] = useState(1);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const speedTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Detecta se o perfil é feminino baseado no localStorage ou props
  const femaleProfile = localStorage.getItem('userGender') === 'female';
  const themeColor = femaleProfile ? '#ec4899' : '#3b82f6'; // pink-500 : blue-500
  const themeBorder = femaleProfile ? 'rgba(236, 72, 153, 0.6)' : 'rgba(59, 130, 246, 0.6)';
  const themeGlow = femaleProfile ? 'rgba(236, 72, 153, 0.25)' : 'rgba(59, 130, 246, 0.25)';

  // Valores rápidos baseados no tipo
  const getQuickValues = () => {
    if (label === 'PESO ATUAL') return [50, 70, 90];
    if (label === 'ALTURA') return [160, 175, 190];
    if (label === 'IDADE') return [20, 30, 40];
    return [];
  };

  const quickValues = getQuickValues();

  // Calcular steps inteligentes
  const range = max - min;
  const smallStep = 1;
  const mediumStep = Math.ceil(range / 20);
  const largeStep = Math.ceil(range / 10);

  // Função para incrementar/decrementar com velocidade
  const handleChange = useCallback((increment: boolean, step: number = 1) => {
    const newValue = increment 
      ? Math.min(value + step, max)
      : Math.max(value - step, min);
    onChange(newValue);
  }, [value, min, max, onChange]);

  // Limpar timers quando componente desmontar
  useEffect(() => {
    return () => {
      if (holdTimerRef.current) clearInterval(holdTimerRef.current);
      if (speedTimerRef.current) clearTimeout(speedTimerRef.current);
    };
  }, []);

  // Sistema de hold-to-repeat com aceleração
  const startHolding = (type: 'inc' | 'dec', initialStep: number = 1) => {
    setIsHolding(type);
    setHoldSpeed(initialStep);
    
    // Primeira mudança imediata
    handleChange(type === 'inc', initialStep);
    
    // Inicia repetição após 500ms
    holdTimerRef.current = setInterval(() => {
      handleChange(type === 'inc', holdSpeed);
    }, 100); // Repetição rápida a cada 100ms

    // Acelera após 1 segundo
    speedTimerRef.current = setTimeout(() => {
      setHoldSpeed(initialStep * 2);
    }, 1000);
  };

  const stopHolding = () => {
    setIsHolding(null);
    setHoldSpeed(1);
    if (holdTimerRef.current) {
      clearInterval(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    if (speedTimerRef.current) {
      clearTimeout(speedTimerRef.current);
      speedTimerRef.current = null;
    }
  };

  // Suporte a teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target !== document.body) return; // Evita conflito com inputs
      
      switch(e.key) {
        case 'ArrowLeft':
        case 'ArrowDown':
          e.preventDefault();
          handleChange(false, e.shiftKey ? largeStep : smallStep);
          break;
        case 'ArrowRight':
        case 'ArrowUp':
          e.preventDefault();
          handleChange(true, e.shiftKey ? largeStep : smallStep);
          break;
        case 'PageDown':
          e.preventDefault();
          handleChange(false, largeStep);
          break;
        case 'PageUp':
          e.preventDefault();
          handleChange(true, largeStep);
          break;
        case 'Home':
          e.preventDefault();
          onChange(min);
          break;
        case 'End':
          e.preventDefault();
          onChange(max);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleChange, onChange, min, max, largeStep, smallStep]);

  // Click na barra
  const handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickPercentage = clickX / rect.width;
    const newValue = Math.round(min + (clickPercentage * range));
    onChange(Math.max(min, Math.min(max, newValue)));
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      {/* Display com valor atual */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <div style={{
          backgroundColor: 'rgba(30, 41, 59, 0.5)',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid rgba(71, 85, 105, 0.4)',
          position: 'relative',
          backdropFilter: 'blur(4px)'
        }}>
          {/* Cantos estilizados */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '16px',
            height: '16px',
            borderTop: `2px solid ${themeBorder}`,
            borderLeft: `2px solid ${themeBorder}`
          }} />
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '16px',
            height: '16px',
            borderTop: `2px solid ${themeBorder}`,
            borderRight: `2px solid ${themeBorder}`
          }} />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '16px',
            height: '16px',
            borderBottom: `2px solid ${themeBorder}`,
            borderLeft: `2px solid ${themeBorder}`
          }} />
          <div style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '16px',
            height: '16px',
            borderBottom: `2px solid ${themeBorder}`,
            borderRight: `2px solid ${themeBorder}`
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
        
        {/* Barra clicável com visual melhorado */}
        <div 
          onClick={handleBarClick}
          style={{
            width: '100%',
            height: '24px',
            borderRadius: '12px',
            position: 'relative',
            overflow: 'hidden',
            background: `linear-gradient(to right, ${themeColor} 0%, ${themeColor} ${percentage}%, #4b5563 ${percentage}%, #4b5563 100%)`,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '20px',
            cursor: 'pointer',
            transition: 'transform 0.1s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scaleY(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scaleY(1)'}
        >
          {/* Thumb */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: `${percentage}%`,
            width: '32px',
            height: '32px',
            backgroundColor: themeColor,
            border: '4px solid white',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 4px 12px ${themeGlow}`,
            pointerEvents: 'none',
            transition: 'left 0.1s ease'
          }} />
        </div>

        {/* Botões com hold-to-repeat */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr 1fr',
          gap: '12px',
          marginBottom: '16px'
        }}>
          {/* Botão decrementar */}
          <button
            onMouseDown={() => startHolding('dec', mediumStep)}
            onMouseUp={stopHolding}
            onMouseLeave={stopHolding}
            onTouchStart={() => startHolding('dec', mediumStep)}
            onTouchEnd={stopHolding}
            disabled={value <= min}
            style={{
              height: '56px',
              backgroundColor: value <= min ? '#4b5563' : themeColor,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '24px',
              fontWeight: 'bold',
              cursor: value <= min ? 'not-allowed' : 'pointer',
              opacity: value <= min ? 0.5 : 1,
              transition: 'all 0.2s',
              transform: isHolding === 'dec' ? 'scale(0.95)' : 'scale(1)'
            }}
          >
            −
          </button>

          {/* Display central */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: 'rgba(30, 41, 59, 0.6)',
            borderRadius: '8px',
            border: `2px solid ${themeBorder}`
          }}>
            {value} {unit}
          </div>

          {/* Botão incrementar */}
          <button
            onMouseDown={() => startHolding('inc', mediumStep)}
            onMouseUp={stopHolding}
            onMouseLeave={stopHolding}
            onTouchStart={() => startHolding('inc', mediumStep)}
            onTouchEnd={stopHolding}
            disabled={value >= max}
            style={{
              height: '56px',
              backgroundColor: value >= max ? '#4b5563' : themeColor,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '24px',
              fontWeight: 'bold',
              cursor: value >= max ? 'not-allowed' : 'pointer',
              opacity: value >= max ? 0.5 : 1,
              transition: 'all 0.2s',
              transform: isHolding === 'inc' ? 'scale(0.95)' : 'scale(1)'
            }}
          >
            +
          </button>
        </div>

        {/* Ajuste fino */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '12px'
        }}>
          <button
            onClick={() => handleChange(false, smallStep)}
            disabled={value <= min}
            style={{
              padding: '8px 16px',
              backgroundColor: 'rgba(71, 85, 105, 0.6)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: value <= min ? 'not-allowed' : 'pointer',
              opacity: value <= min ? 0.5 : 1
            }}
          >
            -1
          </button>
          <button
            onClick={() => handleChange(true, smallStep)}
            disabled={value >= max}
            style={{
              padding: '8px 16px',
              backgroundColor: 'rgba(71, 85, 105, 0.6)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: value >= max ? 'not-allowed' : 'pointer',
              opacity: value >= max ? 0.5 : 1
            }}
          >
            +1
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
                backgroundColor: value === quickValue ? `${themeColor}33` : 'rgba(30, 41, 59, 0.6)',
                backdropFilter: 'blur(4px)',
                border: value === quickValue ? `2px solid ${themeColor}` : '2px solid rgba(71, 85, 105, 0.5)',
                borderRadius: '12px',
                padding: '12px',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: value === quickValue ? `0 0 20px ${themeGlow}` : '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                if (value !== quickValue) {
                  e.currentTarget.style.borderColor = themeBorder;
                  e.currentTarget.style.backgroundColor = `${themeColor}1A`;
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

      {/* Instruções de teclado */}
      <div style={{
        marginTop: '16px',
        padding: '12px',
        backgroundColor: 'rgba(30, 41, 59, 0.3)',
        borderRadius: '8px',
        fontSize: '12px',
        color: '#9ca3af',
        textAlign: 'center'
      }}>
        Use as setas ← → ou segure os botões para ajuste rápido
      </div>
    </div>
  );
};

export default FluidSlider;