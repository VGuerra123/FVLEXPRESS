/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta FVL Express (unificada para todo el proyecto)
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0B7EC8', // Azul corporativo
          600: '#0969a1',
          700: '#075985',
          800: '#0c4a6e',
          900: '#0f172a',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        accent: {
          400: '#06d6f0',
          500: '#0B7EC8',
          600: '#0891b2',
          700: '#0e7490',
        },
        success: {
          500: '#22c55e',
          600: '#16a34a',
        },
        danger: {
          500: '#ef4444',
          600: '#dc2626',
        },
        warning: {
          500: '#f59e0b',
          600: '#d97706',
        },
      },

      backgroundImage: {
        'blue-metallic':
          'linear-gradient(120deg, #1E47BD 0%, #2563EB 25%, #F9FAFB 50%, #2563EB 75%, #1E47BD 100%)',
      },

      animation: {
        shine: 'shine 4s linear infinite',
        'neural-pulse': 'neuralPulse 3s ease-in-out infinite',
        'quantum-float': 'quantumFloat 8s ease-in-out infinite',
        'cyber-glow': 'cyberGlow 2s ease-in-out infinite alternate',
        'glass-shine': 'glassShine 4s ease-in-out infinite',
      },

      keyframes: {
        shine: { to: { backgroundPosition: '200% center' } },
        neuralPulse: {
          '0%, 100%': {
            transform: 'scale(1)',
            boxShadow: '0 0 20px rgba(11, 126, 200, 0.3)',
          },
          '50%': {
            transform: 'scale(1.05)',
            boxShadow: '0 0 40px rgba(11, 126, 200, 0.6)',
          },
        },
        quantumFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        cyberGlow: {
          '0%': { textShadow: '0 0 10px rgba(11, 126, 200, 0.5)' },
          '100%': {
            textShadow:
              '0 0 20px rgba(11, 126, 200, 0.8), 0 0 30px rgba(11, 126, 200, 0.6)',
          },
        },
        glassShine: {
          '0%': {
            background:
              'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
            transform: 'translateX(-100%)',
          },
          '100%': { transform: 'translateX(100%)' },
        },
      },

      boxShadow: {
        glass:
          '0 4px 20px rgba(0,0,0,0.1), inset 0 0 20px rgba(255,255,255,0.1)',
        soft: '0 2px 15px -3px rgba(11,126,200,0.1), 0 10px 20px -2px rgba(11,126,200,0.05)',
        strong:
          '0 10px 40px -10px rgba(11,126,200,0.25), 0 20px 50px -10px rgba(11,126,200,0.15)',
      },

      backdropBlur: {
        glass: '12px',
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
