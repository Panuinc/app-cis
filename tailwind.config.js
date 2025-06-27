/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        dark: "#0D0D0D",
        default: "#EBEBEB",
        primary: "#42BFED",
        secondary: "#F58F21",
        warning: "#FFD711",
        danger: "#DF3F31",
        success: "#C4E95D",
      },
    },
  },
  plugins: [],
};
