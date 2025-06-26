import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Star, Target, Clock, Zap, Heart, Brain, Utensils, AlertCircle, CheckCircle2, Users } from 'lucide-react';
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
  const navigate = useNavigate();
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

  const questions: Question[] = useMemo(() => [
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
  ], [femaleProfile]);

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
    const level = getScoreLevel();
    
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-2">
        {/* Background gaming */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-lg mx-auto px-3">
          {/* Logo compacta */}
          <div className="flex justify-center mb-3">
            <ModernFitLogo size={50} variant="icon-only" />
          </div>

          {/* Container de resultado compacto */}
          <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-blue-400/30 p-4 shadow-xl relative overflow-hidden">
            {/* Cantos neon */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-400"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-400"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-400"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-400"></div>

            {/* Conteúdo do resultado compacto */}
            <div className="text-center space-y-3">
              <div className="text-4xl mb-2">🎯</div>
              
              <h2 className="text-xl font-bold text-white mb-1">Perfil Mapeado!</h2>
              
              <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-lg p-3 border border-green-400/30">
                <div className="text-green-400 font-bold text-base mb-1">{level.level}</div>
                <div className="text-gray-300 text-sm">Protocolo nutricional mapeado com sucesso!</div>
              </div>

              {/* Score compacto */}
              <div className="flex items-center justify-center space-x-3 py-2">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{score}</div>
                  <div className="text-xs text-gray-400">Pontos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{streak}</div>
                  <div className="text-xs text-gray-400">Combo</div>
                </div>
              </div>

              {/* Badge compacto */}
              <div className="flex justify-center">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${level.color}`}>
                  <span className="mr-1">{level.emoji}</span>
                  {level.level}
                </div>
              </div>

              {/* Botão de continuar compacto */}
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg border border-green-400/30 mt-4"
              >
                🚀 Acessar Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-2">
      {/* Background gaming */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Particles dinâmicas reduzidas */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
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
        {/* Header compacto com logo e progresso */}
        <div className="mb-3">
          {/* Logo e progresso em uma linha */}
          <div className="flex items-center justify-between mb-2">
            <ModernFitLogo size={40} variant="icon-only" />
            <div className="text-right">
              <div className="text-xs text-gray-400">Questão {currentQuestion + 1} de {questions.length}</div>
              <div className="text-lg font-bold text-white">{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</div>
            </div>
          </div>

          {/* Progress bar compacta */}
          <div className="relative h-1 bg-gray-800/50 rounded-full overflow-hidden border border-gray-600/30">
            <div 
              className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Container principal compacto */}
        <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-blue-400/30 p-3 shadow-xl relative overflow-hidden">
          {/* Cantos neon */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-400"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-400"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-400"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-400"></div>

          {/* Cabeçalho da questão compacto */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center px-2 py-1 bg-blue-500/20 rounded-lg border border-blue-400/30 mb-2">
              <currentQ.icon className="w-3 h-3 text-blue-400 mr-1" />
              <span className="text-xs text-blue-300 font-medium">{currentQ.category}</span>
            </div>
            
            <h2 className="text-lg font-bold text-white mb-1">{currentQ.title}</h2>
            <p className="text-sm text-gray-300 mb-1">{currentQ.subtitle}</p>
            <p className="text-xs text-gray-400">{currentQ.description}</p>
          </div>

          {/* Área das opções/picker compacta */}
          <div className="mb-4">
            {/* Opções múltiplas/simples */}
            {(currentQ.type === 'single' || currentQ.type === 'multiple') && currentQ.options && (
              <div className="space-y-2">
                {currentQ.options.map((option) => {
                  const isSelected = currentQ.type === 'multiple' 
                    ? Array.isArray(selectedAnswer) && selectedAnswer.some(a => a.id === option.id)
                    : selectedAnswer && !Array.isArray(selectedAnswer) && 'id' in selectedAnswer && selectedAnswer.id === option.id;

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleOptionClick(option)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-300 border-2 ${
                        isSelected
                          ? 'border-blue-400 bg-blue-500/20 text-white shadow-lg transform scale-105'
                          : 'border-gray-600/30 bg-gray-800/30 text-gray-300 hover:border-blue-400/50 hover:bg-blue-500/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{option.emoji}</span>
                          <span className="font-medium text-sm">{option.text}</span>
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-blue-400" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Pickers compactos */}
            {(currentQ.type === 'weight_picker' || currentQ.type === 'height_picker' || currentQ.type === 'age_picker') && (
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-1">
                    {pickerValue}{currentQ.unit}
                  </div>
                </div>
                
                <div className="px-2">
                  <input
                    type="range"
                    min={currentQ.type === 'weight_picker' ? currentQ.minWeight : 
                         currentQ.type === 'height_picker' ? currentQ.minHeight : 
                         currentQ.minAge}
                    max={currentQ.type === 'weight_picker' ? currentQ.maxWeight : 
                         currentQ.type === 'height_picker' ? currentQ.maxHeight : 
                         currentQ.maxAge}
                    value={pickerValue}
                    onChange={(e) => setPickerValue(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                  />
                  
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>
                      {currentQ.type === 'weight_picker' ? currentQ.minWeight : 
                       currentQ.type === 'height_picker' ? currentQ.minHeight : 
                       currentQ.minAge}{currentQ.unit}
                    </span>
                    <span>
                      {currentQ.type === 'weight_picker' ? currentQ.maxWeight : 
                       currentQ.type === 'height_picker' ? currentQ.maxHeight : 
                       currentQ.maxAge}{currentQ.unit}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navegação compacta */}
          <div className="flex justify-between items-center pt-3 border-t border-gray-600/30">
            <button
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                currentQuestion === 0
                  ? 'text-gray-600 cursor-not-allowed'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700/30'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm">Voltar</span>
            </button>

            <div className="flex items-center space-x-2">
              {/* Score atual compacto */}
              <div className="text-center px-2">
                <div className="text-lg font-bold text-blue-400">{score}</div>
                <div className="text-xs text-gray-400">Pts</div>
              </div>

              {/* Streak compacto */}
              {streak > 0 && (
                <div className="text-center px-2">
                  <div className="text-lg font-bold text-green-400">{streak}</div>
                  <div className="text-xs text-gray-400">Combo</div>
                </div>
              )}
            </div>

            <button
              onClick={nextQuestion}
              disabled={!selectedAnswer}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                selectedAnswer
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span className="text-sm">
                {currentQuestion === questions.length - 1 ? 'Finalizar' : 'Próxima'}
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionQuizGame;