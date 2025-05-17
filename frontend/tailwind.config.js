/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#733A19',
          dark: '#5C2E14',
          light: '#BFAF8F',
        },
        secondary: {
          DEFAULT: '#153959',
        },
        neutral: {
          DEFAULT: '#0E1013',
          light: '#F2F0F0',
        },
      },
    },
  },
  plugins: [],
}; 