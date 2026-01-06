/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./views/**/*.{vue,js,ts,jsx,tsx}" 
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(0 0% 100%)',
        foreground: 'hsl(222.2 84% 4.9%)',
        card: 'hsl(0 0% 100%)',
        'card-foreground': 'hsl(222.2 84% 4.9%)',
        primary: 'hsl(200 100% 50%)',
        'primary-foreground': 'hsl(210 40% 98%)',
        'muted-foreground': 'hsl(215.4 16.3% 46.9%)',
        border: 'hsl(214.3 31.8% 91.4%)',
      }
    },
  },
  plugins: [],
}
