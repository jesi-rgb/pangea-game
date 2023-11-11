const { default: daisyui } = require('daisyui');

/** @type {import('tailwindcss').Config}*/
const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      fontFamily: {
        sans: ['AT Name Sans Variable']
      }
    }
  },

  plugins: [require('daisyui')],

  daisyui: {
    themes: ['corporate', 'dracula', 'cmyk']
  }
};

module.exports = config;
