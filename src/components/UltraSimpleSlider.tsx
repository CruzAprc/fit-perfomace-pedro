import React from 'react';

interface UltraSimpleSliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  unit: string;
  label: string;
}

const UltraSimpleSlider: React.FC<UltraSimpleSliderProps> = ({ min, max, value, onChange, unit, label }) => {
  console.log('🔴 UltraSimpleSlider RENDERIZADO:', { min, max, value, unit, label });

  return (
    <div 
      style={{ 
        width: '100%', 
        padding: '20px', 
        background: '#ff0000', 
        margin: '20px 0',
        border: '5px solid #00ff00',
        zIndex: 99999999,
        position: 'relative'
      }}
      onClick={(e) => {
        console.log('🖱️ Container do slider clicado');
        e.stopPropagation();
      }}
    >
      <h1 style={{ color: 'white', textAlign: 'center', fontSize: '24px', marginBottom: '20px' }}>
        🚨 TESTE ULTRA SIMPLES - {label}
      </h1>

      {/* Valor gigante */}
      <div style={{
        fontSize: '60px',
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: '30px',
        background: 'rgba(0,0,0,0.8)',
        padding: '20px',
        borderRadius: '10px'
      }}>
        {value} {unit}
      </div>

      {/* APENAS BOTÕES - SEM SLIDER */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <button
          onClick={(e) => {
            console.log('🔘 BOTÃO -10 CLICADO');
            e.preventDefault();
            e.stopPropagation();
            const newValue = Math.max(value - 10, min);
            console.log('Mudando valor:', value, '->', newValue);
            onChange(newValue);
          }}
          style={{
            fontSize: '24px',
            padding: '20px 30px',
            background: '#0000ff',
            color: 'white',
            border: '3px solid white',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          -10
        </button>

        <button
          onClick={(e) => {
            console.log('🔘 BOTÃO -1 CLICADO');
            e.preventDefault();
            e.stopPropagation();
            const newValue = Math.max(value - 1, min);
            console.log('Mudando valor:', value, '->', newValue);
            onChange(newValue);
          }}
          style={{
            fontSize: '24px',
            padding: '20px 30px',
            background: '#ff4444',
            color: 'white',
            border: '3px solid white',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          -1
        </button>

        <button
          onClick={(e) => {
            console.log('🔘 BOTÃO +1 CLICADO');
            e.preventDefault();
            e.stopPropagation();
            const newValue = Math.min(value + 1, max);
            console.log('Mudando valor:', value, '->', newValue);
            onChange(newValue);
          }}
          style={{
            fontSize: '24px',
            padding: '20px 30px',
            background: '#44ff44',
            color: 'white',
            border: '3px solid white',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          +1
        </button>

        <button
          onClick={(e) => {
            console.log('🔘 BOTÃO +10 CLICADO');
            e.preventDefault();
            e.stopPropagation();
            const newValue = Math.min(value + 10, max);
            console.log('Mudando valor:', value, '->', newValue);
            onChange(newValue);
          }}
          style={{
            fontSize: '24px',
            padding: '20px 30px',
            background: '#0000ff',
            color: 'white',
            border: '3px solid white',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          +10
        </button>
      </div>

      {/* Valores rápidos */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '15px'
      }}>
        {label === 'PESO ATUAL' && [50, 70, 90].map(val => (
          <button
            key={val}
            onClick={(e) => {
              console.log(`🎯 VALOR RÁPIDO ${val} CLICADO`);
              e.preventDefault();
              e.stopPropagation();
              onChange(val);
            }}
            style={{
              fontSize: '18px',
              padding: '15px 25px',
              background: value === val ? '#ffff00' : '#666666',
              color: value === val ? 'black' : 'white',
              border: '2px solid white',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {val}kg
          </button>
        ))}

        {label === 'ALTURA' && [160, 175, 190].map(val => (
          <button
            key={val}
            onClick={(e) => {
              console.log(`🎯 VALOR RÁPIDO ${val} CLICADO`);
              e.preventDefault();
              e.stopPropagation();
              onChange(val);
            }}
            style={{
              fontSize: '18px',
              padding: '15px 25px',
              background: value === val ? '#ffff00' : '#666666',
              color: value === val ? 'black' : 'white',
              border: '2px solid white',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {val}cm
          </button>
        ))}

        {label === 'IDADE' && [20, 30, 40].map(val => (
          <button
            key={val}
            onClick={(e) => {
              console.log(`🎯 VALOR RÁPIDO ${val} CLICADO`);
              e.preventDefault();
              e.stopPropagation();
              onChange(val);
            }}
            style={{
              fontSize: '18px',
              padding: '15px 25px',
              background: value === val ? '#ffff00' : '#666666',
              color: value === val ? 'black' : 'white',
              border: '2px solid white',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {val} anos
          </button>
        ))}
      </div>

      <p style={{
        color: 'white',
        textAlign: 'center',
        marginTop: '20px',
        fontSize: '16px',
        fontWeight: 'bold'
      }}>
        ⚠️ SE ESTES BOTÕES NÃO FUNCIONAREM, O PROBLEMA É MAIS PROFUNDO!<br/>
        Abra Console (F12) para ver logs
      </p>
    </div>
  );
};

export default UltraSimpleSlider;