import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Star, Target, Clock, Zap, Heart, Brain, Utensils, DollarSign, AlertCircle, CheckCircle2, Crown, Users } from 'lucide-react';
import { ModernFitLogo } from './ModernFitLogo';

interface Option {
  id: number;
  text: string;
  emoji: string;
  points: number;
  color: string;
}

interface Question {
  id: number;
  category: string;
  icon: any;
  title: string;
  subtitle: string;
  description: string;
  type: string;
  timeBonus: boolean;
  options?: Option[];
  maxSelections?: number;
  minWeight?: number;
  maxWeight?: number;
  defaultWeight?: number;
  minHeight?: number;
  maxHeight?: number;
  defaultHeight?: number;
  minAge?: number;
  maxAge?: number;
  defaultAge?: number;
  unit?: string;
}

type SelectedAnswer = Option | Option[] | { value: number; points: number } | null;

const NutritionQuizGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: SelectedAnswer}>({});
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  // const [timeLeft, setTimeLeft] = useState(30);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<SelectedAnswer>(null);
  const [pickerValue, setPickerValue] = useState(70);
  
  // Detecta se o perfil é feminino
  const isFemaleProfile = () => {
    const genderAnswer = answers[1]; // Questão 1 é sobre gênero
    return genderAnswer && !Array.isArray(genderAnswer) && 'id' in genderAnswer && genderAnswer.id === 2;
  };
  
  const femaleProfile = isFemaleProfile();

  const questions: Question[] = [
    {
      id: 1,
      category: "IDENTIFICAÇÃO",
      icon: Users,
      title: "👤 PERFIL DO JOGADOR",
      subtitle: "Configure sua identidade no sistema",
      description: "Esta informação é essencial para calibrar seu protocolo pessoal",
      type: "single",
      timeBonus: false,
      options: [
        { id: 1, text: "Masculino", emoji: "♂️", points: 10, color: "from-blue-500 to-cyan-500" },
        { id: 2, text: "Feminino", emoji: "♀️", points: 10, color: "from-pink-500 to-rose-500" },
        { id: 3, text: "Outro", emoji: "👤", points: 10, color: "from-purple-500 to-indigo-500" }
      ]
    },
    {
      id: 2,
      category: "SCAN CORPORAL",
      icon: Target,
      title: "⚖️ MASSA CORPORAL ATUAL",
      subtitle: "Escaneando seu peso atual",
      description: "Base fundamental para calcular suas necessidades energéticas",
      type: "weight_picker",
      timeBonus: false,
      minWeight: 30,
      maxWeight: 200,
      defaultWeight: 70,
      unit: "kg"
    },
    {
      id: 3,
      category: "SCAN CORPORAL",
      icon: Target,
      title: "📏 DIMENSÃO VERTICAL",
      subtitle: "Registrando sua altura",
      description: "Dado crítico para otimizar seu metabolismo basal",
      type: "height_picker",
      timeBonus: false,
      minHeight: 120,
      maxHeight: 220,
      defaultHeight: 170,
      unit: "cm"
    },
    {
      id: 4,
      category: "TEMPORAL",
      icon: Clock,
      title: "🎂 CICLOS BIOLÓGICOS",
      subtitle: "Quantos anos de experiência de vida?",
      description: "Sua idade define diretamente seu perfil metabólico",
      type: "age_picker",
      timeBonus: false,
      minAge: 13,
      maxAge: 100,
      defaultAge: 25
    },
    {
      id: 5,
      category: "MISSÃO PRINCIPAL",
      icon: Target,
      title: "🎯 OBJETIVOS DE HACK",
      subtitle: femaleProfile ? "Qual transformação você quer alcançar?" : "Qual transformação você quer hackear?",
      description: "Escolha até 2 metas para maximizar o foco nos resultados",
      type: "multiple",
      maxSelections: 2,
      timeBonus: true,
      options: femaleProfile ? [
        { id: 1, text: "Tonificar e definir músculos", emoji: "💃", points: 10, color: "from-pink-500 to-rose-500" },
        { id: 2, text: "Queimar gordura localizada", emoji: "🔥", points: 10, color: "from-red-500 to-orange-500" },
        { id: 3, text: "Manter peso ideal", emoji: "⚖️", points: 10, color: "from-green-500 to-emerald-500" },
        { id: 4, text: "Melhorar bem-estar geral", emoji: "✨", points: 10, color: "from-purple-500 to-pink-500" },
        { id: 5, text: "Aumentar energia e disposição", emoji: "⚡", points: 10, color: "from-yellow-500 to-amber-500" },
        { id: 6, text: "Fortalecer o corpo", emoji: "💪", points: 15, color: "from-indigo-500 to-purple-500" }
      ] : [
        { id: 1, text: "Queimar gordura corporal", emoji: "🔥", points: 10, color: "from-red-500 to-orange-500" },
        { id: 2, text: "Construir massa muscular", emoji: "💪", points: 10, color: "from-blue-500 to-purple-500" },
        { id: 3, text: "Manter peso ideal", emoji: "⚖️", points: 10, color: "from-green-500 to-emerald-500" },
        { id: 4, text: "Melhorar saúde geral", emoji: "❤️", points: 10, color: "from-pink-500 to-rose-500" },
        { id: 5, text: "Aumentar energia", emoji: "⚡", points: 10, color: "from-yellow-500 to-amber-500" },
        { id: 6, text: "Performance atlética", emoji: "🏆", points: 15, color: "from-indigo-500 to-blue-500" }
      ]
    },
    {
      id: 6,
      category: "PROTOCOLO ALIMENTAR",
      icon: Utensils,
      title: "🍽️ ESTILO DE ALIMENTAÇÃO",
      subtitle: "Você é vegetariano?",
      description: "Sua preferência alimentar nos ajuda a personalizar suas recomendações",
      type: "single",
      timeBonus: true,
      options: [
        { id: 1, text: "Não, como de tudo", emoji: "🍖", points: 10, color: "from-orange-500 to-red-500" },
        { id: 2, text: "Sim, sou vegetariano", emoji: "🥬", points: 10, color: "from-green-500 to-emerald-500" }
      ]
    },
    {
      id: 7,
      category: "RESTRIÇÕES",
      icon: AlertCircle,
      title: "🚫 LIMITAÇÕES DO SISTEMA",
      subtitle: "Alimentos que seu corpo rejeita?",
      description: "Mapear restrições evita falhas no protocolo",
      type: "multiple",
      maxSelections: 4,
      timeBonus: false,
      options: [
        { id: 1, text: "Lactose", emoji: "🥛", points: 5, color: "from-yellow-500 to-orange-500" },
        { id: 2, text: "Glúten", emoji: "🍞", points: 5, color: "from-orange-500 to-red-500" },
        { id: 3, text: "Oleaginosas", emoji: "🥜", points: 8, color: "from-amber-500 to-yellow-500" },
        { id: 4, text: "Frutos do mar", emoji: "🦐", points: 8, color: "from-blue-500 to-cyan-500" },
        { id: 5, text: "Ovos", emoji: "🥚", points: 8, color: "from-yellow-400 to-amber-400" },
        { id: 6, text: "Sistema sem restrições", emoji: "✅", points: 10, color: "from-green-500 to-emerald-500" }
      ]
    },
    {
      id: 10,
      category: "ARSENAL",
      icon: Heart,
      title: "💊 STACK DE SUPLEMENTOS",
      subtitle: femaleProfile ? "Quais suplementos você utiliza?" : "Qual seu arsenal de suplementos atual?",
      description: femaleProfile ? "Suplementos podem acelerar seus resultados em 300%" : "Suplementos podem acelerar seus resultados em 300%",
      type: "multiple",
      maxSelections: 6,
      timeBonus: false,
      options: [
        { id: 1, text: "Whey Protein", emoji: "🥤", points: 8, color: "from-blue-500 to-cyan-500" },
        { id: 2, text: "Creatina", emoji: "💪", points: 10, color: "from-red-500 to-pink-500" },
        { id: 3, text: "Multivitamínico", emoji: "💊", points: 6, color: "from-yellow-500 to-orange-500" },
        { id: 4, text: "Ômega 3", emoji: "🐟", points: 8, color: "from-blue-400 to-blue-600" },
        { id: 5, text: "BCAA", emoji: "⚡", points: 8, color: "from-purple-500 to-indigo-500" },
        { id: 6, text: "Cafeína/Pré-treino", emoji: "☕", points: 6, color: "from-amber-500 to-orange-500" },
        { id: 7, text: "Arsenal vazio", emoji: "🚫", points: 5, color: "from-gray-500 to-slate-500" }
      ]
    },
    {
      id: 13,
      category: "MOTIVAÇÃO",
      icon: Brain,
      title: "🧠 FATOR DRIVE",
      subtitle: femaleProfile ? "O que mais te motiva a manter uma alimentação equilibrada?" : "O que mais te motiva a manter uma alimentação saudável?",
      description: femaleProfile ? "Conhecer sua motivação aumenta sua taxa de sucesso em 400%" : "Conhecer sua motivação aumenta sua taxa de sucesso em 400%",
      type: "single",
      timeBonus: true,
      options: [
        ...(femaleProfile ? [
          { id: 1, text: "Bem-estar e autoestima", emoji: "✨", points: 14, color: "from-pink-500 to-rose-500" },
          { id: 2, text: "Saúde e longevidade", emoji: "🌿", points: 15, color: "from-green-500 to-emerald-500" },
          { id: 3, text: "Energia para o dia a dia", emoji: "⚡", points: 12, color: "from-yellow-500 to-amber-500" },
          { id: 4, text: "Confiança e autoestima", emoji: "👑", points: 14, color: "from-purple-500 to-pink-500" },
          { id: 5, text: "Exemplo para família", emoji: "❤️", points: 16, color: "from-red-500 to-pink-500" },
          { id: 6, text: "Qualidade de vida", emoji: "🌸", points: 12, color: "from-pink-400 to-rose-400" }
        ] : [
          { id: 1, text: "Estética corporal", emoji: "💎", points: 10, color: "from-pink-500 to-rose-500" },
          { id: 2, text: "Saúde e longevidade", emoji: "🌿", points: 15, color: "from-green-500 to-emerald-500" },
          { id: 3, text: "Performance esportiva", emoji: "🏆", points: 12, color: "from-yellow-500 to-amber-500" },
          { id: 4, text: "Energia e disposição", emoji: "⚡", points: 12, color: "from-blue-500 to-cyan-500" },
          { id: 5, text: "Autoestima e confiança", emoji: "👑", points: 14, color: "from-purple-500 to-indigo-500" },
          { id: 6, text: "Exemplo para família", emoji: "❤️", points: 16, color: "from-red-500 to-pink-500" }
        ])
      ]
    }
  ];

  useEffect(() => {
    const currentQ = questions[currentQuestion];
    
    if (currentQ.type === 'weight_picker' && currentQ.defaultWeight) {
      setPickerValue(currentQ.defaultWeight);
      setSelectedAnswer({ value: currentQ.defaultWeight, points: 10 });
    } else if (currentQ.type === 'height_picker' && currentQ.defaultHeight) {
      setPickerValue(currentQ.defaultHeight);
      setSelectedAnswer({ value: currentQ.defaultHeight, points: 10 });
    } else if (currentQ.type === 'age_picker' && currentQ.defaultAge) {
      setPickerValue(currentQ.defaultAge);
      setSelectedAnswer({ value: currentQ.defaultAge, points: 10 });
    }
  }, [currentQuestion]);



  const handleAnswerSelect = () => {
    const currentQ = questions[currentQuestion];
    if (!selectedAnswer || (Array.isArray(selectedAnswer) && selectedAnswer.length === 0)) return;

    let questionScore = 0;
    if (currentQ.type === 'multiple' && Array.isArray(selectedAnswer)) {
      questionScore = selectedAnswer.reduce((sum: number, ans: Option) => sum + ans.points, 0);
    } else if (!Array.isArray(selectedAnswer) && 'points' in selectedAnswer) {
      questionScore = selectedAnswer.points;
    }

    setStreak(streak + 1);

    if (streak >= 2) {
      questionScore += streak * 2;
    }

    setScore(score + questionScore);
    setAnswers({ ...answers, [currentQ.id]: selectedAnswer });
    
    // Ir para próxima questão imediatamente
    nextQuestion();
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      
      const nextQ = questions[currentQuestion + 1];
      if (nextQ.type === 'weight_picker' && nextQ.defaultWeight) {
        setPickerValue(nextQ.defaultWeight);
      } else if (nextQ.type === 'height_picker' && nextQ.defaultHeight) {
        setPickerValue(nextQ.defaultHeight);
      } else if (nextQ.type === 'age_picker' && nextQ.defaultAge) {
        setPickerValue(nextQ.defaultAge);
      }
    } else {
      setIsCompleted(true);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      
      const prevQ = questions[currentQuestion - 1];
      const prevAnswer = answers[prevQ.id];
      setSelectedAnswer(prevAnswer || null);
      
      if (prevQ.type === 'weight_picker' && prevAnswer && !Array.isArray(prevAnswer) && 'value' in prevAnswer) {
        setPickerValue(prevAnswer.value);
      } else if (prevQ.type === 'height_picker' && prevAnswer && !Array.isArray(prevAnswer) && 'value' in prevAnswer) {
        setPickerValue(prevAnswer.value);
      } else if (prevQ.type === 'age_picker' && prevAnswer && !Array.isArray(prevAnswer) && 'value' in prevAnswer) {
        setPickerValue(prevAnswer.value);
      } else if (prevQ.type === 'weight_picker' && prevQ.defaultWeight) {
        setPickerValue(prevQ.defaultWeight);
      } else if (prevQ.type === 'height_picker' && prevQ.defaultHeight) {
        setPickerValue(prevQ.defaultHeight);
      } else if (prevQ.type === 'age_picker' && prevQ.defaultAge) {
        setPickerValue(prevQ.defaultAge);
      }
    }
  };


  const handleOptionClick = (option: Option) => {
    const currentQ = questions[currentQuestion];
    
    if (currentQ.type === 'single') {
      setSelectedAnswer(option);
    } else {
      const currentSelections = (Array.isArray(selectedAnswer) ? selectedAnswer : []) as Option[];
      const isSelected = currentSelections.some((item: Option) => item.id === option.id);
      
      if (isSelected) {
        setSelectedAnswer(currentSelections.filter((item: Option) => item.id !== option.id));
      } else if (currentQ.maxSelections && currentSelections.length < currentQ.maxSelections) {
        setSelectedAnswer([...currentSelections, option]);
      }
    }
  };

  const getScoreLevel = () => {
    if (score >= 120) return { level: "ELITE NUTRITIONIST", emoji: "👑", color: "text-yellow-400" };
    if (score >= 100) return { level: "NUTRITION MASTER", emoji: "🏆", color: "text-orange-400" };
    if (score >= 80) return { level: "HEALTH WARRIOR", emoji: "⚔️", color: "text-purple-400" };
    if (score >= 60) return { level: "WELLNESS SEEKER", emoji: "🌟", color: "text-blue-400" };
    return { level: "NUTRITION ROOKIE", emoji: "🌱", color: "text-green-400" };
  };

  if (isCompleted) {
    const scoreLevel = getScoreLevel();
    return (
      <div className="min-h-screen gaming-bg relative overflow-hidden flex items-center justify-center p-4">
        {/* Background gaming */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-lg w-full">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <ModernFitLogo size={60} variant="icon-only" />
          </div>

          {/* Container gaming */}
          <div className="gaming-card rounded-2xl p-8 energy-border cyber-border">
            {/* Cantos azul neon */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-400"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-blue-400"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-blue-400"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-blue-400"></div>

            <div className="text-center">
              <div className="text-6xl mb-4">{scoreLevel.emoji}</div>
              <h2 className={`text-2xl font-cyber font-bold ${scoreLevel.color} mb-2 neon-text`}>
                {scoreLevel.level}
              </h2>
              <div className="text-4xl font-gaming font-bold text-white mb-4 digital-glitch">
                {score} PONTOS
              </div>
              <div className="text-gray-300 mb-6">
                Protocolo nutricional mapeado com sucesso!<br/>
                <span className="text-blue-400">Seu perfil foi hackeado.</span>
              </div>
              
              <div className="space-y-4">
                <div className="gaming-card p-4 bg-gradient-to-r from-green-500/10 via-green-400/15 to-green-500/10 border-2 border-green-400/50 rounded-xl">
                  <div className="flex items-center justify-center space-x-2 text-green-400">
                    <CheckCircle2 size={20} />
                    <span className="font-cyber font-bold">PLANO PERSONALIZADO GERADO!</span>
                  </div>
                </div>
                
                <button className="w-full btn-special text-xl font-gaming py-4 rounded-xl">
                  <span className="relative z-30">
                    ACESSAR MEU PROTOCOLO
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="h-screen gaming-bg relative overflow-hidden flex flex-col p-3 sm:p-4">
      {/* Background gaming */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-2xl w-full mx-auto flex flex-col h-full">
        {/* Container principal gaming */}
        <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-3 sm:p-4 border border-slate-600/40 shadow-2xl relative flex-1 flex flex-col min-h-0">
          {/* Cantos sutis */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-slate-400/60"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-slate-400/60"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-slate-400/60"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-slate-400/60"></div>

          {/* Header gaming */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-2 sm:mb-3 gap-2 sm:gap-0 flex-shrink-0">
            <div className="flex items-center space-x-3">
              <ModernFitLogo size={40} variant="icon-only" className="sm:hidden" />
              <ModernFitLogo size={48} variant="icon-only" className="hidden sm:block" />
              <div>
                <div className={`text-xs uppercase tracking-wide font-cyber font-bold ${femaleProfile ? 'text-pink-300' : 'text-blue-300'}`}>{currentQ.category}</div>
                <div className="text-white font-gaming font-bold text-sm sm:text-base">{currentQuestion + 1} de {questions.length}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="bg-amber-500/15 border border-amber-400/30 rounded-md px-2 py-1 flex items-center space-x-1">
                <Star className="w-3 h-3 text-amber-400" />
                <span className="text-amber-200 font-bold font-gaming text-sm">{score}</span>
              </div>
              
              {streak > 0 && (
                <div className="bg-orange-500/15 border border-orange-400/30 rounded-md px-2 py-1 flex items-center space-x-1 text-orange-300">
                  <Zap className="w-3 h-3" />
                  <span className="font-bold font-gaming text-sm">{streak}x</span>
                </div>
              )}
            </div>
          </div>

          {/* Progress Bar gaming */}
          <div className="mb-3 flex-shrink-0">
            <div className="flex justify-between items-center mb-2">
              <span className={`font-cyber font-bold text-xs ${femaleProfile ? 'text-pink-300' : 'text-blue-300'}`}>PROGRESSO</span>
              <span className="text-white font-gaming font-bold text-sm">{Math.round(progress)}%</span>
            </div>
            <div className={`relative h-2 bg-gray-800/40 rounded-lg overflow-hidden border ${femaleProfile ? 'border-pink-400/30' : 'border-blue-400/30'}`}>
              <div 
                className={`absolute inset-0 rounded-lg transition-all duration-500 ease-out ${femaleProfile ? 'bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500' : 'bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500'}`}
                style={{ width: `${progress}%` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
            </div>
          </div>

          {/* Question gaming */}
          <div className="mb-3 bg-slate-800/30 rounded-lg p-3 border border-slate-600/30 flex-shrink-0">
            <h2 className="text-lg sm:text-xl font-cyber font-bold text-white mb-2 leading-tight">{currentQ.title}</h2>
            <p className="text-sm sm:text-base text-slate-200 mb-2 font-semibold">{currentQ.subtitle}</p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{currentQ.description}</p>
            
            {currentQ.type === 'multiple' && (
              <div className="mt-2 bg-amber-500/15 border border-amber-400/30 rounded-md p-2 flex items-center space-x-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span className="text-amber-200 font-cyber font-bold text-xs">Selecione até {currentQ.maxSelections} opções</span>
              </div>
            )}
          </div>

          {/* Content Area - Scrollable */}
          <div className="flex-1 overflow-y-auto min-h-0 mb-3">
            {/* Gaming Sliders com visual mais avançado */}
            {currentQ.type === 'weight_picker' || currentQ.type === 'height_picker' || currentQ.type === 'age_picker' ? (
              <div className="mb-4 bg-gray-900/80 backdrop-blur-xl rounded-2xl p-8 border-2 border-cyan-400/30 relative overflow-hidden shadow-2xl">
                {/* Cantos gaming neon */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400"></div>

                {/* Background pattern gaming */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-500/20"></div>
                  <div className="absolute top-4 left-4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <div className="absolute top-6 right-8 w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute bottom-8 left-6 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                {/* Header gaming */}
                <div className="text-center mb-8 relative z-10">
                  <div className={`text-xs uppercase tracking-widest font-bold mb-3 ${femaleProfile ? 'text-pink-300' : 'text-cyan-300'} font-mono`}>
                    {currentQ.type === 'weight_picker' ? '⚖️ SCAN PESO CORPORAL' : 
                     currentQ.type === 'height_picker' ? '📏 SCAN ALTURA FÍSICA' : 
                     '🎂 ANÁLISE TEMPORAL'}
                  </div>
                  
                  {/* Display valor principal com efeito neon */}
                  <div className="relative">
                    <div className={`text-6xl font-black text-white mb-2 font-mono tracking-wider filter drop-shadow-lg ${
                      femaleProfile ? 'text-pink-400' : 'text-cyan-400'
                    }`} style={{
                      textShadow: `0 0 20px ${femaleProfile ? '#ec4899' : '#06b6d4'}, 0 0 40px ${femaleProfile ? '#ec489950' : '#06b6d450'}`
                    }}>
                      {pickerValue}
                    </div>
                    <div className={`text-lg font-bold ${femaleProfile ? 'text-pink-300' : 'text-cyan-300'} font-mono tracking-wide`}>
                      {currentQ.type === 'weight_picker' ? 'QUILOS' : 
                       currentQ.type === 'height_picker' ? 'CENTÍMETROS' : 
                       'ANOS'}
                    </div>
                  </div>
                </div>

                {/* Slider gaming customizado */}
                <div className="relative z-10">
                  {/* Background track gaming */}
                  <div className="relative h-4 mb-6">
                    <div className="absolute inset-0 bg-gray-800/50 rounded-full border border-gray-600/30"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-700/30 via-gray-600/30 to-gray-700/30 rounded-full"></div>
                    
                    {/* Progress track com gradiente gaming */}
                    <div 
                      className={`absolute top-0 left-0 h-4 rounded-full border-2 transition-all duration-300 ${
                        femaleProfile 
                          ? 'bg-gradient-to-r from-pink-500 via-pink-400 to-rose-400 border-pink-300/50 shadow-lg shadow-pink-500/30' 
                          : 'bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-400 border-cyan-300/50 shadow-lg shadow-cyan-500/30'
                      }`}
                      style={{ 
                        width: `${((pickerValue - (currentQ.type === 'weight_picker' ? (currentQ.minWeight || 30) : 
                                 currentQ.type === 'height_picker' ? (currentQ.minHeight || 120) : 
                                 (currentQ.minAge || 13))) / 
                                ((currentQ.type === 'weight_picker' ? (currentQ.maxWeight || 200) : 
                                  currentQ.type === 'height_picker' ? (currentQ.maxHeight || 220) : 
                                  (currentQ.maxAge || 100)) - 
                                 (currentQ.type === 'weight_picker' ? (currentQ.minWeight || 30) : 
                                  currentQ.type === 'height_picker' ? (currentQ.minHeight || 120) : 
                                  (currentQ.minAge || 13)))) * 100}%`,
                        boxShadow: `0 0 20px ${femaleProfile ? '#ec489950' : '#06b6d450'}`
                      }}
                    />

                    {/* Slider input invisível por cima */}
                    <input
                      type="range"
                      min={currentQ.type === 'weight_picker' ? (currentQ.minWeight || 30) : 
                           currentQ.type === 'height_picker' ? (currentQ.minHeight || 120) : 
                           (currentQ.minAge || 13)}
                      max={currentQ.type === 'weight_picker' ? (currentQ.maxWeight || 200) : 
                           currentQ.type === 'height_picker' ? (currentQ.maxHeight || 220) : 
                           (currentQ.maxAge || 100)}
                      value={pickerValue}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const newValue = parseInt(e.target.value);
                        setPickerValue(newValue);
                        setSelectedAnswer({ value: newValue, points: 10 });
                      }}
                      className="absolute inset-0 w-full h-4 opacity-0 cursor-pointer z-10"
                    />

                    {/* Thumb customizado */}
                    <div 
                      className={`absolute top-1/2 w-8 h-8 rounded-full border-4 transition-all duration-300 transform -translate-y-1/2 pointer-events-none z-20 ${
                        femaleProfile 
                          ? 'bg-pink-400 border-pink-200 shadow-lg shadow-pink-500/50' 
                          : 'bg-cyan-400 border-cyan-200 shadow-lg shadow-cyan-500/50'
                      }`}
                      style={{ 
                        left: `calc(${((pickerValue - (currentQ.type === 'weight_picker' ? (currentQ.minWeight || 30) : 
                                       currentQ.type === 'height_picker' ? (currentQ.minHeight || 120) : 
                                       (currentQ.minAge || 13))) / 
                                      ((currentQ.type === 'weight_picker' ? (currentQ.maxWeight || 200) : 
                                        currentQ.type === 'height_picker' ? (currentQ.maxHeight || 220) : 
                                        (currentQ.maxAge || 100)) - 
                                       (currentQ.type === 'weight_picker' ? (currentQ.minWeight || 30) : 
                                        currentQ.type === 'height_picker' ? (currentQ.minHeight || 120) : 
                                        (currentQ.minAge || 13)))) * 100}% - 16px)`,
                        boxShadow: `0 0 15px ${femaleProfile ? '#ec4899' : '#06b6d4'}`
                      }}
                    >
                      <div className={`w-2 h-2 rounded-full ${femaleProfile ? 'bg-pink-200' : 'bg-cyan-200'} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}></div>
                    </div>
                  </div>

                  {/* Labels gaming nos extremos */}
                  <div className="flex justify-between items-center text-sm font-mono">
                    <div className="text-center">
                      <div className={`px-3 py-1 rounded-lg border ${femaleProfile ? 'bg-pink-500/20 border-pink-400/30 text-pink-300' : 'bg-cyan-500/20 border-cyan-400/30 text-cyan-300'}`}>
                        MIN: {currentQ.type === 'weight_picker' ? (currentQ.minWeight || 30) : 
                              currentQ.type === 'height_picker' ? (currentQ.minHeight || 120) : 
                              (currentQ.minAge || 13)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`px-3 py-1 rounded-lg border ${femaleProfile ? 'bg-pink-500/20 border-pink-400/30 text-pink-300' : 'bg-cyan-500/20 border-cyan-400/30 text-cyan-300'}`}>
                        MAX: {currentQ.type === 'weight_picker' ? (currentQ.maxWeight || 200) : 
                              currentQ.type === 'height_picker' ? (currentQ.maxHeight || 220) : 
                              (currentQ.maxAge || 100)}
                      </div>
                    </div>
                  </div>

                  {/* Status bar gaming */}
                  <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-600/30">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-gray-400">STATUS DO SCAN:</span>
                      <span className={`font-bold ${femaleProfile ? 'text-pink-400' : 'text-cyan-400'}`}>
                        {currentQ.type === 'weight_picker' ? '⚖️ CALIBRANDO MASSA' : 
                         currentQ.type === 'height_picker' ? '📏 MEDINDO ALTURA' : 
                         '🎂 ANALISANDO IDADE'}
                      </span>
                    </div>
                    <div className="mt-2 flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`h-1 w-full rounded-full transition-all duration-300 ${
                            i < 4 ? (femaleProfile ? 'bg-pink-400' : 'bg-cyan-400') : 'bg-gray-600'
                          }`}
                          style={{ animationDelay: `${i * 0.2}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
              {currentQ.options?.map((option) => {
                const isSelected = currentQ.type === 'single' 
                  ? !Array.isArray(selectedAnswer) && selectedAnswer && 'id' in selectedAnswer && selectedAnswer.id === option.id
                  : Array.isArray(selectedAnswer) && selectedAnswer.some((item: Option) => item.id === option.id);

                return (
                  <button
                    key={option.id}
                    onClick={() => handleOptionClick(option)}
                    disabled={false}
                    className={`relative bg-slate-800/60 backdrop-blur-sm border-2 rounded-xl p-4 transition-all duration-300 transform hover:scale-[1.02] shadow-lg ${
                      isSelected 
                        ? (option.id === 2 && currentQ.id === 1 
                           ? 'border-pink-400 bg-pink-500/20 shadow-pink-500/25' 
                           : 'border-blue-400 bg-blue-500/20 shadow-blue-500/25')
                        : `border-slate-500/50 ${femaleProfile ? 'hover:border-pink-400/70 hover:bg-pink-500/10 hover:shadow-pink-500/10' : 'hover:border-blue-400/70 hover:bg-blue-500/10 hover:shadow-blue-500/10'}`
                    } cursor-pointer`}
                  >
                    {/* Cantos coloridos quando selecionado */}
                    {isSelected && (
                      <>
                        <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 ${
                          (option.id === 2 && currentQ.id === 1) || femaleProfile ? 'border-pink-400' : 'border-blue-400'
                        }`}></div>
                        <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 ${
                          (option.id === 2 && currentQ.id === 1) || femaleProfile ? 'border-pink-400' : 'border-blue-400'
                        }`}></div>
                        <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 ${
                          (option.id === 2 && currentQ.id === 1) || femaleProfile ? 'border-pink-400' : 'border-blue-400'
                        }`}></div>
                        <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 ${
                          (option.id === 2 && currentQ.id === 1) || femaleProfile ? 'border-pink-400' : 'border-blue-400'
                        }`}></div>
                      </>
                    )}
                    
                    <div className="flex items-center space-x-4">
                      {/* Emoji com fundo */}
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl border-2 transition-all ${
                        isSelected 
                          ? (option.id === 2 && currentQ.id === 1 
                             ? 'bg-pink-500/30 border-pink-400' 
                             : 'bg-blue-500/30 border-blue-400')
                          : 'bg-slate-700/50 border-slate-500/30'
                      }`}>
                        {option.emoji}
                      </div>
                      
                      {/* Texto principal */}
                      <div className="flex-1 text-left">
                        <div className="text-white font-bold text-base sm:text-lg mb-2 leading-tight">{option.text}</div>
                        <div className={`text-sm font-gaming font-bold ${
                          (isSelected && option.id === 2 && currentQ.id === 1) || (isSelected && femaleProfile)
                            ? 'text-pink-300' 
                            : 'text-blue-300'
                        }`}>+{option.points} pontos</div>
                      </div>
                      
                      {/* Indicador de seleção */}
                      <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected 
                          ? ((option.id === 2 && currentQ.id === 1) || femaleProfile
                             ? 'border-pink-400 bg-pink-400 shadow-lg shadow-pink-400/50' 
                             : 'border-blue-400 bg-blue-400 shadow-lg shadow-blue-400/50')
                          : `border-slate-400 ${femaleProfile ? 'hover:border-pink-400/70' : 'hover:border-blue-400/70'}`
                      }`}>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
              </div>
            )}
          </div>

          {/* Action Buttons gaming */}
          <div className="flex flex-col sm:flex-row gap-2 sm:justify-between items-center flex-shrink-0">
            {/* Botão Voltar */}
            <button
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
              className="w-full sm:w-auto bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 text-white font-gaming font-bold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg text-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>VOLTAR</span>
            </button>
            
            {/* Botão Principal */}
            <button
              onClick={handleAnswerSelect}
              disabled={!selectedAnswer || (Array.isArray(selectedAnswer) && selectedAnswer.length === 0)}
              className={`w-full sm:w-auto text-white font-gaming font-bold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg text-sm ${femaleProfile ? 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-pink-500/25' : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-blue-500/25'} disabled:from-gray-600 disabled:to-gray-700`}
            >
              <span className="text-center">{currentQuestion === questions.length - 1 ? 'FINALIZAR' : 'PRÓXIMO'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionQuizGame;