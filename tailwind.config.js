/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.{hbs,html}',
    './src/views/**/*.{hbs,html}',
    './public/**/*.{js,ts}',
    './src/**/*.{ts,js}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        // Paleta de colores verdes personalizada
        primary: {
          50: '#D8F3DC',   // Lightest Green
          100: '#B7E4C7',  // Pastel Green
          200: '#95D5B2',  // Medium Green
          300: '#74C69D',  // Darker Pastel Green
          400: '#52B788',  // Bright Green
          500: '#40916C',  // Deep Green
          600: '#2D6A4F',  // Forest Green
          700: '#1B4332',  // Dark Teal
          800: '#081C15',  // Darkest Green
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
        // Colores adicionales para la interfaz
        accent: {
          50: '#D8F3DC',
          100: '#B7E4C7',
          200: '#95D5B2',
          300: '#74C69D',
          400: '#52B788',
          500: '#40916C',
          600: '#2D6A4F',
          700: '#1B4332',
          800: '#081C15',
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'gradient-success': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      },
      boxShadow: {
        'modern': '0 10px 30px rgba(0, 0, 0, 0.1)',
        'modern-lg': '0 25px 50px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
