/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest:  { DEFAULT: '#2d5a27', light: '#3d7a35', dark: '#1e3d1a' },
        tan:     { DEFAULT: '#c4a882', light: '#d4bfa0', dark: '#a08860' },
        bark:    { DEFAULT: '#6b4226', light: '#8b5e3c', dark: '#4a2c18' },
        cream:   '#faf7f2',
        parchment: '#f0e8d8',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"Lato"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
