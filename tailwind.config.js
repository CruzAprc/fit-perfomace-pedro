/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'gaming-blue': '#4F80FF',
        'gaming-cyan': '#06B6D4',
        'gaming-purple': '#A78BFA',
        'gaming-green': '#34D399',
        'gaming-orange': '#F59E0B'
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'monospace'],
        'rajdhani': ['Rajdhani', 'sans-serif'],
        'cyber': ['Rajdhani', 'Inter', 'sans-serif'],
        'gaming': ['Orbitron', 'Inter', 'sans-serif']
      },
      animation: {
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'matrix-fall': 'matrix-fall 3s infinite linear',
        'energy-flow': 'energy-flow 3s infinite',
        'neon-flicker': 'neon-flicker 2s infinite alternate',
        'digital-glitch': 'digital-glitch 0.3s infinite',
        'level-up': 'level-up 0.6s ease-out',
        'shimmer-modern': 'shimmer-modern 2s infinite',
        'float-modern': 'float-modern 4s ease-in-out infinite'
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' }
        },
        'matrix-fall': {
          '0%': { transform: 'translateY(-100vh)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' }
        },
        'energy-flow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(79, 128, 255, 0.5), inset 0 0 20px rgba(79, 128, 255, 0.1)'
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(79, 128, 255, 0.8), inset 0 0 30px rgba(79, 128, 255, 0.2)'
          }
        },
        'neon-flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' }
        },
        'digital-glitch': {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-1px, 1px)' },
          '40%': { transform: 'translate(-1px, -1px)' },
          '60%': { transform: 'translate(1px, 1px)' },
          '80%': { transform: 'translate(1px, -1px)' }
        },
        'level-up': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.2)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        'shimmer-modern': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'float-modern': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(180deg)' }
        }
      },
      backgroundImage: {
        'gaming-gradient': 'linear-gradient(135deg, #000000 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)',
        'energy-border': 'linear-gradient(45deg, #4F80FF, #5E8EFF, #437BFF)'
      },
      backdropBlur: {
        xs: '2px'
      }
    },
  },
  plugins: [],
}