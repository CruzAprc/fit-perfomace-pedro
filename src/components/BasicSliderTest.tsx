import React, { useState } from 'react';
import FunctionalSlider from './FunctionalSlider';

const BasicSliderTest = () => {
  const [peso, setPeso] = useState(70);
  const [altura, setAltura] = useState(170);
  const [idade, setIdade] = useState(25);

  console.log('BasicSliderTest renderizado - peso:', peso, 'altura:', altura, 'idade:', idade);

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#000',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#ff0000', textAlign: 'center' }}>TESTE FUNCIONAL DOS SLIDERS</h1>
      <p style={{ textAlign: 'center', color: '#ffff00' }}>Abra o Console (F12) para ver os logs detalhados!</p>
      
      {/* PESO com FunctionalSlider */}
      <div style={{ margin: '30px 0' }}>
        <h2 style={{ color: '#ff0000', marginBottom: '20px' }}>PESO (FunctionalSlider):</h2>
        <FunctionalSlider
          min={30}
          max={200}
          value={peso}
          onChange={(newValue) => {
            console.log('PESO onChange chamado:', peso, '->', newValue);
            setPeso(newValue);
          }}
          unit="kg"
          label="PESO ATUAL"
        />
      </div>

      {/* ALTURA com FunctionalSlider */}
      <div style={{ margin: '30px 0' }}>
        <h2 style={{ color: '#00ff00', marginBottom: '20px' }}>ALTURA (FunctionalSlider):</h2>
        <FunctionalSlider
          min={120}
          max={220}
          value={altura}
          onChange={(newValue) => {
            console.log('ALTURA onChange chamado:', altura, '->', newValue);
            setAltura(newValue);
          }}
          unit="cm"
          label="ALTURA"
        />
      </div>

      {/* IDADE com FunctionalSlider */}
      <div style={{ margin: '30px 0' }}>
        <h2 style={{ color: '#0000ff', marginBottom: '20px' }}>IDADE (FunctionalSlider):</h2>
        <FunctionalSlider
          min={13}
          max={100}
          value={idade}
          onChange={(newValue) => {
            console.log('IDADE onChange chamado:', idade, '->', newValue);
            setIdade(newValue);
          }}
          unit="anos"
          label="IDADE"
        />
      </div>

      <div style={{ textAlign: 'center', marginTop: '50px', padding: '20px', border: '2px solid #ffff00' }}>
        <h3 style={{ color: '#ffff00' }}>RESUMO DOS VALORES:</h3>
        <p>Peso: {peso}kg | Altura: {altura}cm | Idade: {idade} anos</p>
        <p style={{ fontSize: '12px', color: '#ccc' }}>
          Teste: botões +/-, clique na barra, botões de valores rápidos
        </p>
      </div>
    </div>
  );
};

export default BasicSliderTest;