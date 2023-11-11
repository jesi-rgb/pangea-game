/** @type {import('tailwindcss').Config}*/
const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      fontFamily: {
        sans: ['AT Name Sans Variable', 'SF Pro', 'system-ui']
      }
    }
  },

  plugins: [require('daisyui')],

  daisyui: {
    themes: ['light', 'dark', 'cmyk']
  }
};

module.exports = config;
