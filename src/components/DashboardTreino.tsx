import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModernFitLogo } from './ModernFitLogo';
import { 
  ArrowLeft, 
  Dumbbell, 
  Clock, 
  Target, 
  Flame, 
  Trophy, 
  CheckCircle, 
  Circle,
  Play,
  Zap,
  Star,
  Calendar,
  TrendingUp
} from 'lucide-react';

interface Workout {
  id: number;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  calories: number;
  exercises: number;
  fitCoinsReward: number;
  completed: boolean;
  category: string;
  muscleGroups: string[];
  equipment: string[];
  dayOfWeek: string;
}

interface DaySchedule {
  day: string;
  dayShort: string;
  workouts: Workout[];
  totalCalories: number;
  totalFitCoins: number;
}

const DashboardTreino = () => {
  const navigate = useNavigate();
  const [fitCoins, setFitCoins] = useState(2450);
  const [completedToday, setCompletedToday] = useState(1);
  const [streak, setStreak] = useState(15);
  const [selectedDay, setSelectedDay] = useState('Segunda-feira');

  const allWorkouts: Workout[] = [
    // Segunda-feira - Peito e Tríceps
    {
      id: 1,
      title: "Peito Explosivo",
      description: "Treino focado no desenvolvimento do peitoral",
      duration: "45 min",
      difficulty: "Intermediário",
      calories: 320,
      exercises: 8,
      fitCoinsReward: 180,
      completed: true,
      category: "Força",
      muscleGroups: ["Peito", "Tríceps"],
      equipment: ["Halteres", "Barra"],
      dayOfWeek: "Segunda-feira"
    },
    {
      id: 2,
      title: "Cardio Matinal",
      description: "Aquecimento cardiovascular para começar a semana",
      duration: "20 min",
      difficulty: "Iniciante",
      calories: 180,
      exercises: 5,
      fitCoinsReward: 100,
      completed: false,
      category: "Cardio",
      muscleGroups: ["Corpo todo"],
      equipment: ["Peso corporal"],
      dayOfWeek: "Segunda-feira"
    },

    // Terça-feira - Costas e Bíceps
    {
      id: 3,
      title: "Costas Forte",
      description: "Desenvolvimento da musculatura das costas",
      duration: "50 min",
      difficulty: "Avançado",
      calories: 380,
      exercises: 10,
      fitCoinsReward: 220,
      completed: false,
      category: "Força",
      muscleGroups: ["Costas", "Bíceps"],
      equipment: ["Halteres", "Barra", "Polia"],
      dayOfWeek: "Terça-feira"
    },
    {
      id: 4,
      title: "Core Power",
      description: "Fortalecimento do núcleo corporal",
      duration: "25 min",
      difficulty: "Intermediário",
      calories: 200,
      exercises: 6,
      fitCoinsReward: 120,
      completed: false,
      category: "Core",
      muscleGroups: ["Abdômen", "Lombar"],
      equipment: ["Peso corporal"],
      dayOfWeek: "Terça-feira"
    },

    // Quarta-feira - Pernas
    {
      id: 5,
      title: "Pernas Explosivas",
      description: "Treino intenso para membros inferiores",
      duration: "55 min",
      difficulty: "Avançado",
      calories: 450,
      exercises: 12,
      fitCoinsReward: 250,
      completed: false,
      category: "Pernas",
      muscleGroups: ["Quadríceps", "Glúteos", "Panturrilhas"],
      equipment: ["Halteres", "Barra"],
      dayOfWeek: "Quarta-feira"
    },

    // Quinta-feira - Ombros e Trapézio
    {
      id: 6,
      title: "Ombros Definidos",
      description: "Desenvolvimento dos deltoides e trapézio",
      duration: "40 min",
      difficulty: "Intermediário",
      calories: 280,
      exercises: 8,
      fitCoinsReward: 160,
      completed: false,
      category: "Força",
      muscleGroups: ["Ombros", "Trapézio"],
      equipment: ["Halteres"],
      dayOfWeek: "Quinta-feira"
    },
    {
      id: 7,
      title: "HIIT Intenso",
      description: "Treino intervalado de alta intensidade",
      duration: "30 min",
      difficulty: "Avançado",
      calories: 400,
      exercises: 6,
      fitCoinsReward: 200,
      completed: false,
      category: "Cardio",
      muscleGroups: ["Corpo todo"],
      equipment: ["Peso corporal"],
      dayOfWeek: "Quinta-feira"
    },

    // Sexta-feira - Braços
    {
      id: 8,
      title: "Braços Definidos",
      description: "Foco total em bíceps e tríceps",
      duration: "35 min",
      difficulty: "Intermediário",
      calories: 240,
      exercises: 9,
      fitCoinsReward: 140,
      completed: false,
      category: "Força",
      muscleGroups: ["Bíceps", "Tríceps"],
      equipment: ["Halteres"],
      dayOfWeek: "Sexta-feira"
    },

    // Sábado - Funcional
    {
      id: 9,
      title: "Treino Funcional",
      description: "Exercícios funcionais para o dia a dia",
      duration: "40 min",
      difficulty: "Intermediário",
      calories: 300,
      exercises: 7,
      fitCoinsReward: 170,
      completed: false,
      category: "Funcional",
      muscleGroups: ["Corpo todo"],
      equipment: ["Peso corporal", "TRX"],
      dayOfWeek: "Sábado"
    },

    // Domingo - Yoga/Alongamento
    {
      id: 10,
      title: "Yoga Relaxante",
      description: "Alongamento e relaxamento para recuperação",
      duration: "30 min",
      difficulty: "Iniciante",
      calories: 120,
      exercises: 10,
      fitCoinsReward: 80,
      completed: false,
      category: "Flexibilidade",
      muscleGroups: ["Corpo todo"],
      equipment: ["Tapete de yoga"],
      dayOfWeek: "Domingo"
    }
  ];

  const [workoutList, setWorkoutList] = useState(allWorkouts);

  // Organizar treinos por dia da semana
  const daysOfWeek = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];
  
  const weekSchedule: DaySchedule[] = daysOfWeek.map(day => {
    const dayWorkouts = workoutList.filter(workout => workout.dayOfWeek === day);
    return {
      day,
      dayShort: day.substring(0, 3).toUpperCase(),
      workouts: dayWorkouts,
      totalCalories: dayWorkouts.reduce((sum, workout) => sum + workout.calories, 0),
      totalFitCoins: dayWorkouts.reduce((sum, workout) => sum + workout.fitCoinsReward, 0)
    };
  });

  const selectedDayWorkouts = workoutList.filter(workout => workout.dayOfWeek === selectedDay);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Iniciante': return 'from-green-500 to-green-600';
      case 'Intermediário': return 'from-yellow-500 to-orange-500';
      case 'Avançado': return 'from-red-500 to-red-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Cardio': return Flame;
      case 'Força': return Dumbbell;
      case 'Core': return Target;
      case 'Pernas': return TrendingUp;
      case 'Flexibilidade': return Star;
      default: return Dumbbell;
    }
  };

  const completeWorkout = (workoutId: number) => {
    setWorkoutList(prev => prev.map(workout => {
      if (workout.id === workoutId && !workout.completed) {
        setFitCoins(current => current + workout.fitCoinsReward);
        setCompletedToday(current => current + 1);
        return { ...workout, completed: true };
      }
      return workout;
    }));
  };

  const selectedDayStats = {
    completed: selectedDayWorkouts.filter(w => w.completed).length,
    total: selectedDayWorkouts.length,
    calories: selectedDayWorkouts.filter(w => w.completed).reduce((sum, w) => sum + w.calories, 0),
    fitCoinsEarned: selectedDayWorkouts.filter(w => w.completed).reduce((sum, w) => sum + w.fitCoinsReward, 0),
    totalCalories: selectedDayWorkouts.reduce((sum, w) => sum + w.calories, 0),
    totalFitCoins: selectedDayWorkouts.reduce((sum, w) => sum + w.fitCoinsReward, 0)
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background com gradiente e efeitos */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
      </div>

      {/* Particles dinâmicas */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
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

      {/* Container principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="pt-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 hover:border-blue-500/50 transition-all"
              >
                <ArrowLeft className="w-5 h-5 text-gray-300" />
              </button>
              <ModernFitLogo size={40} variant="icon-only" />
              <div>
                <h1 className="text-2xl font-bold text-white">Centro de Treinos</h1>
                <p className="text-sm text-gray-400">Sua jornada fitness começa aqui</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* FitCoins Display */}
              <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-lg px-4 py-2 flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center animate-pulse">
                  <img src="/fitcoin.png" alt="FitCoin" className="w-7 h-7" />
                </div>
                <span className="text-xl font-bold text-yellow-400">{fitCoins.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Seletor de Dias da Semana */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-blue-400" />
            Cronograma Semanal
          </h2>
          
          <div className="grid grid-cols-7 gap-2 mb-6">
            {weekSchedule.map((daySchedule) => (
              <button
                key={daySchedule.day}
                onClick={() => setSelectedDay(daySchedule.day)}
                className={`p-3 rounded-xl transition-all duration-300 border-2 ${
                  selectedDay === daySchedule.day
                    ? 'bg-blue-600/20 border-blue-400/60 transform scale-105'
                    : 'bg-black/40 border-gray-600/30 hover:border-blue-400/30 hover:bg-blue-600/10'
                } backdrop-blur-sm`}
              >
                <div className="text-center">
                  <div className={`text-sm font-bold ${
                    selectedDay === daySchedule.day ? 'text-blue-400' : 'text-gray-300'
                  }`}>
                    {daySchedule.dayShort}
                  </div>
                  <div className={`text-xs ${
                    selectedDay === daySchedule.day ? 'text-blue-300' : 'text-gray-400'
                  }`}>
                    {daySchedule.workouts.length} treino{daySchedule.workouts.length !== 1 ? 's' : ''}
                  </div>
                  {daySchedule.workouts.length > 0 && (
                    <div className="flex justify-center mt-1">
                      <img src="/fitcoin.png" alt="FitCoin" className="w-3 h-3" />
                      <span className={`text-xs ml-1 ${
                        selectedDay === daySchedule.day ? 'text-yellow-400' : 'text-yellow-300'
                      }`}>
                        {daySchedule.totalFitCoins}
                      </span>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Stats do Dia Selecionado */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-white mb-4">{selectedDay} - Resumo</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-blue-400/30 p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{selectedDayStats.completed}/{selectedDayStats.total}</div>
                  <div className="text-xs text-gray-400">Concluídos</div>
                </div>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-blue-400/30 p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{selectedDayStats.totalCalories}</div>
                  <div className="text-xs text-gray-400">Calorias Total</div>
                </div>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-blue-400/30 p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                  <img src="/fitcoin.png" alt="FitCoin" className="w-10 h-10" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{selectedDayStats.totalFitCoins}</div>
                  <div className="text-xs text-gray-400">FC Possíveis</div>
                </div>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-blue-400/30 p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{selectedDayStats.fitCoinsEarned}</div>
                  <div className="text-xs text-gray-400">FC Ganhos</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Treinos do Dia Selecionado */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <Dumbbell className="w-6 h-6 mr-2 text-blue-400" />
            Treinos de {selectedDay}
          </h2>
          
          {selectedDayWorkouts.length === 0 ? (
            <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-gray-600/30 p-8 text-center">
              <div className="text-gray-400 mb-2">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              </div>
              <h3 className="text-lg font-semibold text-gray-300 mb-2">Nenhum treino agendado</h3>
              <p className="text-gray-400">Este dia está livre para descanso ou atividades extras!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {selectedDayWorkouts.map((workout) => {
              const IconComponent = getCategoryIcon(workout.category);
              
              return (
                <div key={workout.id} className="bg-black/40 backdrop-blur-sm rounded-xl border border-blue-400/30 p-6 relative overflow-hidden group">
                  {/* Status indicator */}
                  <div className="absolute top-4 right-4">
                    {workout.completed ? (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400" />
                    )}
                  </div>

                  {/* Header do treino */}
                  <div className="flex items-start space-x-4 mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${getDifficultyColor(workout.difficulty)} rounded-xl flex items-center justify-center`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">{workout.title}</h3>
                      <p className="text-sm text-gray-400 mb-2">{workout.description}</p>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{workout.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Flame className="w-3 h-3" />
                          <span>{workout.calories} kcal</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Target className="w-3 h-3" />
                          <span>{workout.exercises} exercícios</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recompensa */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center">
                        <img src="/fitcoin.png" alt="FitCoin" className="w-5 h-5" />
                      </div>
                      <span className="text-lg font-bold text-yellow-400">+{workout.fitCoinsReward}</span>
                      <span className="text-xs text-gray-400">ao completar</span>
                    </div>
                    
                    <div className={`px-3 py-1 bg-gradient-to-r ${getDifficultyColor(workout.difficulty)} rounded-full text-xs font-bold text-white`}>
                      {workout.difficulty}
                    </div>
                  </div>

                  {/* Grupos musculares */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {workout.muscleGroups.map((group, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-800/50 rounded-lg text-xs text-gray-300 border border-gray-700/30">
                          {group}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Botão de ação */}
                  <button
                    onClick={() => {
                      if (workout.completed) {
                        // Se já concluído, não faz nada
                        return;
                      } else {
                        // Redireciona para página detalhada dos exercícios
                        navigate(`/treino/${workout.id}`);
                      }
                    }}
                    disabled={workout.completed}
                    className={`w-full py-3 rounded-xl font-bold transition-all duration-300 ${
                      workout.completed
                        ? 'bg-green-600/20 border border-green-500/30 text-green-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white hover:scale-[1.02] active:scale-[0.98] border border-blue-400/30'
                    }`}
                  >
                    {workout.completed ? (
                      <span className="flex items-center justify-center space-x-2">
                        <CheckCircle className="w-5 h-5" />
                        <span>Treino Concluído</span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center space-x-2">
                        <Play className="w-5 h-5" />
                        <span>Ver Exercícios</span>
                      </span>
                    )}
                  </button>
                </div>
              );
            })}
            </div>
          )}
        </div>

        {/* Motivação */}
        <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm rounded-xl border border-blue-400/30 p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center">
              <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
              Continue Evoluindo!
            </h3>
            <p className="text-gray-300 mb-4">
              Você está fazendo um ótimo progresso! Complete mais treinos para ganhar FitCoins e desbloquear novas conquistas.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-black/30 rounded-lg p-4 border border-gray-700/30">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-1">3</div>
                  <div className="text-xs text-gray-400">treinos para próximo nível</div>
                </div>
              </div>
              
              <div className="bg-black/30 rounded-lg p-4 border border-gray-700/30">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">500</div>
                  <div className="text-xs text-gray-400">FC até recompensa especial</div>
                </div>
              </div>
              
              <div className="bg-black/30 rounded-lg p-4 border border-gray-700/30">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">85%</div>
                  <div className="text-xs text-gray-400">meta semanal concluída</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTreino;