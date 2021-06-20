require('dotenv').config();
const enablePurge = process.env.ENABLE_PURGE || false;
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');
const forms = require('@tailwindcss/forms');

module.exports = {
  purge: {
    enabled: enablePurge,
    content: ['./src/**/*.{html,ts}'],
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    spacing: {
      ...defaultTheme.spacing,
      'screen/10': '10vh',
      'screen/20': '20vh',
      'screen/30': '30vh',
      'screen/40': '40vh',
      'screen/50': '50vh',
      'screen/60': '60vh',
      'screen/70': '70vh',
      'screen/80': '80vh',
      'screen/90': '90vh',
    },
    container: {
      padding: '1rem',
    },
    zIndex: {
      ...defaultTheme.zIndex,
      900: 900,
      1000: 1000,
    },
    extend: {
      fontFamily: {
        serif: ['Merriweather', ...defaultTheme.fontFamily.serif],
        sans: ['IBM Plex Sans Condensed', ...defaultTheme.fontFamily.sans],
        mono: ['IBM Plex Mono', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        ...defaultTheme.colors,
        gray: colors.trueGray,
        green: colors.emerald,
      },
    },
  },
  plugins: [forms],
  variants: {
    extend: {
      backgroundColor: ['checked', 'disabled'],
      borderColor: ['checked'],
      borderWidth: ['last'],
      textColor: ['visited', 'disabled'],
      cursor: ['disabled'],
    },
  },
};
