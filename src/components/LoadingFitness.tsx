import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, TrendingUp, Wifi, CheckCircle, Zap } from 'lucide-react';
import { ModernFitLogo } from './ModernFitLogo';

const LoadingFitness = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < loadingSteps.length - 1) {
        setCurrentStep(currentStep + 1);
        setProgress(((currentStep + 1) / loadingSteps.length) * 100);
      } else {
        // Navigate to nutrition quiz after completion
        setTimeout(() => {
          navigate('/nutrition-quiz');
        }, 3000); // Wait 3 seconds after completion
      }
    }, loadingSteps[currentStep]?.duration || 2000);

    return () => clearTimeout(timer);
  }, [currentStep, navigate, loadingSteps]);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        const targetProgress = ((currentStep + 1) / loadingSteps.length) * 100;
        if (prev < targetProgress) {
          return Math.min(prev + 2, targetProgress);
        }
        return prev;
      });
    }, 50);

    return () => clearInterval(progressTimer);
  }, [currentStep, loadingSteps.length]);

  const isCompleted = currentStep >= loadingSteps.length - 1;
  const isLastStep = currentStep === loadingSteps.length - 1;

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
      {/* Background moderno */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Particles dinâmicas */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
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

      <div className="relative z-10 w-full max-w-3xl mx-auto px-6">
        {/* Logo maior centralizada */}
        <div className="flex justify-center mb-12">
          <ModernFitLogo size={80} variant="icon-only" />
        </div>

        {/* Container principal clean */}
        <div className="bg-black/40 backdrop-blur-sm rounded-2xl border border-blue-400/30 p-8 shadow-xl relative overflow-hidden">
          {/* Cantos em azul neon */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-400"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-400"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-400"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-400"></div>
          {/* Steps de loading clean */}
          <div className="space-y-5 mb-8">
            {loadingSteps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = index === currentStep;
              const isComplete = index < currentStep;
              
              return (
                <div key={index} className={`relative bg-transparent border rounded-lg p-4 transition-all duration-500 ${
                  (isActive && isLastStep) ? 'border-green-400/60 scale-102' :
                  isActive ? 'border-blue-400/60 scale-102' : 
                  isComplete ? 'border-green-400/40 opacity-80' : 
                  'border-gray-600/30 opacity-50'
                }`}>
                  
                  {/* Cantos azul ou verde dependendo do step */}
                  {isActive && (
                    <>
                      <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 ${isLastStep ? 'border-green-400' : 'border-blue-400'}`}></div>
                      <div className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 ${isLastStep ? 'border-green-400' : 'border-blue-400'}`}></div>
                      <div className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 ${isLastStep ? 'border-green-400' : 'border-blue-400'}`}></div>
                      <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 ${isLastStep ? 'border-green-400' : 'border-blue-400'}`}></div>
                    </>
                  )}
                  
                  <div className="flex items-center space-x-4">
                    {/* Ícone simples */}
                    <div className={`relative w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      isComplete 
                        ? 'bg-green-500/20 border border-green-400/50' 
                        : (isActive && isLastStep)
                          ? 'bg-green-500/20 border border-green-400/50'
                        : isActive 
                          ? 'bg-blue-500/20 border border-blue-400/50' 
                          : 'bg-gray-800/30 border border-gray-600/30'
                    }`}>
                      {isComplete ? (
                        <CheckCircle className="w-6 h-6 text-green-400" />
                      ) : (
                        <IconComponent 
                          className={`w-6 h-6 ${(isActive && isLastStep) ? 'text-green-400' : isActive ? 'text-blue-400' : 'text-gray-500'}`}
                        />
                      )}
                    </div>

                    {/* Texto clean */}
                    <div className="flex-1">
                      <div className={`font-semibold text-lg transition-colors duration-300 ${
                        (isActive && isLastStep) ? 'text-green-400' : isActive ? 'text-white' : isComplete ? 'text-green-400' : 'text-gray-400'
                      }`}>
                        {step.text}
                      </div>
                      <div className={`text-sm transition-colors duration-300 ${
                        (isActive && isLastStep) ? 'text-green-300' : isActive ? 'text-blue-300' : 'text-gray-500'
                      }`}>
                        {step.subtext}
                      </div>

                      {/* Progress bar clean */}
                      {isActive && (
                        <div className="mt-3 w-full bg-gray-800/50 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-1.5 rounded-full transition-all duration-300 ${isLastStep ? 'bg-green-400' : 'bg-blue-400'}`}
                            style={{
                              width: `${((Date.now() % step.duration) / step.duration) * 100}%`
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Status indicator clean */}
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
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

          {/* Progress bar clean */}
          <div className="border-t border-gray-600/30 pt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-300 font-medium">Progresso Geral</span>
              <span className="text-2xl font-bold text-white">{Math.round(progress)}%</span>
            </div>
            
            <div className="relative h-3 bg-gray-800/50 rounded-full overflow-hidden border border-gray-600/30">
              <div 
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Card vermelho final */}
          {isCompleted && (
            <div className="mt-6 p-6 bg-red-500/10 border-2 border-red-400/40 rounded-lg relative">
              {/* Cantos vermelhos */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-400"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-400"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-400"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-400"></div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <span className="text-red-400 font-bold text-lg">DESAFIO</span>
                </div>
                <p className="text-white font-semibold text-lg">
                  ATÉ QUE NÍVEL VOCÊ VAI CONSEGUIR<br/>
                  <span className="text-red-400 font-bold">ELEVAR SEU FÍSICO?</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default LoadingFitness;