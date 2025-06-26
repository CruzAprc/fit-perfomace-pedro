import React from 'react';

interface EmergencySliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  unit: string;
  label: string;
}

const EmergencySlider: React.FC<EmergencySliderProps> = ({ min, max, value, onChange, unit, label }) => {
  console.log('🚨 EmergencySlider renderizado:', { min, max, value, unit, label });
  
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('🎯 Slider onChange detectado:', e.target.value);
    const newValue = Number(e.target.value);
    onChange(newValue);
  };

  const handleButtonClick = (increment: boolean) => {
    console.log('🔘 Botão clicado:', increment ? '+1' : '-1');
    const newValue = increment 
      ? Math.min(value + 1, max)
      : Math.max(value - 1, min);
    onChange(newValue);
  };

  // Teste se o componente está sendo renderizado
  console.log('🔍 EmergencySlider sendo renderizado para:', label);

  return (
    <div 
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 99999,
        background: 'rgba(0, 0, 0, 0.95)',
        padding: '30px',
        borderRadius: '15px',
        border: '3px solid #ff0000',
        width: '90vw',
        maxWidth: '500px'
      }}
      onClick={(e) => {
        console.log('🖱️ Container clicado');
        e.stopPropagation();
      }}
    >
      <h2 style={{ color: '#ff0000', textAlign: 'center', marginBottom: '20px' }}>
        🚨 TESTE EMERGENCIAL - {label}
      </h2>
      
      <div style={{ 
        color: 'white', 
        textAlign: 'center', 
        fontSize: '48px', 
        fontWeight: 'bold',
        marginBottom: '30px',
        background: 'rgba(255,255,255,0.1)',
        padding: '15px',
        borderRadius: '10px'
      }}>
        {value} {unit}
      </div>

      {/* Slider com máxima prioridade */}
      <div style={{ marginBottom: '30px' }}>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleSliderChange}
          onInput={handleSliderChange}
          onMouseDown={(e) => {
            console.log('🖱️ Slider mouseDown');
            e.stopPropagation();
          }}
          onTouchStart={(e) => {
            console.log('👆 Slider touchStart');
            e.stopPropagation();
          }}
          style={{
            width: '100%',
            height: '30px',
            background: '#666',
            borderRadius: '15px',
            outline: 'none',
            border: '3px solid #00ff00',
            cursor: 'pointer',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            appearance: 'none',
            zIndex: 999999,
            position: 'relative',
            pointerEvents: 'auto',
            touchAction: 'none'
          }}
        />
      </div>

      {/* Botões de teste */}
      <div style={{ 
        display: 'flex', 
        gap: '20px', 
        justifyContent: 'center',
        marginBottom: '20px'
      }}>
        <button
          onClick={(e) => {
            console.log('🔘 Botão -1 clicado');
            e.preventDefault();
            e.stopPropagation();
            handleButtonClick(false);
          }}
          onMouseDown={(e) => {
            console.log('🖱️ Botão -1 mouseDown');
            e.stopPropagation();
          }}
          style={{
            padding: '15px 30px',
            background: '#ff4444',
            color: 'white',
            border: '3px solid #fff',
            borderRadius: '10px',
            fontSize: '20px',
            fontWeight: 'bold',
            cursor: 'pointer',
            zIndex: 999999,
            position: 'relative'
          }}
        >
          -1
        </button>
        
        <button
          onClick={(e) => {
            console.log('🔘 Botão +1 clicado');
            e.preventDefault();
            e.stopPropagation();
            handleButtonClick(true);
          }}
          onMouseDown={(e) => {
            console.log('🖱️ Botão +1 mouseDown');
            e.stopPropagation();
          }}
          style={{
            padding: '15px 30px',
            background: '#44ff44',
            color: 'white',
            border: '3px solid #fff',
            borderRadius: '10px',
            fontSize: '20px',
            fontWeight: 'bold',
            cursor: 'pointer',
            zIndex: 999999,
            position: 'relative'
          }}
        >
          +1
        </button>
      </div>

      {/* Range indicators */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        color: '#ccc',
        fontSize: '16px'
      }}>
        <span>{min}</span>
        <span style={{ color: '#00ff00', fontWeight: 'bold' }}>ATUAL: {value}</span>
        <span>{max}</span>
      </div>

      <p style={{ 
        color: '#ffff00', 
        textAlign: 'center', 
        marginTop: '20px',
        fontSize: '14px'
      }}>
        Abra o Console (F12) para ver os logs!<br/>
        Este slider está FIXO e tem Z-INDEX máximo
      </p>
    </div>
  );
};

export default EmergencySlider;