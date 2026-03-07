/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#f7f4f2',
        brandSection: 'rgb(217 237 138)',
        brandButton: '#B3C942',
        brandButtonHover: '#6F7A25',
        brandHero: 'rgb(158 193 32 / 35%)',
        brandHeaderColor: '#65380F',
        brandColor: '#6C5D3B'
      }
    },
  },
  plugins: [],
};
