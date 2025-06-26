import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModernFitLogo } from './ModernFitLogo';
import MatrixInitializer from './MatrixInitializer';

const Onboarding = () => {
  const navigate = useNavigate();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [systemStatus, setSystemStatus] = useState('INICIALIZANDO...');
  const [showInitializer, setShowInitializer] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          setSystemStatus('SISTEMA ONLINE');
          return 100;
        }
        const newProgress = prev + Math.random() * 5;
        
        if (newProgress < 30) setSystemStatus('CARREGANDO DADOS...');
        else if (newProgress < 60) setSystemStatus('CONECTANDO SERVIDORES...');
        else if (newProgress < 90) setSystemStatus('CALIBRANDO SISTEMA...');
        else setSystemStatus('QUASE PRONTO...');
        
        return Math.min(newProgress, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const completeOnboarding = () => {
    const user = JSON.parse(localStorage.getItem('fitness_user') || '{}');
    user.hasCompletedOnboarding = true;
    localStorage.setItem('fitness_user', JSON.stringify(user));
    
    console.log('Tutorial concluído! Redirecionando para loading...');
    navigate('/loading');
  };

  const handleInitializerComplete = () => {
    setShowInitializer(false);
  };


  // Mostrar Matrix Initializer primeiro
  if (showInitializer) {
    return <MatrixInitializer onComplete={handleInitializerComplete} />;
  }

  return (
    <div className="min-h-screen gaming-bg relative overflow-hidden flex flex-col">
      {/* Matrix Rain Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="matrix-rain"
            style={{
              left: `${i * 6.66}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + Math.random() * 1.5}s`
            }}
          />
        ))}
      </div>

      {/* Gaming Header - Fixed */}
      <div className="w-full px-4 py-4 relative z-10">
        <div className="max-w-sm mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate('/login')}
            className="flex items-center text-gray-400 hover:text-white transition-colors energy-border rounded-lg px-3 py-2"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="digital-glitch text-sm">VOLTAR</span>
          </button>
          
          {/* Status Indicator */}
          <div className="flex items-center gap-2">
            <div className="power-core w-2 h-2 rounded-full"></div>
            <span className="text-xs text-blue-400 font-mono">{systemStatus}</span>
          </div>
        </div>
      </div>

      {/* Main Content - Flexível */}
      <div className="flex-1 flex flex-col justify-center px-4 relative z-10">
        <div className="max-w-sm mx-auto w-full">
          
          {/* Logo e Título - Compacto */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <ModernFitLogo size={80} variant="icon-only" />
            </div>
            
            <h1 className="text-xl font-bold text-white mb-2 neon-text">
              INICIALIZANDO SISTEMA
            </h1>
            <p className="text-gray-300 text-sm mb-4 data-stream rounded p-2">
              Seu corpo está prestes a ser hackeado.
              <br />
              <span className="text-green-400 font-semibold digital-glitch">Protocolo de transformação ativado.</span>
            </p>

            {/* Progress Bar - Compacto */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Sistema carregando...</span>
                <span>{Math.floor(loadingProgress)}%</span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full gaming-progress transition-all duration-300"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Subtitle */}
          <div className="text-center mb-6">
            <p className="text-gray-300 text-sm">
              Seu corpo vai ser hackeado em 5 minutos
            </p>
          </div>

          {/* VÍDEO PROTAGONISTA GIGANTE - Centro Total */}
          <div className="mb-6">
            <div className="gaming-card rounded-3xl p-8 animate-slide-in-up holographic cyber-border">
              
              {/* VÍDEO MEGA - Perfeitamente Centralizado */}
              <div className="relative bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-3xl mb-6 holographic scan-line overflow-hidden flex items-center justify-center" style={{minHeight: '320px'}}>
                
                {/* Background Effects Intensos */}
                <div className="absolute inset-0 bg-blue-400 bg-opacity-30 rounded-3xl"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-3xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-transparent to-blue-600 rounded-3xl opacity-50"></div>
                
                {/* Video Player - PERFEITAMENTE CENTRALIZADO */}
                <div className="relative z-10">
                  <div className="w-32 h-32 bg-white bg-opacity-25 rounded-full flex items-center justify-center animate-pulse-glow energy-border cursor-pointer hover:scale-110 transition-all duration-500 hover:bg-opacity-35">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5V19L19 12L8 5Z" fill="white"/>
                    </svg>
                  </div>
                </div>
                
                {/* Multiple Orbital Rings - Centralizados */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-white border-opacity-50 rounded-full animate-spin" style={{animationDuration: '6s'}}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-52 h-52 border-2 border-white border-opacity-40 rounded-full animate-spin" style={{animationDuration: '8s', animationDirection: 'reverse'}}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white border-opacity-30 rounded-full animate-spin" style={{animationDuration: '12s'}}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-76 h-76 border border-white border-opacity-20 rounded-full animate-spin" style={{animationDuration: '16s', animationDirection: 'reverse'}}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-white border-opacity-15 rounded-full animate-spin" style={{animationDuration: '20s'}}></div>
                
                {/* Pulse Effects Centralizados */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 border-4 border-white border-opacity-30 rounded-full animate-ping"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-white border-opacity-40 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 border border-white border-opacity-25 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                
                {/* Particles Flutuantes */}
                <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute top-8 right-6 w-1 h-1 bg-blue-300 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-purple-300 rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>
                <div className="absolute bottom-4 right-4 w-2 h-2 bg-white rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
              </div>
              
              {/* Video Info - Centralizada */}
              <div className="text-center">
                <div className="flex items-center justify-center text-white mb-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                  <span className="font-mono text-lg font-bold">3:45 min</span>
                  <div className="w-3 h-3 bg-green-400 rounded-full ml-3 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                </div>
                <p className="text-blue-300 text-sm font-mono">SISTEMA NEURAL ATIVO</p>
              </div>
            </div>
          </div>

          {/* CTA Button MEGA Especial */}
          <div className="btn-container relative mb-6">
            
            {/* Partículas Flutuantes */}
            <div className="btn-particle"></div>
            <div className="btn-particle"></div>
            <div className="btn-particle"></div>
            <div className="btn-particle"></div>
            <div className="btn-particle"></div>
            <div className="btn-particle"></div>
            
            {/* Ondas de Energia */}
            <div className="energy-wave"></div>
            <div className="energy-wave"></div>
            <div className="energy-wave"></div>
            
            {/* Botão Principal - Tamanho Normal */}
            <button
              onClick={completeOnboarding}
              className="w-full btn-special text-xl font-gaming py-4 rounded-xl relative z-20"
            >
              <span className="relative z-30">
                HACKEAR MEU CORPO
              </span>
            </button>
            
            <div className="flex items-center justify-center mt-4 text-sm text-gray-400">
              <div className="power-core w-3 h-3 rounded-full mr-2"></div>
              <span className="font-mono font-bold">SISTEMA CARREGADO • PRONTO PARA HACK</span>
              <div className="power-core w-3 h-3 rounded-full ml-2" style={{animationDelay: '0.5s'}}></div>
            </div>
          </div>

          {/* Efeito de Digitação - Abaixo do Botão */}
          <div className="text-center mb-6">
            <div className="text-red-500 font-cyber text-xl font-bold typing-effect digital-glitch">
              SEU CORPO ESTÁ SENDO HACKEADO
            </div>
          </div>

          {/* Footer Info - Mais Compacto */}
          <p className="text-xs text-gray-500 text-center font-mono">
            [PROTOCOLO_ÚNICO] Acesso concedido apenas uma vez por usuário
          </p>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;