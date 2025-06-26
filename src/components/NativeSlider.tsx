import React, { useMemo } from 'react';

interface NativeSliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  unit: string;
  label: string;
}

const NativeSlider: React.FC<NativeSliderProps> = ({ min, max, value, onChange, unit, label }) => {
  // Memoizar cálculos pesados
  const { percentage, themeColor, themeColorRgb, quickValues } = useMemo(() => {
    const perc = ((value - min) / (max - min)) * 100;
    
    // Detecta se o perfil é feminino
    const femaleProfile = localStorage.getItem('userGender') === 'female';
    const color = femaleProfile ? '#ec4899' : '#3b82f6';
    const colorRgb = femaleProfile ? '236, 72, 153' : '59, 130, 246';

    // Valores rápidos baseados no tipo
    let quickVals: number[] = [];
    if (label === 'PESO ATUAL') quickVals = [50, 70, 90];
    else if (label === 'ALTURA') quickVals = [160, 175, 190];
    else if (label === 'IDADE') quickVals = [20, 30, 40];

    return {
      percentage: perc,
      themeColor: color,
      themeColorRgb: colorRgb,
      quickValues: quickVals
    };
  }, [value, min, max, label]);

  // Memoizar style do slider para evitar recriação
  const sliderStyle = useMemo(() => ({
    background: `linear-gradient(to right, ${themeColor} 0%, ${themeColor} ${percentage}%, #475569 ${percentage}%, #475569 100%)`,
    borderRadius: '12px',
    outline: 'none'
  }), [themeColor, percentage]);

  // Memoizar CSS dinâmico
  const dynamicCSS = useMemo(() => `
    .native-slider-${label.replace(/\s+/g, '-').toLowerCase()}::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 32px;
      height: 32px;
      background: ${themeColor};
      border: 4px solid white;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(${themeColorRgb}, 0.4);
      transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .native-slider-${label.replace(/\s+/g, '-').toLowerCase()}::-webkit-slider-thumb:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 20px rgba(${themeColorRgb}, 0.6);
    }
    
    .native-slider-${label.replace(/\s+/g, '-').toLowerCase()}::-webkit-slider-thumb:active {
      transform: scale(0.95);
    }
    
    .native-slider-${label.replace(/\s+/g, '-').toLowerCase()}::-moz-range-thumb {
      width: 32px;
      height: 32px;
      background: ${themeColor};
      border: 4px solid white;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(${themeColorRgb}, 0.4);
      transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
      -moz-appearance: none;
    }
    
    .native-slider-${label.replace(/\s+/g, '-').toLowerCase()}::-moz-range-thumb:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 20px rgba(${themeColorRgb}, 0.6);
    }
    
    .native-slider-${label.replace(/\s+/g, '-').toLowerCase()}::-moz-range-thumb:active {
      transform: scale(0.95);
    }

    .native-slider-${label.replace(/\s+/g, '-').toLowerCase()}::-moz-range-track {
      background: transparent;
      border: none;
    }
  `, [themeColor, themeColorRgb, label]);

  const sliderClassName = `native-slider-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="mb-4">
      <style>{dynamicCSS}</style>
      
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
        {/* Slider nativo estilizado */}
        <div className="relative mb-6">
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className={`w-full h-6 appearance-none cursor-pointer ${sliderClassName}`}
            style={sliderStyle}
          />
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

export default NativeSlider;