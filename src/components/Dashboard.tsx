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
    <div className="min-h-screen gaming-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="gaming-card rounded-3xl p-8">
          
          {/* Gaming Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="relative">
                <ModernFitLogo size={60} variant="icon-only" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse-glow"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">🎮 Gaming Dashboard</h1>
                <p className="text-gray-300">⚡ Bem-vinda de volta, {user.email}!</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors font-medium"
            >
              🚪 Sair
            </button>
          </div>

          {/* Gaming Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-900 border border-blue-500 border-opacity-30 rounded-2xl p-6 text-center glow-effect">
              <div className="text-3xl mb-3">⚔️</div>
              <h3 className="font-bold text-white">Missões</h3>
              <p className="text-gray-400 text-sm">Treinos ativos</p>
              <div className="mt-3 xp-bar h-2">
                <div className="xp-fill h-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div className="bg-gray-900 border border-green-400 border-opacity-30 rounded-2xl p-6 text-center glow-effect">
              <div className="text-3xl mb-3">📈</div>
              <h3 className="font-bold text-white">XP & Level</h3>
              <p className="text-gray-400 text-sm">Progresso geral</p>
              <div className="mt-3 text-green-400 font-bold">Level 42</div>
            </div>
            <div className="bg-gray-900 border border-yellow-400 border-opacity-30 rounded-2xl p-6 text-center glow-effect">
              <div className="text-3xl mb-3">🏆</div>
              <h3 className="font-bold text-white">Conquistas</h3>
              <p className="text-gray-400 text-sm">Badges desbloqueadas</p>
              <div className="mt-3 text-yellow-400 font-bold">12/25</div>
            </div>
          </div>

          {/* Gaming Status */}
          <div className="bg-gray-900 border border-blue-500 border-opacity-30 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              ⚡ Sistema Gaming Online!
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">🔗 Status da Conexão:</span>
                <span className="text-green-400 font-bold flex items-center gap-1">
                  ● Online
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">🎯 Tutorial:</span>
                <span className={`font-bold ${user.hasCompletedOnboarding ? 'text-green-400' : 'text-yellow-400'}`}>
                  {user.hasCompletedOnboarding ? '✅ Concluído' : '⏳ Pendente'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">🎮 Modo Gaming:</span>
                <span className="text-blue-400 font-bold">Ativado</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">🚀 Redirecionamento:</span>
                <span className="text-green-400 font-bold">Funcionando</span>
              </div>
            </div>

            {/* Gaming XP Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>💫 XP Sessão Atual</span>
                <span>850/1000 XP</span>
              </div>
              <div className="xp-bar h-3">
                <div className="xp-fill h-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;