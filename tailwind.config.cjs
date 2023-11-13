/** @type {import('tailwindcss').Config}*/
const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      fontFamily: {
        sans: ['AT Name Sans', 'SF Pro', 'system-ui'],
        mono: ['Recursive']
      }
    }
  },

  plugins: [require('daisyui')],

  daisyui: {
    themes: ['fantasy']
  }
};

module.exports = config;
