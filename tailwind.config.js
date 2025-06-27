/** @type {import('tailwindcss').Config} */
import { heroui } from "@heroui/react";
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        dark: "#21212D",
        default: "#EDEDED",
        primary: "#C7FC3D",
        secondary: "#15141A",
        warning: "#FFDC5F",
        danger: "#FE3332",
        success: "#65C800",
      },
    },
  },
  plugins: [heroui()],
};
