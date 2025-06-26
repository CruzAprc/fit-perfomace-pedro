import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModernFitLogo } from './ModernFitLogo';

const SimpleLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (formData.email === 'novo@test.com' && formData.password === '123456') {
        const newUser = { id: '1', email: formData.email, hasCompletedOnboarding: false };
        localStorage.setItem('fitness_user', JSON.stringify(newUser));
        navigate('/onboarding');
      } else if (formData.email === 'existente@test.com' && formData.password === '123456') {
        const existingUser = { id: '2', email: formData.email, hasCompletedOnboarding: true };
        localStorage.setItem('fitness_user', JSON.stringify(existingUser));
        navigate('/dashboard');
      } else {
        alert('Email ou senha incorretos');
      }
    } catch (error) {
      alert('Erro ao fazer login');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen fitness-gradient-bg flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-6">
        <div className="fitness-card rounded-3xl p-8">
          
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <ModernFitLogo size={140} variant="with-text" />
            </div>
            
            <p className="text-gray-600 font-medium mb-2">Bem-vinda de volta!</p>
            <p className="text-gray-500 text-sm">
              Continue sua jornada fitness 💪
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                className="input-modern"
                placeholder="seu@email.com" 
                required 
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Senha</label>
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                className="input-modern"
                placeholder="Sua senha" 
                required 
                disabled={isSubmitting}
              />
            </div>

            <button 
              type="submit" 
              className="w-full btn-primary text-lg font-semibold py-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          {/* Test Info */}
          <div className="mt-8 p-4 bg-gray-50 rounded-2xl">
            <h3 className="font-semibold text-gray-700 mb-2">🧪 Credenciais para teste:</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Novo usuário:</strong> novo@test.com / 123456</p>
              <p><strong>Usuário existente:</strong> existente@test.com / 123456</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SimpleLogin;