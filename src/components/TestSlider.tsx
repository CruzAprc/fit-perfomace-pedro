import React, { useState } from 'react';

const TestSlider = () => {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);

  return (
    <div style={{ padding: '20px', backgroundColor: '#000', color: 'white', minHeight: '100vh' }}>
      <h1 style={{ color: 'red' }}>TESTE SLIDER ISOLADO</h1>
      
      {/* Slider HTML básico */}
      <div style={{ margin: '30px 0' }}>
        <h2>Slider HTML Básico:</h2>
        <input
          type="range"
          min="30"
          max="200"
          value={weight}
          onChange={(e) => {
            console.log('Slider HTML básico:', e.target.value);
            setWeight(Number(e.target.value));
          }}
          style={{
            width: '100%',
            height: '20px',
            background: '#444',
            borderRadius: '10px'
          }}
        />
        <p>Peso: {weight}kg</p>
      </div>

      {/* Slider com classe simple-slider */}
      <div style={{ margin: '30px 0' }}>
        <h2>Slider com Classe CSS:</h2>
        <input
          type="range"
          className="simple-slider"
          min="120"
          max="220"
          value={height}
          onChange={(e) => {
            console.log('Slider com classe:', e.target.value);
            setHeight(Number(e.target.value));
          }}
        />
        <p>Altura: {height}cm</p>
      </div>

      {/* Teste de clique */}
      <div style={{ margin: '30px 0' }}>
        <h2>Teste de Botões:</h2>
        <button 
          onClick={() => {
            console.log('Botão -1 clicado');
            setWeight(w => Math.max(w - 1, 30));
          }}
          style={{ padding: '10px', margin: '5px', background: 'blue', color: 'white', border: 'none' }}
        >
          Peso -1
        </button>
        <button 
          onClick={() => {
            console.log('Botão +1 clicado');
            setWeight(w => Math.min(w + 1, 200));
          }}
          style={{ padding: '10px', margin: '5px', background: 'blue', color: 'white', border: 'none' }}
        >
          Peso +1
        </button>
      </div>

      <p style={{ color: 'yellow' }}>
        Abra o Console (F12) para ver os logs!<br/>
        Teste cada slider e botão para ver qual funciona.
      </p>
    </div>
  );
};

export default TestSlider;