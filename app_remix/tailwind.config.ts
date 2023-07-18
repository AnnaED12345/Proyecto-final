import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: { //configuración para la paleta utilizada
        'Gainsboro': '#EEF0F4', 
        'MintGreen': '#A0F280', 
        'SlateGray': '#7E8591', 
        'MidnightBlue': '#111C31', 
        'BurntSienna': '#f87171',
      },
      screens: { //configuración para las medidas de los brakpoints 
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
