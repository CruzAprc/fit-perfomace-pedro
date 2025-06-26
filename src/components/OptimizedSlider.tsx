import React from 'react';

interface OptimizedSliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  unit: string;
  label: string;
}

const OptimizedSlider: React.FC<OptimizedSliderProps> = ({ min, max, value, onChange, unit, label }) => {
  const percentage = ((value - min) / (max - min)) * 100;
  
  // Detecta se o perfil é feminino
  const femaleProfile = localStorage.getItem('userGender') === 'female';
  const themeColor = femaleProfile ? '#ec4899' : '#3b82f6';
  const themeColorRgb = femaleProfile ? '236, 72, 153' : '59, 130, 246';

  // Valores rápidos baseados no tipo
  const getQuickValues = () => {
    if (label === 'PESO ATUAL') return [50, 70, 90];
    if (label === 'ALTURA') return [160, 175, 190];
    if (label === 'IDADE') return [20, 30, 40];
    return [];
  };

  const quickValues = getQuickValues();

  return (
    <div className="mb-4">
      {/* Display com valor atual */}
      <div className="text-center mb-4">
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/40 relative backdrop-blur-sm">
          {/* Cantos estilizados */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: `rgba(${themeColorRgb}, 0.6)` }} />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: `rgba(${themeColorRgb}, 0.6)` }} />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2" style={{ borderColor: `rgba(${themeColorRgb}, 0.6)` }} />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: `rgba(${themeColorRgb}, 0.6)` }} />
          
          <div className="text-5xl font-bold text-white mb-3">
            {value}
            <span className="text-2xl text-slate-300 ml-2">{unit}</span>
          </div>
          <div className="text-slate-300 font-bold text-base">{label}</div>
        </div>
      </div>

      {/* Container do slider */}
      <div className="bg-slate-800/40 backdrop-blur-sm rounded-lg p-4 mb-3 border border-slate-700/40">
        {/* Slider usando classe global */}
        <div className="relative mb-6">
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="simple-slider"
            style={{
              background: `linear-gradient(to right, ${themeColor} 0%, ${themeColor} ${percentage}%, #4B5563 ${percentage}%, #4B5563 100%)`
            }}
          />
          
          {/* Sobrescrever estilos do thumb para tema feminino */}
          {femaleProfile && (
            <style>{`
              .simple-slider::-webkit-slider-thumb {
                background: ${themeColor} !important;
              }
              .simple-slider::-webkit-slider-thumb:hover {
                background: #db2777 !important;
              }
              .simple-slider::-webkit-slider-thumb:active {
                background: #be185d !important;
              }
              .simple-slider::-moz-range-thumb {
                background: ${themeColor} !important;
              }
              .simple-slider::-moz-range-thumb:hover {
                background: #db2777 !important;
              }
            `}</style>
          )}
        </div>

        {/* Botões de ajuste fino */}
        <div className="flex justify-center gap-2 mb-4">
          <button
            onClick={() => onChange(Math.max(value - 1, min))}
            disabled={value <= min}
            className="px-6 py-2 bg-slate-700 text-white rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600 transition-colors duration-200"
          >
            -1
          </button>
          <div className="px-6 py-2 bg-slate-800 text-white rounded-md font-bold min-w-[80px] text-center">
            {value} {unit}
          </div>
          <button
            onClick={() => onChange(Math.min(value + 1, max))}
            disabled={value >= max}
            className="px-6 py-2 bg-slate-700 text-white rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600 transition-colors duration-200"
          >
            +1
          </button>
        </div>
        
        {/* Indicadores de range */}
        <div className="flex justify-between text-sm text-slate-400">
          <span>{min}</span>
          <span className="text-white font-bold">{value}</span>
          <span>{max}</span>
        </div>
      </div>

      {/* Botões de valores rápidos */}
      {quickValues.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {quickValues.map(quickValue => {
            const isSelected = value === quickValue;
            return (
              <button
                key={quickValue}
                onClick={() => onChange(quickValue)}
                className={`
                  backdrop-blur-sm rounded-xl p-3 font-bold text-base
                  transition-all duration-200 ease-out cursor-pointer
                  ${isSelected 
                    ? 'bg-opacity-20 border-2 shadow-lg transform scale-105' 
                    : 'bg-slate-800/60 border-2 border-slate-700/50 hover:scale-105 hover:bg-slate-700/60'
                  }
                `}
                style={{
                  backgroundColor: isSelected ? `${themeColor}33` : undefined,
                  borderColor: isSelected ? themeColor : undefined,
                  boxShadow: isSelected ? `0 0 20px rgba(${themeColorRgb}, 0.25)` : undefined,
                  color: 'white'
                }}
              >
                {quickValue}{unit}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OptimizedSlider;