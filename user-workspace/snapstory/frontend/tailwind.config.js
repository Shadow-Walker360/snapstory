module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4f46e5',
          dark: '#6366f1'
        },
        secondary: {
          light: '#f43f5e',
          dark: '#fb7185'
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}