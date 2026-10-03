/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f8fa',
          100: '#dcedf2',
          200: '#bce0e8',
          300: '#8dc7d6',
          400: '#4da3bc',
          500: '#00607a',
          600: '#02475e',
          700: '#013749',
          800: '#012836',
          900: '#011c27',
          950: '#010f15',
        },
        tangerine: {
          50: '#fff3e0',
          100: '#ffe0b2',
          200: '#ffcc80',
          300: '#ffab40',
          400: '#ff6e40',
          500: '#ff5722',
          600: '#f4511e',
          700: '#e64a19',
          800: '#d84315',
          900: '#bf360c',
        },
        cyan: {
          50: '#e0f7fa',
          100: '#b2ebf2',
          200: '#80deea',
          300: '#4dd0e1',
          400: '#26c6da',
          500: '#00a8cc',
          600: '#0090b0',
          700: '#007590',
        },
        darkbg: '#01141c',
        darkcard: '#011e2b',
        darksurface: '#022838',
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        readex: ['"Readex Pro"', 'sans-serif'],
        tajawal: ['Tajawal', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 30px -5px rgba(0, 168, 204, 0.45)',
        'glow-tangerine': '0 0 30px -5px rgba(255, 87, 34, 0.45)',
        'glow-primary': '0 0 30px -5px rgba(2, 71, 94, 0.45)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};
