import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
            'Gainsboro': '#EEF0F4', //Blanco roto
            'Mint Green': '#A0F280', //Verde Menta
            'Slate Gray': '#7E8591', //Gris Pizarra
            'Midnight Blue' : '#111C31' //Azul Medianoche
            }
          },
  },
  plugins: [],
} satisfies Config