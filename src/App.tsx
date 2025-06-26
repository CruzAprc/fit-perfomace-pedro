import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GamingLogin from './components/GamingLogin';
import Onboarding from './components/Onboarding';
import LoadingFitness from './components/LoadingFitness';
import NutritionQuizGame from './components/NutritionQuizGame';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<GamingLogin />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/loading" element={<LoadingFitness />} />
          <Route path="/nutrition-quiz" element={<NutritionQuizGame />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cadastro" element={<div className="min-h-screen gaming-bg flex items-center justify-center"><div className="gaming-card p-8 rounded-3xl text-center"><h1 className="text-2xl font-bold mb-4 text-white">🎮 Página de Cadastro</h1><p className="text-gray-300">Em desenvolvimento...</p></div></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
