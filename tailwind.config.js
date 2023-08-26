/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          '50': '#fffeea',
          '100': '#fff9c5',
          '200': '#fff485',
          '300': '#ffe846',
          '400': '#ffd81b',
          default: '#ffba08',
          '600': '#e28d00',
          '700': '#bb6302',
          '800': '#984c08',
          '900': '#7c3e0b',
          '950': '#482000',
        },
        'secondary': {
          '50': '#f2f9fd',
          '100': '#e4f0fa',
          '200': '#c4e1f3',
          '300': '#8fc9ea',
          '400': '#54addc',
          '500': '#2e93c9',
          default: '#1d70a2',
          '700': '#1a5e8a',
          '800': '#195073',
          '900': '#1a4360',
          '950': '#112b40',
        },
      }
    },
  },
  plugins: [],
}
