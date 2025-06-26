import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSmartRedirect } from '../hooks/useRedirect';
import { LoadingSpinner } from './LoadingSpinner';
import { FitPerformanceLogo } from './FitPerformanceLogo';

const Login = () => {
  const navigate = useNavigate();
  const { redirectUser, user, loading } = useSmartRedirect();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});

  // ✅ LÓGICA DE REDIRECIONAMENTO INTELIGENTE
  useEffect(() => {
    if (user && !loading) {
      console.log('🔍 Usuário já logado, aplicando redirecionamento inteligente...');
      redirectUser();
    }
  }, [user, loading, redirectUser]);

  // Validação de email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validação do formulário
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
      alert('Por favor, corrija os erros no formulário');
      return;
    }

    setIsSubmitting(true);
    console.log('🚀 Iniciando processo de login...');
    
    try {
      // Simula a função signIn do seu useAuth
      const signIn = async (email: string, password: string) => {
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simula delay da API
        
        if (email === 'novo@test.com' && password === '123456') {
          const newUser = { id: '1', email, hasCompletedOnboarding: false };
          localStorage.setItem('fitness_user', JSON.stringify(newUser));
          return { user: newUser };
        } else if (email === 'existente@test.com' && password === '123456') {
          const existingUser = { id: '2', email, hasCompletedOnboarding: true };
          localStorage.setItem('fitness_user', JSON.stringify(existingUser));
          return { user: existingUser };
        }
        return { error: { message: 'Invalid login credentials' } };
      };

      const result = await signIn(formData.email, formData.password);
      
      if (result.error) {
        console.error('❌ Erro no login:', result.error);
        
        const errorMessage = result.error.message;
        if (errorMessage.includes('Invalid login credentials')) {
          alert('Email ou senha incorretos');
        } else if (errorMessage.includes('Email not confirmed')) {
          alert('Por favor, confirme seu email antes de fazer login');
        } else if (errorMessage.includes('Too many requests')) {
          alert('Muitas tentativas. Tente novamente em alguns minutos');
        } else {
          alert('Erro ao fazer login: ' + errorMessage);
        }
      } else {
        console.log('✅ Login realizado com sucesso');
        alert('Login realizado com sucesso!');
        
        // ✅ REDIRECIONAMENTO INTELIGENTE APÓS LOGIN
        setTimeout(() => {
          if (!result.user.hasCompletedOnboarding) {
            console.log('➡️ Novo usuário - redirecionando para onboarding');
            navigate('/onboarding');
          } else {
            console.log('➡️ Usuário existente - redirecionando para dashboard');
            navigate('/dashboard');
          }
        }, 1000);
      }
    } catch (error: any) {
      console.error('💥 Erro inesperado no login:', error);
      alert('Erro inesperado ao fazer login');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpa erro do campo quando usuário digita
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (loading) {
    return <LoadingSpinner text="Verificando autenticação..." />;
  }

  return (
    <div className="min-h-screen fitness-gradient-bg flex items-center justify-center relative overflow-hidden">
      {/* Floating Elements Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full opacity-20 animate-pulse-glow"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-white rounded-full opacity-30 animate-pulse-glow"></div>
        <div className="absolute bottom-32 left-16 w-3 h-3 bg-white rounded-full opacity-15 animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-white rounded-full opacity-25 animate-pulse-glow"></div>
      </div>

      {/* Main Container */}
      <div className="max-w-md w-full mx-auto px-6 relative z-10">
        <div className="fitness-card rounded-3xl p-8 animate-slide-in-up">
          
          {/* Header Section */}
          <div className="text-center mb-8">
            {/* Logo Fit Performance */}
            <div className="flex justify-center mb-6">
              <FitPerformanceLogo size={120} />
            </div>
            
            <h1 className="text-3xl font-black text-gray-900 mb-2">
              Fit <span className="text-blue-600">Performance</span>
            </h1>
            <p className="text-gray-600 font-medium mb-2">Bem-vinda de volta!</p>
            <p className="text-gray-500 text-sm">
              Continue sua jornada fitness 💪
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
                Email
              </label>
              <input 
                type="email" 
                id="email"
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                className={`input-modern ${errors.email ? 'error' : ''}`}
                placeholder="seu@email.com" 
                required 
                disabled={isSubmitting}
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2 font-medium flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">!</span>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-3">
                Senha
              </label>
              <input 
                type="password" 
                id="password"
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                className={`input-modern ${errors.password ? 'error' : ''}`}
                placeholder="Sua senha" 
                required 
                disabled={isSubmitting}
                autoComplete="current-password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-2 font-medium flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">!</span>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full btn-primary text-lg font-semibold py-4 flex items-center justify-center gap-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Entrando...
                </>
              ) : (
                <>
                  <span>Entrar</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 7L19 12L14 17M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Test Credentials */}
          <div className="mt-8 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 text-xs font-bold">?</span>
              </div>
              <span className="text-sm font-semibold text-gray-700">Credenciais para teste</span>
            </div>
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span className="font-medium">Usuário novo:</span>
                <code className="bg-white px-2 py-1 rounded text-green-600">novo@test.com</code>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Usuário existente:</span>
                <code className="bg-white px-2 py-1 rounded text-blue-600">existente@test.com</code>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Senha:</span>
                <code className="bg-white px-2 py-1 rounded text-gray-700">123456</code>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">ou</span>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm">
              Não tem conta?{' '}
              <button 
                onClick={() => navigate('/cadastro')} 
                className="font-semibold text-green-600 hover:text-green-700 transition-colors inline-flex items-center gap-1"
                disabled={isSubmitting}
              >
                Cadastre-se grátis
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;