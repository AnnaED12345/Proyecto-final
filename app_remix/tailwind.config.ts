import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
            'Gainsboro': '#EEF0F4',
            }
          },
  },
  plugins: [],
} satisfies Config