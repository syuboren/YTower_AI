/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#F58220',
          50: '#FEF3E6',
          100: '#FDE7CC',
          200: '#FBCF99',
          300: '#F9B766',
          400: '#F79F33',
          500: '#F58220',
          600: '#D86A0A',
          700: '#A55008',
          800: '#723705',
          900: '#3F1F03',
        },
        'terracotta': {
          DEFAULT: '#C45D4A',
          50: '#F5E6E3',
          100: '#EBCDC7',
          200: '#D79B8F',
          300: '#C36957',
          400: '#C45D4A',
          500: '#A84A3A',
          600: '#8C3E30',
          700: '#703226',
          800: '#54261C',
          900: '#381A12',
        },
        'cream': '#FDF8F3',
      },
      fontFamily: {
        'noto': ['"Noto Sans TC"', 'sans-serif'],
      },
      borderRadius: {
        'card': '12px',
        'pill': '30px',
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'nav': '0 2px 10px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
