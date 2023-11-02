const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

const primary = '#C43E2E';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      primary,
      transparent: colors.transparent,
      black: colors.black,
      white: colors.white,
      yellow: {
        700: '#E6BF5D',
      },
      gray: {
        300: '#d4d4d4',
        400: '#a3a3a3',
        500: '#737373',
        600: '#525252',
        700: '#404040',
        800: '#262626',
        900: '#171717',
        950: '#0D0D0D',
      },
    },
    extend: {
      spacing: {
        0.5: '0.125rem',
        layout: '2.75rem',
      },
      fontSize: {
        '2lg': '1.38rem',
      },
      borderRadius: {
        image: '0.5rem',
        layout: '0.8rem',
      },
      transitionTimingFunction: {
        DEFAULT: 'ease-in-out',
      },
      transitionDelay: {
        DEFAULT: '200ms',
      },
      zIndex: {
        1: '1',
        2: '2',
        3: '3',
      },
      keyframes: {
        fade: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        scaleIn: {
          '0%': {
            opacity: 0,
            transform: 'scale(0.9)',
          },
          '50%': {
            opacity: 0.3,
          },
          '100%': {
            opacity: 1,
            transform: 'scale(1)',
          },
        },
      },
      animation: {
        fade: 'fade .5s ease-in-out',
        scaleIn: 'scaleIn .35s ease-in-out',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    plugin(({ addComponents, theme, addUtilities }) => {
      addComponents({
        '.btn-primary': {
          backgroundColor: theme('colors.primary'),
          color: theme('colors.white'),
          borderRadius: '0.65rem',
          transition: 'background-color .2s ease-in-out',
          '&:hover': {
            backgroundColor: '#C53E2E',
          },
        },
        '.text-link': {
          borderRadius: theme('borderRadius.image'),
          color: theme('colors.white'),
          textDecoration: 'none',
          backgroundColor: theme('colors.gray.900'),
          boxShadow: theme('boxShadow.lg'),
        },
        '.air-block': {
          borderRadius: theme('borderRadius.layout'),
          color: theme('colors.white'),
          backgroundColor: theme('colors.gray.950'),
          boxShadow: theme('boxShadow.lg'),
        },
      }),
        addUtilities({
          '.text-shadow': {
            textShadow: '1px 1px rgba(0, 0, 0, 0.4)',
          },
          '.outline-border-none': {
            outline: 'none',
            border: 'none',
          },
          '.flex-center-between': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
          '.image-like-bg': {
            objectPosition: 'center',
            objectFit: 'cover',
            pointerEvents: 'none',
          },
          '-translate-y-5': {
            transform: 'translateY(-5px)',
          },
        });
    }),
  ],
};
