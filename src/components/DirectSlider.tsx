import React from 'react';

interface DirectSliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  unit: string;
  label: string;
}

const DirectSlider: React.FC<DirectSliderProps> = ({ min, max, value, onChange, unit, label }) => {
  console.log('DirectSlider renderizado:', { min, max, value, unit, label });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    console.log('Slider onChange:', value, '->', newValue);
    onChange(newValue);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    console.log('Slider mouseDown:', e);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    console.log('Slider touchStart:', e);
  };

  return (
    <div style={{ padding: '20px', background: 'rgba(0,0,0,0.8)', borderRadius: '12px', margin: '10px 0' }}>
      <h3 style={{ color: 'white', marginBottom: '15px' }}>{label}</h3>
      
      {/* Valor atual */}
      <div style={{ 
        textAlign: 'center', 
        color: 'white', 
        fontSize: '32px', 
        fontWeight: 'bold',
        marginBottom: '20px',
        background: 'rgba(255,255,255,0.1)',
        padding: '10px',
        borderRadius: '8px'
      }}>
        {value} {unit}
      </div>

      {/* Slider com estilos inline para garantir funcionamento */}
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{
          width: '100%',
          height: '20px',
          background: '#444',
          borderRadius: '10px',
          outline: 'none',
          border: 'none',
          cursor: 'pointer',
          WebkitAppearance: 'none',
          MozAppearance: 'none',
          appearance: 'none',
          zIndex: 9999,
          position: 'relative',
          pointerEvents: 'auto'
        }}
      />

      {/* Botões de teste */}
      <div style={{ marginTop: '15px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button
          onClick={() => {
            console.log('Botão -1 clicado');
            onChange(Math.max(value - 1, min));
          }}
          style={{
            padding: '8px 16px',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          -1
        </button>
        <button
          onClick={() => {
            console.log('Botão +1 clicado');
            onChange(Math.min(value + 1, max));
          }}
          style={{
            padding: '8px 16px',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          +1
        </button>
      </div>

      {/* Indicadores */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px',
        color: '#888',
        fontSize: '14px'
      }}>
        <span>{min}</span>
        <span style={{ color: 'white', fontWeight: 'bold' }}>{value}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default DirectSlider;