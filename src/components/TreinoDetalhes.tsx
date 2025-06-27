import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ModernFitLogo } from './ModernFitLogo';
import { 
  ArrowLeft, 
  Play, 
  Pause,
  CheckCircle,
  Circle,
  Clock,
  RotateCcw,
  Trophy,
  Flame,
  Target,
  Zap
} from 'lucide-react';

interface Exercise {
  id: number;
  name: string;
  description: string;
  sets: number;
  reps: string;
  restTime: number; // segundos
  instructions: string[];
  muscleGroup: string;
  equipment: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  completed: boolean;
  fitCoinsReward: number;
}

interface WorkoutDetails {
  id: number;
  title: string;
  description: string;
  duration: string;
  totalFitCoins: number;
  exercises: Exercise[];
}

const TreinoDetalhes = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [restTimeLeft, setRestTimeLeft] = useState(0);
  const [fitCoinsEarned, setFitCoinsEarned] = useState(0);

  // Dados dos treinos com exercícios detalhados
  const workoutsData: { [key: string]: WorkoutDetails } = {
    '1': {
      id: 1,
      title: "Peito Explosivo",
      description: "Treino focado no desenvolvimento do peitoral",
      duration: "45 min",
      totalFitCoins: 180,
      exercises: [
        {
          id: 1,
          name: "Supino Reto com Halteres",
          description: "Exercício fundamental para desenvolvimento do peitoral maior",
          sets: 4,
          reps: "8-12",
          restTime: 90,
          instructions: [
            "Deite no banco com os pés firmes no chão",
            "Segure os halteres com pegada pronada",
            "Desça controladamente até o peito",
            "Empurre os halteres para cima contraindo o peitoral"
          ],
          muscleGroup: "Peitoral",
          equipment: "Halteres",
          difficulty: "Médio",
          completed: false,
          fitCoinsReward: 25
        },
        {
          id: 2,
          name: "Supino Inclinado",
          description: "Foco na porção superior do peitoral",
          sets: 3,
          reps: "10-15",
          restTime: 75,
          instructions: [
            "Ajuste o banco em 30-45 graus",
            "Mantenha os ombros retraídos",
            "Controle a descida até o peito superior",
            "Empurre explosivamente para cima"
          ],
          muscleGroup: "Peitoral Superior",
          equipment: "Halteres",
          difficulty: "Médio",
          completed: false,
          fitCoinsReward: 25
        },
        {
          id: 3,
          name: "Flexão de Braço",
          description: "Exercício com peso corporal para resistência",
          sets: 3,
          reps: "15-20",
          restTime: 60,
          instructions: [
            "Posição de prancha com mãos na largura dos ombros",
            "Mantenha o corpo alinhado",
            "Desça até quase tocar o chão",
            "Empurre de volta à posição inicial"
          ],
          muscleGroup: "Peitoral",
          equipment: "Peso corporal",
          difficulty: "Fácil",
          completed: false,
          fitCoinsReward: 20
        },
        {
          id: 4,
          name: "Crucifixo com Halteres",
          description: "Isolamento para definição do peitoral",
          sets: 3,
          reps: "12-15",
          restTime: 60,
          instructions: [
            "Deite no banco com halteres nas mãos",
            "Braços ligeiramente flexionados",
            "Abra os braços em arco controlado",
            "Retorne contraindo o peitoral"
          ],
          muscleGroup: "Peitoral",
          equipment: "Halteres",
          difficulty: "Médio",
          completed: false,
          fitCoinsReward: 25
        },
        {
          id: 5,
          name: "Mergulho em Paralelas",
          description: "Exercício composto para peitoral e tríceps",
          sets: 3,
          reps: "8-12",
          restTime: 90,
          instructions: [
            "Segure as barras paralelas firmemente",
            "Incline o corpo para frente",
            "Desça controladamente",
            "Empurre de volta à posição inicial"
          ],
          muscleGroup: "Peitoral Inferior",
          equipment: "Paralelas",
          difficulty: "Difícil",
          completed: false,
          fitCoinsReward: 30
        },
        {
          id: 6,
          name: "Pullover com Halter",
          description: "Expansão da caixa torácica",
          sets: 3,
          reps: "10-12",
          restTime: 60,
          instructions: [
            "Deite perpendicular ao banco",
            "Segure um halter com ambas as mãos",
            "Baixe o peso atrás da cabeça",
            "Retorne contraindo o peitoral"
          ],
          muscleGroup: "Peitoral",
          equipment: "Halter",
          difficulty: "Médio",
          completed: false,
          fitCoinsReward: 20
        },
        {
          id: 7,
          name: "Supino Declinado",
          description: "Foco na porção inferior do peitoral",
          sets: 3,
          reps: "10-12",
          restTime: 75,
          instructions: [
            "Ajuste o banco em declínio",
            "Prenda os pés no apoio",
            "Desça a barra até o peito inferior",
            "Empurre controladamente para cima"
          ],
          muscleGroup: "Peitoral Inferior",
          equipment: "Barra",
          difficulty: "Médio",
          completed: false,
          fitCoinsReward: 25
        },
        {
          id: 8,
          name: "Flexão Diamante",
          description: "Variação avançada focando tríceps e peitoral interno",
          sets: 2,
          reps: "8-12",
          restTime: 60,
          instructions: [
            "Posição de flexão com mãos formando diamante",
            "Dedões e indicadores se tocando",
            "Desça mantendo cotovelos próximos ao corpo",
            "Empurre explosivamente para cima"
          ],
          muscleGroup: "Peitoral/Tríceps",
          equipment: "Peso corporal",
          difficulty: "Difícil",
          completed: false,
          fitCoinsReward: 30
        }
      ]
    }
  };

  const [workout, setWorkout] = useState<WorkoutDetails | null>(null);

  useEffect(() => {
    if (id && workoutsData[id]) {
      setWorkout(workoutsData[id]);
    }
  }, [id]);

  // Timer de descanso
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isResting && restTimeLeft > 0) {
      timer = setTimeout(() => {
        setRestTimeLeft(restTimeLeft - 1);
      }, 1000);
    } else if (restTimeLeft === 0) {
      setIsResting(false);
    }
    return () => clearTimeout(timer);
  }, [isResting, restTimeLeft]);

  const completeExercise = (exerciseId: number) => {
    if (!workout) return;

    const updatedExercises = workout.exercises.map(ex => {
      if (ex.id === exerciseId && !ex.completed) {
        setFitCoinsEarned(prev => prev + ex.fitCoinsReward);
        return { ...ex, completed: true };
      }
      return ex;
    });

    setWorkout({ ...workout, exercises: updatedExercises });

    // Iniciar descanso se não for o último exercício
    if (currentExercise < workout.exercises.length - 1) {
      const currentEx = workout.exercises[currentExercise];
      setRestTimeLeft(currentEx.restTime);
      setIsResting(true);
    }
  };

  const nextExercise = () => {
    if (workout && currentExercise < workout.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setIsResting(false);
    }
  };

  const prevExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1);
      setIsResting(false);
    }
  };

  const finishWorkout = () => {
    // Salvar progresso e voltar para dashboard
    navigate('/dashboardtreino');
  };

  if (!workout) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Treino não encontrado</div>
      </div>
    );
  }

  const currentEx = workout.exercises[currentExercise];
  const completedCount = workout.exercises.filter(ex => ex.completed).length;
  const progressPercent = (completedCount / workout.exercises.length) * 100;

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
      </div>

      {/* Container principal */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="pt-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboardtreino')}
                className="p-2 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 hover:border-blue-500/50 transition-all"
              >
                <ArrowLeft className="w-5 h-5 text-gray-300" />
              </button>
              <ModernFitLogo size={40} variant="icon-only" />
              <div>
                <h1 className="text-2xl font-bold text-white">{workout.title}</h1>
                <p className="text-sm text-gray-400">{workout.description}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* FitCoins Earned */}
              <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-lg px-4 py-2 flex items-center space-x-2">
                <img src="/fitcoin.png" alt="FitCoin" className="w-6 h-6" />
                <span className="text-lg font-bold text-yellow-400">+{fitCoinsEarned}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Progresso do Treino</span>
            <span className="text-sm font-bold text-white">{completedCount}/{workout.exercises.length} exercícios</span>
          </div>
          <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden border border-gray-700/50">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Timer de Descanso */}
        {isResting && (
          <div className="mb-6 bg-blue-600/20 backdrop-blur-sm rounded-xl border border-blue-400/30 p-6 text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Pause className="w-8 h-8 text-blue-400" />
              <h3 className="text-2xl font-bold text-white">Descanso</h3>
            </div>
            <div className="text-6xl font-bold text-blue-400 mb-2">{restTimeLeft}s</div>
            <p className="text-gray-300">Hidrate-se e prepare-se para o próximo exercício</p>
            <button
              onClick={() => {setIsResting(false); nextExercise();}}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all"
            >
              Pular Descanso
            </button>
          </div>
        )}

        {/* Exercício Atual */}
        {!isResting && (
          <div className="mb-6">
            <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-blue-400/30 p-6 relative overflow-hidden">
              {/* Header do Exercício */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-lg text-sm font-bold">
                      Exercício {currentExercise + 1}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      currentEx.difficulty === 'Fácil' ? 'bg-green-500/20 text-green-400' :
                      currentEx.difficulty === 'Médio' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {currentEx.difficulty}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">{currentEx.name}</h2>
                  <p className="text-gray-400">{currentEx.description}</p>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    <img src="/fitcoin.png" alt="FitCoin" className="w-5 h-5" />
                    <span className="text-lg font-bold text-yellow-400">+{currentEx.fitCoinsReward}</span>
                  </div>
                  {currentEx.completed ? (
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  ) : (
                    <Circle className="w-8 h-8 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Detalhes do Exercício */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Especificações</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Target className="w-5 h-5 text-blue-400" />
                      <span className="text-gray-300">{currentEx.sets} séries</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RotateCcw className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">{currentEx.reps} repetições</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-yellow-400" />
                      <span className="text-gray-300">{currentEx.restTime}s descanso</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Instruções</h3>
                  <ol className="space-y-2">
                    {currentEx.instructions.map((instruction, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start">
                        <span className="bg-blue-600/20 text-blue-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                          {index + 1}
                        </span>
                        {instruction}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex items-center justify-between">
                <button
                  onClick={prevExercise}
                  disabled={currentExercise === 0}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    currentExercise === 0 
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-600 hover:bg-gray-700 text-white'
                  }`}
                >
                  Anterior
                </button>

                <button
                  onClick={() => completeExercise(currentEx.id)}
                  disabled={currentEx.completed}
                  className={`px-8 py-3 rounded-xl font-bold transition-all ${
                    currentEx.completed
                      ? 'bg-green-600/20 border border-green-500/30 text-green-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white hover:scale-105 border border-blue-400/30'
                  }`}
                >
                  {currentEx.completed ? (
                    <span className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5" />
                      <span>Concluído</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-2">
                      <Play className="w-5 h-5" />
                      <span>Marcar como Feito</span>
                    </span>
                  )}
                </button>

                {currentExercise === workout.exercises.length - 1 ? (
                  <button
                    onClick={finishWorkout}
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white px-6 py-2 rounded-lg transition-all"
                  >
                    Finalizar Treino
                  </button>
                ) : (
                  <button
                    onClick={nextExercise}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-all"
                  >
                    Próximo
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Lista de Exercícios */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-white mb-4">Todos os Exercícios</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {workout.exercises.map((exercise, index) => (
              <button
                key={exercise.id}
                onClick={() => {setCurrentExercise(index); setIsResting(false);}}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  index === currentExercise
                    ? 'bg-blue-600/20 border-blue-400/60'
                    : exercise.completed
                      ? 'bg-green-600/20 border-green-500/30'
                      : 'bg-black/40 border-gray-600/30 hover:border-blue-400/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">#{index + 1}</span>
                  {exercise.completed ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <Circle className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                <div className="text-sm font-bold text-white mb-1">{exercise.name}</div>
                <div className="text-xs text-gray-400">{exercise.sets}x{exercise.reps}</div>
                <div className="flex items-center mt-2">
                  <img src="/fitcoin.png" alt="FitCoin" className="w-3 h-3 mr-1" />
                  <span className="text-xs text-yellow-400">+{exercise.fitCoinsReward}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreinoDetalhes;