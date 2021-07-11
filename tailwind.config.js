require('dotenv').config();
const enablePurge = process.env.ENABLE_PURGE || false;
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');
const forms = require('@tailwindcss/forms');
const typography = require('@tailwindcss/typography');
const daisyui = require('daisyui');

module.exports = {
  purge: {
    enabled: enablePurge,
    content: ['./src/**/*.{html,ts,css,scss}'],
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
    fontFamily: {
      condensed: ['IBM Plex Sans Condensed', ...defaultTheme.fontFamily.sans],
      cursive: ['Pacifico', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        ...defaultTheme.colors,
        gray: colors.trueGray,
        green: colors.emerald,
      },
    },
  },
  plugins: [forms, typography, daisyui],
  daisyui: {
    themes: [
      {
        'nord-like': {
          primary: '#6EE7B7' /* Primary color */,
          'primary-focus': '#10B981' /* Primary color - focused */,
          'primary-content': '#1A1D23' /* Foreground content color to use on primary color */,

          secondary: '#D8DEE9' /* Secondary color */,
          'secondary-focus': '#CBD3E2' /* Secondary color - focused */,
          'secondary-content': '#1A1D23' /* Foreground content color to use on secondary color */,

          accent: '#5E81AC' /* Accent color */,
          'accent-focus': '#5376A2' /* Accent color - focused */,
          'accent-content': '#ECEFF4' /* Foreground content color to use on accent color */,

          neutral: '#4C566A' /* Neutral color */,
          'neutral-focus': '#434C5E' /* Neutral color - focused */,
          'neutral-content': '#ECEFF4' /* Foreground content color to use on neutral color */,

          'base-100': '#434C5E' /* Base color of page, used for blank backgrounds */,
          'base-200': '#3B4252' /* Base color, a little darker */,
          'base-300': '#2E3442' /* Base color, even more darker */,
          'base-content': '#ECEFF4' /* Foreground content color to use on base color */,

          info: '#81A1C1' /* Info */,
          success: '#A3BE8C' /* Success */,
          warning: '#D08770' /* Warning */,
          error: '#BF616A' /* Error */,
        },
      },
    ],
  },
  variants: {
    extend: {
      backgroundColor: ['checked', 'disabled'],
      borderColor: ['checked'],
      borderWidth: ['last'],
      textColor: ['visited', 'disabled'],
      cursor: ['disabled'],
      margin: ['last'],
    },
  },
};
