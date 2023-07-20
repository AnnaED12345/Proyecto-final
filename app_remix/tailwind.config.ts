import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        //configuración para la paleta utilizada
        Gainsboro: "#EEF0F4",
        MintGreen: "#A0F280",
        SlateGray: "#7E8591",
        MidnightBlue: "#111C31",
        BurntSienna: "#f87171",
      },
    },
  },
  plugins: [],
};

export default config;
