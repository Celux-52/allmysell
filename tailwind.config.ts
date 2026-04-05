import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f3ff',
          100: '#e6ebff',
          200: '#ccd7ff',
          300: '#99abff',
          400: '#6680ff',
          500: '#0000FF',
          600: '#0000e6',
          700: '#0000cc',
          800: '#0000b3',
          900: '#000099',
        },
        secondary: {
          50: '#f8f3ff',
          100: '#f0e6ff',
          200: '#e6ccff',
          300: '#cc99ff',
          400: '#b366ff',
          500: '#660099',
          600: '#5c0087',
          700: '#520075',
          800: '#480063',
          900: '#3d004f',
        },
        accent: {
          50: '#fdf2ff',
          100: '#fce6ff',
          200: '#f8ccff',
          300: '#f199ff',
          400: '#ea66ff',
          500: '#8F00FF',
          600: '#7f00e6',
          700: '#7000cc',
          800: '#6000b3',
          900: '#500099',
        },
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { opacity: '1' },
          '70%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(224, 122, 44, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(224, 122, 44, 0.6)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.6s ease-in-out',
        slideInUp: 'slideInUp 0.6s ease-out',
        slideInLeft: 'slideInLeft 0.6s ease-out',
        slideInRight: 'slideInRight 0.6s ease-out',
        scaleIn: 'scaleIn 0.5s ease-out',
        bounceIn: 'bounceIn 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        float: 'float 3s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
