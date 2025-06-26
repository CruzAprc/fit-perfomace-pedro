import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModernFitLogo } from './ModernFitLogo';

const GamingLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});
  const [xpValue, setXpValue] = useState(0);
  const [loginAttempts, setLoginAttempts] = useState(0);

  // Efeito XP para demonstrar gamificação
  useEffect(() => {
    const interval = setInterval(() => {
      setXpValue(prev => prev >= 100 ? 0 : prev + 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: {email?: string; password?: string} = {};
    
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setLoginAttempts(prev => prev + 1);
      return;
    }

    setIsSubmitting(true);
    console.log('🎮 Iniciando missão de login...');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (formData.email === 'novo@test.com' && formData.password === '123456') {
        const newUser = { id: '1', email: formData.email, hasCompletedOnboarding: false };
        localStorage.setItem('fitness_user', JSON.stringify(newUser));
        console.log('🎯 Usuário novo detectado - iniciando tutorial');
        navigate('/onboarding');
      } else if (formData.email === 'existente@test.com' && formData.password === '123456') {
        const existingUser = { id: '2', email: formData.email, hasCompletedOnboarding: true };
        localStorage.setItem('fitness_user', JSON.stringify(existingUser));
        console.log('⚡ Veterano retornando - acesso direto ao dashboard');
        navigate('/dashboard');
      } else {
        setLoginAttempts(prev => prev + 1);
        throw new Error('Credenciais inválidas');
      }
    } catch (error) {
      console.error('❌ Falha na missão:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="min-h-screen gaming-bg flex items-center justify-center relative">
      

      {/* Main Gaming Container */}
      <div className="max-w-md w-full mx-auto px-6 relative z-20">
        <div className="gaming-card rounded-3xl p-8 glow-effect animate-slide-in-up">
          
          {/* Gaming Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <ModernFitLogo size={140} variant="icon-only" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center animate-pulse-glow">
                  <span className="text-xs font-bold text-black">●</span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-300 font-medium mb-2">Acesse sua conta de jogador</p>
            <p className="text-gray-400 text-sm">
              Evolua seu shape enquanto se diverte
            </p>

            {/* XP Bar demonstrativo */}
            <div className="mt-4 mb-6">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Sistema Online</span>
                <span>{xpValue}%</span>
              </div>
              <div className="xp-bar h-2">
                <div 
                  className="xp-fill h-full"
                  style={{ width: `${xpValue}%` }}
                />
              </div>
            </div>
          </div>

          {/* Gaming Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Email do Jogador
              </label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                className={`input-gaming ${errors.email ? 'error' : ''}`}
                placeholder="Digite seu email..." 
                required 
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-2 font-medium flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">!</span>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Código de Acesso
              </label>
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                className={`input-gaming ${errors.password ? 'error' : ''}`}
                placeholder="Digite sua senha..." 
                required 
                disabled={isSubmitting}
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-2 font-medium flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">!</span>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Gaming Submit Button */}
            <button 
              type="submit" 
              className="w-full btn-gaming text-lg font-semibold py-4 flex items-center justify-center gap-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Conectando...</span>
                </>
              ) : (
                <>
                  <span>Iniciar Sessão</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 7L19 12L14 17M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Gaming Stats */}
          <div className="mt-8 p-4 bg-gray-900 rounded-2xl border border-blue-500 border-opacity-30">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">G</span>
              </div>
              <span className="text-sm font-semibold text-gray-300">Contas de Teste</span>
            </div>
            <div className="space-y-2 text-xs text-gray-400">
              <div className="flex justify-between items-center">
                <span className="font-medium">Jogador Iniciante:</span>
                <code className="bg-gray-800 px-2 py-1 rounded text-green-400">novo@test.com</code>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Veterano Level 50:</span>
                <code className="bg-gray-800 px-2 py-1 rounded text-blue-400">existente@test.com</code>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Código Universal:</span>
                <code className="bg-gray-800 px-2 py-1 rounded text-yellow-400">123456</code>
              </div>
            </div>
            
            {/* Gaming Stats */}
            <div className="mt-4 pt-3 border-t border-gray-700">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Tentativas:</span>
                <span className="text-blue-400 font-bold">{loginAttempts}</span>
              </div>
            </div>
          </div>

          {/* Footer Gaming */}
          <div className="mt-8 text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-900 text-gray-400 font-medium">ou</span>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm">
              Novo no jogo?{' '}
              <button 
                onClick={() => navigate('/cadastro')} 
                className="font-semibold text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1"
                disabled={isSubmitting}
              >
                Criar Conta Grátis
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamingLogin;