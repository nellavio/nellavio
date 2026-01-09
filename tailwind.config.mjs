/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: [
    "./src/layout/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
    "./src/**/*.{js,jsx,ts,tsx,vue}",
  ],
  plugins: [],
};

export default config;