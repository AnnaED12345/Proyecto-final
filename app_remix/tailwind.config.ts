import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'Gainsboro': '#EEF0F4', // Blanco roto
        'MintGreen': '#A0F280', // Verde Menta
        'SlateGray': '#7E8591', // Gris Pizarra
        'MidnightBlue': '#111C31', // Azul Medianoche
        'BurntSienna': '#f87171',
      },
      screens: {
        sm: '640px',
        md: '888px', 
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  plugins: [],
};

export default config;
