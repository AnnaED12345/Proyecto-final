import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
            'Gainsboro': '#EEF0F4', //Blanco roto
            'MintGreen': '#A0F280', //Verde Menta
            'SlateGray': '#7E8591', //Gris Pizarra
            'MidnightBlue' : '#111C31', //Azul Medianoche
            'BurntSienna':'#f87171',
            },
        },
      
  },
  plugins: [],
} satisfies Config