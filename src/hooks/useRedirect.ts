import { useNavigate } from 'react-router-dom';

// Simula o hook useAuth que você já tem
const useAuth = () => {
  // Simulação do seu contexto de auth
  const user = JSON.parse(localStorage.getItem('fitness_user') || 'null');
  const loading = false;
  
  const signIn = async (email: string, password: string) => {
    // Simula diferentes tipos de usuário
    if (email === 'novo@test.com') {
      const newUser = { id: '1', email, hasCompletedOnboarding: false };
      localStorage.setItem('fitness_user', JSON.stringify(newUser));
      return { user: newUser };
    } else if (email === 'existente@test.com') {
      const existingUser = { id: '2', email, hasCompletedOnboarding: true };
      localStorage.setItem('fitness_user', JSON.stringify(existingUser));
      return { user: existingUser };
    }
    return { error: { message: 'Invalid login credentials' } };
  };

  return { user, loading, signIn };
};

// Hook customizado para lógica de redirecionamento inteligente
export const useSmartRedirect = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const redirectUser = () => {
    if (loading || !user) return;

    console.log('🔄 Redirecionamento inteligente:', {
      userId: user.id,
      hasCompletedOnboarding: user.hasCompletedOnboarding
    });

    if (!user.hasCompletedOnboarding) {
      console.log('➡️ Usuário vai para onboarding (primeira vez)');
      navigate('/onboarding');
    } else {
      console.log('➡️ Usuário vai direto para dashboard');
      navigate('/dashboard');
    }
  };

  return { redirectUser, user, loading };
};