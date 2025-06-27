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
  plugins: [],
};
