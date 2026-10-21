/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sand: '#faf6ef',
        ink: '#17282a',
        lagoon: { DEFAULT: '#0f5e59', light: '#1b7f78', dark: '#0a3f3c' },
        saffron: { DEFAULT: '#f2b14a', dark: '#d9912a' },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
