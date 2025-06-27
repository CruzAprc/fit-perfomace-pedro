import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, TrendingUp, Wifi, CheckCircle, Zap, ChevronRight } from 'lucide-react';
import { ModernFitLogo } from './ModernFitLogo';

const LoadingFitness = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showStartButton, setShowStartButton] = useState(false);
  const [stepProgress, setStepProgress] = useState(0);
  const [typingText, setTypingText] = useState('');

  const loadingSteps = [
    {
      icon: User,
      text: "Escaneando stats do jogador",
      subtext: "Analisando perfil biométrico",
      duration: 2000,
      color: "#60A5FA"
    },
    {
      icon: Settings,
      text: "Configurando build personalizada",
      subtext: "Criando protocolo exclusivo",
      duration: 2500,
      color: "#A78BFA"
    },
    {
      icon: Zap,
      text: "Calibrando algoritmos de evolução",
      subtext: "Otimizando performance neural",
      duration: 2200,
      color: "#34D399"
    },
    {
      icon: TrendingUp,
      text: "Preparando dashboard de treino",
      subtext: "Carregando métricas avançadas",
      duration: 1800,
      color: "#F59E0B"
    },
    {
      icon: Wifi,
      text: "Conexão estabelecida",
      subtext: "Sistema neural sincronizado",
      duration: 1500,
      color: "#06B6D4"
    }
  ];

  // Controla a barra de progresso individual de cada step
  useEffect(() => {
    setStepProgress(0);
    
    let stepTimer: NodeJS.Timeout;
    
    // Pequeno delay para garantir que o estado foi atualizado
    const startTimer = setTimeout(() => {
      stepTimer = setInterval(() => {
        setStepProgress(prev => {
          const newProgress = prev + 2;
          if (newProgress >= 100) {
            return 100;
          }
          return newProgress;
        });
      }, 60);
    }, 100);
    
    return () => {
      clearTimeout(startTimer);
      if (stepTimer) clearInterval(stepTimer);
    };
  }, [currentStep]);

  // Controla quando mudar para o próximo step
  useEffect(() => {
    if (stepProgress >= 100) {
      const timer = setTimeout(() => {
        if (currentStep < loadingSteps.length - 1) {
          setCurrentStep(prev => prev + 1);
        } else {
          // Último step completo, mostrar botão
          setTimeout(() => {
            setShowStartButton(true);
          }, 1000);
        }
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [stepProgress, currentStep, loadingSteps.length]);

  // Controla a barra de progresso geral
  useEffect(() => {
    setProgress(((currentStep + 1) / loadingSteps.length) * 100);
  }, [currentStep, loadingSteps.length]);

  const handleStartAnamnese = () => {
    navigate('/nutrition-quiz');
  };

  // Efeito de digitação com erro para "Sistema Pronto"
  useEffect(() => {
    if (showStartButton) {
      const messages = [
        { text: 'PERGUNTA: Você vai continuar sendo comum?', color: 'red', delay: 90 },
        { text: 'FitPerformance está desafiando você...', color: 'blue', delay: 95 }
      ];
      
      let messageIndex = 0;
      let charIndex = 0;
      
      const typeMessage = () => {
        if (messageIndex < messages.length) {
          const currentMessage = messages[messageIndex];
          
          if (charIndex < currentMessage.text.length) {
            setTypingText(currentMessage.text.substring(0, charIndex + 1));
            charIndex++;
            setTimeout(typeMessage, currentMessage.delay);
          } else {
            // Pausa no final da mensagem
            let pauseTime = 600;
            if (currentMessage.color === 'red') pauseTime = 800; // Pausa maior nos erros
            if (messageIndex === messages.length - 1) pauseTime = 800; // Pausa menor no final
            
            setTimeout(() => {
              if (messageIndex < messages.length - 1) {
                messageIndex++;
                charIndex = 0;
                setTypingText('');
                setTimeout(typeMessage, 150);
              }
            }, pauseTime);
          }
        }
      };
      
      setTimeout(typeMessage, 400);
    }
  }, [showStartButton]);

  const isLastStep = currentStep === loadingSteps.length - 1;

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-2">
      {/* Background moderno */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Particles dinâmicas - reduzidas para mobile */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-modern ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto px-3">
        {/* Logo centralizada */}
        <div className="flex justify-center mb-6">
          <ModernFitLogo size={80} variant="icon-only" />
        </div>

        {/* Container principal */}
        <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-blue-400/30 p-4 sm:p-5 shadow-xl relative overflow-hidden">
          {/* Cantos em azul neon - menores */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-400"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-400"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-400"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-400"></div>
          
          {/* Steps de loading */}
          <div className="space-y-3 mb-6">
            {loadingSteps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = index === currentStep;
              const isComplete = index < currentStep;
              
              return (
                <div key={index} className={`relative bg-transparent border rounded-lg p-3 transition-all duration-500 ${
                  (isActive && isLastStep) ? 'border-green-400/60 scale-102' :
                  isActive ? 'border-blue-400/60 scale-102' : 
                  isComplete ? 'border-green-400/40 opacity-80' : 
                  'border-gray-600/30 opacity-50'
                }`}>
                  
                  {/* Cantos menores */}
                  {isActive && (
                    <>
                      <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l ${isLastStep ? 'border-green-400' : 'border-blue-400'}`}></div>
                      <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r ${isLastStep ? 'border-green-400' : 'border-blue-400'}`}></div>
                      <div className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l ${isLastStep ? 'border-green-400' : 'border-blue-400'}`}></div>
                      <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r ${isLastStep ? 'border-green-400' : 'border-blue-400'}`}></div>
                    </>
                  )}
                  
                  <div className="flex items-center space-x-3">
                    {/* Ícone */}
                    <div className={`relative w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      isComplete 
                        ? 'bg-green-500/20 border border-green-400/50' 
                        : (isActive && isLastStep)
                          ? 'bg-green-500/20 border border-green-400/50'
                        : isActive 
                          ? 'bg-blue-500/20 border border-blue-400/50' 
                          : 'bg-gray-800/30 border border-gray-600/30'
                    }`}>
                      {isComplete ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <IconComponent 
                          className={`w-5 h-5 ${(isActive && isLastStep) ? 'text-green-400' : isActive ? 'text-blue-400' : 'text-gray-500'}`}
                        />
                      )}
                    </div>

                    {/* Texto */}
                    <div className="flex-1">
                      <div className={`font-semibold text-sm sm:text-base transition-colors duration-300 ${
                        (isActive && isLastStep) ? 'text-green-400' : isActive ? 'text-white' : isComplete ? 'text-green-400' : 'text-gray-400'
                      }`}>
                        {step.text}
                      </div>
                      <div className={`text-xs sm:text-sm transition-colors duration-300 ${
                        (isActive && isLastStep) ? 'text-green-300' : isActive ? 'text-blue-300' : 'text-gray-500'
                      }`}>
                        {step.subtext}
                      </div>

                      {/* Progress bar */}
                      {isActive && !showStartButton && (
                        <div className="mt-3 w-full bg-gray-800/50 rounded-full h-2 sm:h-2.5 overflow-hidden border border-gray-600/30">
                          <div 
                            className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${isLastStep ? 'bg-gradient-to-r from-green-400 to-green-500' : 'bg-gradient-to-r from-blue-400 to-blue-500'}`}
                            style={{
                              width: `${stepProgress}%`
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Status indicator compacto */}
                    <div className={`w-1 h-1 rounded-full transition-all duration-300 ${
                      isComplete ? 'bg-green-400' : 
                      (isActive && isLastStep) ? 'bg-green-400 animate-pulse' :
                      isActive ? 'bg-blue-400 animate-pulse' : 
                      'bg-gray-600'
                    }`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress bar compacta */}
          <div className="border-t border-gray-600/30 pt-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 font-medium text-xs">Progresso Geral</span>
              <span className="text-lg font-bold text-white">{Math.round(progress)}%</span>
            </div>
            
            <div className="relative h-1 bg-gray-800/50 rounded-full overflow-hidden border border-gray-600/30">
              <div 
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Área de terminal - ultra-compacta */}
          {showStartButton && (
            <div className="mt-3">
              {/* Terminal mobile-first compacto */}
              <div className="bg-black/80 backdrop-blur-sm rounded-lg border border-gray-600/30 p-2 mb-3">
                <div className="flex items-center mb-1">
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-red-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="ml-2 text-xs text-gray-400 font-mono">sistema.terminal</div>
                </div>
                
                {/* Linha de comando compacta */}
                <div className="flex items-center min-h-[16px]">
                  <span className="text-green-400 font-mono text-xs mr-1">$</span>
                  <div className={`font-mono text-xs font-medium ${
                    typingText.includes('ATENÇÃO:') || typingText.includes('BLOQUEIO:') || typingText.includes('PERGUNTA:') ? 'text-red-400' : 
                    typingText === 'FitPerformance está desafiando você...' ? '' : 'text-yellow-400'
                  }`}>
                    {typingText === 'FitPerformance está desafiando você...' ? (
                      <span className="animate-pulse">
                        <span className="text-blue-400 font-bold">FitPerformance</span>
                        <span className="text-white"> está desafiando </span>
                        <span className="text-blue-400 font-bold">você</span>
                        <span className="text-blue-400">...</span>
                      </span>
                    ) : (
                      typingText
                    )}
                    {typingText && typingText !== 'FitPerformance está desafiando você...' && (
                      <span className="animate-pulse text-white">_</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Botão */}
              {typingText === 'FitPerformance está desafiando você...' && (
                <div className="mt-4 animate-fade-in">
                  <button
                    onClick={handleStartAnamnese}
                    className="relative w-full bg-blue-900/30 backdrop-blur-sm border border-blue-400/30 rounded-xl p-5 transition-all duration-300 hover:border-blue-400/60 hover:bg-blue-900/40 hover:scale-[1.02] active:scale-[0.98] group overflow-hidden"
                  >
                    {/* Cantos neon azuis compactos */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-blue-400 transition-all duration-300 group-hover:border-cyan-400"></div>
                    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-blue-400 transition-all duration-300 group-hover:border-cyan-400"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-blue-400 transition-all duration-300 group-hover:border-cyan-400"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blue-400 transition-all duration-300 group-hover:border-cyan-400"></div>
                    
                    {/* Efeito de brilho diagonal */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    
                    {/* Conteúdo do botão */}
                    <div className="relative z-10 flex items-center justify-center space-x-3">
                      <span className="text-red-400 font-bold text-base sm:text-lg uppercase tracking-wider group-hover:text-red-300 transition-colors duration-300">
                        Iniciar Sistema
                      </span>
                      <ChevronRight className="w-5 h-5 text-red-400 group-hover:text-red-300 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                    
                    {/* Linha de energia inferior */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadingFitness;