import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModernFitLogo } from './ModernFitLogo';
import FitCoin from './FitCoin';
import { Bell, Settings, TrendingUp, Zap, Trophy, Target, Flame, ChevronLeft, ChevronRight, Plus, Activity, Droplet, Footprints, Dumbbell, Calendar, Star, Crown, Utensils, CheckCircle, Play } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('fitness_user') || '{}');
  const [activeSlide, setActiveSlide] = useState(0);
  const [fitCoins, setFitCoins] = useState(2450);
  const [level, setLevel] = useState(12);
  const [levelProgress, setLevelProgress] = useState(65);

  const highlights = [
    { 
      title: "Novo Treino HIIT",
      subtitle: "Queime 500 calorias em 30min",
      gradient: "from-orange-500 to-red-500",
      icon: Flame
    },
    { 
      title: "Desafio da Semana",
      subtitle: "10.000 passos por dia",
      gradient: "from-green-500 to-emerald-500",
      icon: Target
    },
    { 
      title: "Receita Fitness",
      subtitle: "Frango com batata doce",
      gradient: "from-purple-500 to-pink-500",
      icon: Utensils
    }
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % highlights.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + highlights.length) % highlights.length);
  };

  const logout = () => {
    localStorage.removeItem('fitness_user');
    navigate('/login');
  };

  // Animação de entrada dos FitCoins
  useEffect(() => {
    const timer = setTimeout(() => {
      setFitCoins(prev => prev + 50);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

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

      {/* Container principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="pt-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <ModernFitLogo size={40} variant="icon-only" />
            </div>
            
            <div className="flex items-center space-x-4">
              {/* FitCoins Display */}
              <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-lg px-4 py-2">
                <FitCoin amount={fitCoins} size="lg" animated={true} />
              </div>

              {/* Notificações */}
              <button className="relative p-2 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 hover:border-blue-500/50 transition-all">
                <Bell className="w-5 h-5 text-gray-300" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              </button>

              {/* Configurações */}
              <button onClick={logout} className="p-2 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 hover:border-blue-500/50 transition-all">
                <Settings className="w-5 h-5 text-gray-300" />
              </button>
            </div>
          </div>
        </header>

        {/* Carrossel de Destaques - Movido para o topo */}
        <div className="mb-6">
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {highlights.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index} className="w-full flex-shrink-0">
                      <div className={`bg-gradient-to-br ${item.gradient} p-8 rounded-2xl relative overflow-hidden`}>
                        <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
                          <IconComponent className="w-full h-full" />
                        </div>
                        {/* Área reservada para arte/conteúdo visual */}
                        <div className="relative z-10 h-32 flex items-center justify-center">
                          {/* Placeholder para arte futura */}
                          <div className="text-center">
                            <h4 className="text-2xl font-bold text-white mb-2">{item.title}</h4>
                            <p className="text-white/80">{item.subtitle}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Controles do carrossel */}
            <button 
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>

            {/* Indicadores */}
            <div className="flex justify-center space-x-2 mt-4">
              {highlights.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeSlide 
                      ? 'bg-blue-400 w-8' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>



        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Card do Perfil Atleta Elite - 1 coluna */}
          <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-blue-400/30 p-6 relative overflow-hidden">
            {/* Cantos neon */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-400"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-blue-400"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-blue-400"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-blue-400"></div>

            {/* Avatar e Info */}
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl font-bold text-white">
                    {user.email?.charAt(0).toUpperCase() || 'A'}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center border-2 border-black">
                  <Crown className="w-3 h-3 text-black" />
                </div>
              </div>
              
              <h2 className="text-lg font-bold text-white flex items-center justify-center gap-2 mb-1">
                Atleta Elite <Trophy className="w-4 h-4 text-yellow-400" />
              </h2>
              <p className="text-sm text-gray-400 mb-4">@{user.email?.split('@')[0] || 'guerreirofitness'}</p>
              
              {/* Barra de nível */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-blue-400">Nível {level}</span>
                  <span className="text-xs text-gray-400">{levelProgress}%</span>
                </div>
                <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden border border-gray-700/50">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-500"
                    style={{ width: `${levelProgress}%` }}
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Card Principal de Treinos - 2 colunas */}
          <div className="lg:col-span-2">
            <div 
              onClick={() => navigate('/dashboardtreino')}
              className="bg-black/40 backdrop-blur-sm rounded-xl border border-blue-400/30 p-6 relative overflow-hidden cursor-pointer transition-all duration-300 hover:border-blue-400/50 hover:bg-black/50 hover:scale-[1.01] group h-full"
            >
              {/* Efeitos de fundo */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"></div>
              
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Dumbbell className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Centro de Treinos</h3>
                    <p className="text-sm text-gray-400">Acesse seus workouts e ganhe FitCoins</p>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors group-hover:translate-x-1" />
              </div>

              {/* Stats de Treino */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-green-600/20 to-green-700/20 backdrop-blur-sm rounded-lg p-4 border border-green-500/30">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">2</div>
                      <div className="text-xs text-gray-300">Concluídos hoje</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-700/20 backdrop-blur-sm rounded-lg p-4 border border-yellow-500/30">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                      <img src="/fitcoin.png" alt="FitCoin" className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">+350</div>
                      <div className="text-xs text-gray-300">FitCoins ganhos</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Treinos Disponíveis Preview */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-300 mb-3">Próximos Treinos</h4>
                
                <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                      <Flame className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">HIIT Explosivo</div>
                      <div className="text-xs text-gray-400">25 min • +150 FC</div>
                    </div>
                  </div>
                  <div className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded">Intermediário</div>
                </div>

                <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Dumbbell className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Força Superior</div>
                      <div className="text-xs text-gray-400">45 min • +200 FC</div>
                    </div>
                  </div>
                  <div className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">Avançado</div>
                </div>

                <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                      <Target className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Core Resistência</div>
                      <div className="text-xs text-gray-400">20 min • +100 FC</div>
                    </div>
                  </div>
                  <div className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Iniciante</div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg border border-blue-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-white">Pronto para treinar?</div>
                    <div className="text-xs text-gray-400">6 treinos disponíveis</div>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Segunda linha de cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

          {/* Card de Conquistas */}
          <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-blue-400/30 p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full blur-2xl"></div>
            
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
              Conquistas Recentes
            </h3>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 bg-gradient-to-r from-yellow-600/20 to-transparent p-3 rounded-lg border border-yellow-500/20">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-black" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-white text-sm">Maratonista Digital</div>
                  <div className="text-xs text-gray-400">Correu 42km em um mês</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-600/20 to-transparent p-3 rounded-lg border border-blue-500/20">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                  <Dumbbell className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-white text-sm">Mestre dos Pesos</div>
                  <div className="text-xs text-gray-400">100 treinos de força</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-gradient-to-r from-green-600/20 to-transparent p-3 rounded-lg border border-green-500/20">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-white text-sm">Rei da Consistência</div>
                  <div className="text-xs text-gray-400">30 dias sem faltar</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card de Atividade Semanal */}
          <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-blue-400/30 p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full blur-2xl"></div>
            
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-green-400" />
              Atividade Semanal
            </h3>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <FitCoin amount={1847} size="lg" />
                <span className="text-xs text-gray-400">ganhos essa semana</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Flame className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-bold text-orange-400">12 dias consecutivos</span>
              </div>
            </div>

            {/* Gráfico de barras simplificado */}
            <div className="mt-4 flex items-end justify-between h-20 space-x-1">
              {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((dia, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-gradient-to-t from-blue-400 to-cyan-400 rounded-t"
                    style={{ height: `${Math.random() * 100}%` }}
                  />
                  <span className="text-xs text-gray-400 mt-1">{dia}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-white mb-4">Ações Rápidas</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button className="group relative bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-xl border border-blue-400/30 hover:from-blue-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <div className="relative z-10 flex flex-col items-center space-y-2">
                <Dumbbell className="w-8 h-8 text-white" />
                <span className="font-bold text-white">Iniciar Treino</span>
                <FitCoin amount={100} size="sm" showLabel={false} />
                <span className="text-xs text-blue-200">+100</span>
              </div>
            </button>

            <button className="group relative bg-gradient-to-r from-green-600 to-green-700 p-6 rounded-xl border border-green-400/30 hover:from-green-500 hover:to-green-600 transition-all duration-300 transform hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <div className="relative z-10 flex flex-col items-center space-y-2">
                <Plus className="w-8 h-8 text-white" />
                <span className="font-bold text-white">Registrar Refeição</span>
                <FitCoin amount={50} size="sm" showLabel={false} />
                <span className="text-xs text-green-200">+50</span>
              </div>
            </button>

            <button className="group relative bg-gradient-to-r from-yellow-600 to-yellow-700 p-6 rounded-xl border border-yellow-400/30 hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <div className="relative z-10 flex flex-col items-center space-y-2">
                <Target className="w-8 h-8 text-white" />
                <span className="font-bold text-white">Check-in Diário</span>
                <FitCoin amount={30} size="sm" showLabel={false} />
                <span className="text-xs text-yellow-200">+30</span>
              </div>
            </button>
          </div>
        </div>

        {/* Seção Ganhe Mais FitCoins */}
        <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm rounded-xl border border-blue-400/30 p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/20 rounded-full blur-3xl"></div>
          
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Zap className="w-6 h-6 mr-2 text-yellow-400" />
            Ganhe Mais FitCoins
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-black/30 rounded-lg p-4 border border-gray-700/30">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">Treino completo</div>
                  <div className="text-xs text-yellow-400">+100 FC</div>
                </div>
              </div>
            </div>

            <div className="bg-black/30 rounded-lg p-4 border border-gray-700/30">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">Dieta balanceada</div>
                  <div className="text-xs text-yellow-400">+50 FC</div>
                </div>
              </div>
            </div>

            <div className="bg-black/30 rounded-lg p-4 border border-gray-700/30">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">8h de sono</div>
                  <div className="text-xs text-yellow-400">+30 FC</div>
                </div>
              </div>
            </div>

            <div className="bg-black/30 rounded-lg p-4 border border-gray-700/30">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">Desafio semanal</div>
                  <div className="text-xs text-yellow-400">+500 FC</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;