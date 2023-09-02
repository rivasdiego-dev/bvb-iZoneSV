import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export const content = [
  './pages/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
  './app/**/*.{js,ts,jsx,tsx,mdx}',
]
export const theme = {
  extend: {
    textShadow: {
      sm: '1px 1px 1px rgb(0 0 0 / 100%)',
      DEFAULT: '2px 2px 4px rgb(0 0 0 / 60%)',
      lg: '0 8px 16px rgb(0 0 0 / 100%)',
    },
    colors: {
      'primary': {
        '50': '#fffeea',
        '100': '#fff9c5',
        '200': '#fff485',
        '300': '#ffe846',
        '400': '#ffd81b',
        DEFAULT: '#ffba08',
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
        DEFAULT: '#1d70a2',
        '700': '#1a5e8a',
        '800': '#195073',
        '900': '#1a4360',
        '950': '#112b40',
      },
    }
  },
}
export const plugins = [
  plugin(function ({ matchUtilities, theme }) {
    matchUtilities(
      {
        'text-shadow': (value) => ({
          textShadow: value,
        }),
      },
      { values: theme('textShadow') }
    )
  }),
]
