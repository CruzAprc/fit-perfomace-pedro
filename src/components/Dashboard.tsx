import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ModernFitLogo } from './ModernFitLogo';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('fitness_user') || '{}');

  const logout = () => {
    localStorage.removeItem('fitness_user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-2">
      {/* Background moderno */}
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

      <div className="relative z-10 w-full max-w-sm sm:max-w-lg lg:max-w-2xl mx-auto px-3 sm:px-4">
        {/* Header compacto */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="relative flex-shrink-0">
              <ModernFitLogo size={40} variant="icon-only" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-base sm:text-lg font-bold text-white truncate">🎮 Gaming Dashboard</h1>
              <p className="text-xs text-gray-300 truncate">⚡ Bem-vinda, {user.email || 'Usuário'}!</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium text-xs flex-shrink-0"
          >
            🚪 Sair
          </button>
        </div>

        {/* Container principal responsivo */}
        <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-blue-400/30 p-3 sm:p-4 shadow-xl relative overflow-hidden">
          {/* Cantos neon */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-400"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-400"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-400"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-400"></div>

          {/* Gaming Cards responsivos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-4">
            <div className="bg-gray-900/50 border border-blue-500/30 rounded-lg p-3 sm:p-2 text-center relative overflow-hidden">
              <div className="text-xl sm:text-lg mb-1">⚔️</div>
              <h3 className="font-bold text-white text-sm sm:text-xs">Missões</h3>
              <p className="text-gray-400 text-sm sm:text-xs">Treinos ativos</p>
              <div className="mt-2 sm:mt-1 bg-gray-800/50 rounded-full h-1.5 sm:h-1 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-400 to-blue-500 h-full rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            
            <div className="bg-gray-900/50 border border-green-400/30 rounded-lg p-3 sm:p-2 text-center relative overflow-hidden">
              <div className="text-xl sm:text-lg mb-1">📈</div>
              <h3 className="font-bold text-white text-sm sm:text-xs">XP & Level</h3>
              <p className="text-gray-400 text-sm sm:text-xs">Progresso geral</p>
              <div className="mt-2 sm:mt-1 text-green-400 font-bold text-sm sm:text-xs">Level 42</div>
            </div>
            
            <div className="bg-gray-900/50 border border-yellow-400/30 rounded-lg p-3 sm:p-2 text-center relative overflow-hidden">
              <div className="text-xl sm:text-lg mb-1">🏆</div>
              <h3 className="font-bold text-white text-sm sm:text-xs">Conquistas</h3>
              <p className="text-gray-400 text-sm sm:text-xs">Badges desbloqueadas</p>
              <div className="mt-2 sm:mt-1 text-yellow-400 font-bold text-sm sm:text-xs">12/25</div>
            </div>
          </div>

          {/* Gaming Status responsivo */}
          <div className="bg-gray-900/50 border border-blue-500/30 rounded-lg p-3 sm:p-4">
            <h2 className="text-sm sm:text-base font-bold text-white mb-3 sm:mb-2 flex items-center gap-1">
              ⚡ Sistema Gaming Online!
            </h2>
            <div className="space-y-3 sm:space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between items-center flex-wrap gap-1">
                <span className="text-gray-400">🔗 Status da Conexão:</span>
                <span className="text-green-400 font-bold flex items-center gap-1">
                  ● Online
                </span>
              </div>
              <div className="flex justify-between items-center flex-wrap gap-1">
                <span className="text-gray-400">🎯 Tutorial:</span>
                <span className={`font-bold ${user.hasCompletedOnboarding ? 'text-green-400' : 'text-yellow-400'}`}>
                  {user.hasCompletedOnboarding ? '✅ Concluído' : '⏳ Pendente'}
                </span>
              </div>
              <div className="flex justify-between items-center flex-wrap gap-1">
                <span className="text-gray-400">🎮 Modo Gaming:</span>
                <span className="text-blue-400 font-bold">Ativado</span>
              </div>
              <div className="flex justify-between items-center flex-wrap gap-1">
                <span className="text-gray-400">🚀 Redirecionamento:</span>
                <span className="text-green-400 font-bold">Funcionando</span>
              </div>
            </div>

            {/* Gaming XP Bar responsivo */}
            <div className="mt-4 sm:mt-3">
              <div className="flex justify-between text-xs sm:text-sm text-gray-400 mb-2 sm:mb-1">
                <span>💫 XP Sessão Atual</span>
                <span>850/1000 XP</span>
              </div>
              <div className="bg-gray-800/50 rounded-full h-2.5 sm:h-2 overflow-hidden border border-gray-600/30">
                <div className="bg-gradient-to-r from-blue-400 to-blue-500 h-full rounded-full transition-all duration-500" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;