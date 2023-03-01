/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#15141b',
        sec: '#181922',
        third: '#1a1922',
        hover: '#211e2d',
        'main-color': '#ffc830',
        'sec-color': '#1f1e25',
        'icon-color': '#504f56',
        'text-color': '#8b8897',
      },
      rotate: {
        360: '360deg',
      },
    },
  },
  plugins: [],
};
