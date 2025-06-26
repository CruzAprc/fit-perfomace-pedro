import React, { useState, useEffect } from 'react';
import { ModernFitLogo } from './ModernFitLogo';

interface MatrixInitializerProps {
  onComplete: () => void;
}

const MatrixInitializer: React.FC<MatrixInitializerProps> = ({ onComplete }) => {
  const [showLogo, setShowLogo] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');

  // Caracteres Matrix expandidos para mais variedade
  const matrixChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789HACKFITBODYTRAINPERFORMANCE';

  useEffect(() => {
    // Timeline estendida para 4 segundos
    const timeouts = [
      // Mostrar primeira mensagem
      setTimeout(() => setCurrentMessage('INICIANDO_HACK_CORPORAL'), 400),
      
      // Mostrar segunda mensagem
      setTimeout(() => setCurrentMessage('SEU_CORPO_ESTÁ_SENDO_HACKEADO'), 1000),
      
      // Mostrar logo
      setTimeout(() => setShowLogo(true), 1600),
      
      // Mostrar terceira mensagem
      setTimeout(() => setCurrentMessage('FALE_COM_O_SISTEMA'), 2200),
      
      // Mensagem final
      setTimeout(() => setCurrentMessage('HACK_CORPORAL_COMPLETO'), 2800),
      
      // Finalizar após 4 segundos
      setTimeout(() => onComplete(), 4000)
    ];

    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <>
      {/* Styles Otimizados */}
      <style>{`
        .matrix-initializer {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #000000;
          z-index: 9999;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .matrix-rain-simple {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        
        .matrix-column-simple {
          position: absolute;
          top: -20px;
          font-family: monospace;
          font-size: 20px;
          color: #4F80FF;
          text-shadow: 0 0 5px #4F80FF;
          animation: simple-fall 4s linear infinite;
        }
        
        .matrix-column-secondary {
          position: absolute;
          top: -20px;
          font-family: monospace;
          font-size: 16px;
          color: #5E8EFF;
          text-shadow: 0 0 3px #5E8EFF;
          animation: simple-fall 5s linear infinite;
          opacity: 0.7;
        }
        
        @keyframes simple-fall {
          0% { transform: translateY(-10vh); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(110vh); opacity: 0; }
        }
        
        .scanline-simple {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: #4F80FF;
          animation: scan-move 4s linear infinite;
          opacity: 0.8;
          box-shadow: 0 0 10px #4F80FF;
        }
        
        @keyframes scan-move {
          0% { transform: translateY(0); }
          100% { transform: translateY(100vh); }
        }
        
        .center-message {
          position: absolute;
          top: 30%;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'Rajdhani', monospace;
          font-size: 18px;
          font-weight: 700;
          color: #ff4444;
          text-shadow: 0 0 10px #ff4444;
          text-align: center;
          letter-spacing: 2px;
          animation: message-glow 0.5s ease-in-out;
        }
        
        @keyframes message-glow {
          0% { opacity: 0; transform: translateX(-50%) scale(0.8); }
          100% { opacity: 1; transform: translateX(-50%) scale(1); }
        }
        
        .logo-container-simple {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          animation: logo-appear-simple 0.8s ease-out;
        }
        
        @keyframes logo-appear-simple {
          0% { 
            opacity: 0; 
            transform: translate(-50%, -50%) scale(0.5); 
          }
          100% { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(1); 
          }
        }
        
        .logo-simple {
          margin-bottom: 15px;
          filter: drop-shadow(0 0 15px #4F80FF);
        }
        
        .company-name-simple {
          font-family: 'Orbitron', monospace;
          font-size: 20px;
          font-weight: 700;
          color: #4F80FF;
          text-shadow: 0 0 10px #4F80FF;
          letter-spacing: 2px;
          margin-bottom: 5px;
        }
        
        .tagline-simple {
          font-family: 'Rajdhani', monospace;
          font-size: 12px;
          font-weight: 600;
          color: #00ff88;
          text-shadow: 0 0 5px #00ff88;
          letter-spacing: 1px;
        }
        
        @media (max-width: 768px) {
          .center-message {
            font-size: 16px;
          }
          .company-name-simple {
            font-size: 18px;
          }
          .matrix-column-simple {
            font-size: 16px;
          }
        }
      `}</style>

      <div className="matrix-initializer">
        {/* Matrix Rain com mais colunas */}
        <div className="matrix-rain-simple">
          {[...Array(15)].map((_, i) => (
            <div 
              key={`col-${i}`}
              className="matrix-column-simple"
              style={{ 
                left: `${i * 6.5}%`, 
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${3 + Math.random() * 2}s` 
              }}
            >
              {matrixChars[Math.floor(Math.random() * matrixChars.length)]}
            </div>
          ))}
          
          {/* Colunas secundárias para mais densidade */}
          {[...Array(10)].map((_, i) => (
            <div 
              key={`col-sec-${i}`}
              className="matrix-column-secondary"
              style={{ 
                left: `${5 + i * 9}%`, 
                animationDelay: `${1 + i * 0.15}s`,
                animationDuration: `${4 + Math.random() * 1.5}s` 
              }}
            >
              {matrixChars[Math.floor(Math.random() * matrixChars.length)]}
            </div>
          ))}
        </div>
        
        {/* Scanline simples */}
        <div className="scanline-simple"></div>
        
        {/* Mensagem Central */}
        {currentMessage && (
          <div className="center-message">
            {currentMessage}
          </div>
        )}
        
        {/* Logo Center */}
        {showLogo && (
          <div className="logo-container-simple">
            <div className="logo-simple">
              <ModernFitLogo size={120} variant="icon-only" />
            </div>
            <div className="logo-text-simple">
              <div className="company-name-simple">FIT PERFORMANCE</div>
              <div className="tagline-simple">SISTEMA NEURAL ATIVO</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MatrixInitializer;