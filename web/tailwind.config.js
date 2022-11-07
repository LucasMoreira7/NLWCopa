/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
  ],
  theme: {
    extend: {
      backgroundImage: {
        app: 'url(/app-bg.png)'
      },
      fontFamily: {
        sans: 'roboto, sans-serif'
      },
      colors: {
        gray: {
          300: '#8D8D99',
          800: '#202024',
          600: '#323238',
          900: '#121214',
          100: '#E1E1E6'
        },
        ignite: {
          500: '#129E57'
        },
        yellow: {
          500: '#F7DD43',
          700:'#E5CD3D'
        }

      },
    },
  },
  plugins: [],
}
