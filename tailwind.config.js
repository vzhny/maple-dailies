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
        'maple-dailies-dark': {
          primary: '#6EE7B7',
          'primary-focus': '#10B981',
          'primary-content': '#171717',

          secondary: '#4C566A' /* Secondary color */,
          'secondary-focus': '#454D5F' /* Secondary color - focused */,
          'secondary-content': '#F9FAFB' /* Foreground content color to use on secondary color */,

          accent: '#a991f7' /* Accent color */,
          'accent-focus': '#8462f4' /* Accent color - focused */,
          'accent-content': '#F9FAFB' /* Foreground content color to use on accent color */,

          neutral: '#3d4451' /* Neutral color */,
          'neutral-focus': '#2a2e37' /* Neutral color - focused */,
          'neutral-content': '#F9FAFB' /* Foreground content color to use on neutral color */,

          'base-100': '#4B5563' /* Base color of page, used for blank backgrounds */,
          'base-200': '#46505D' /* Base color, a little darker */,
          'base-300': '#3D4651' /* Base color, even more darker */,
          'base-content': '#F9FAFB' /* Foreground content color to use on base color */,

          info: '#2094f3' /* Info */,
          success: '#009485' /* Success */,
          warning: '#ff9900' /* Warning */,
          error: '#ff5724' /* Error */,
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
