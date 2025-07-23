/** @type {import('tailwindcss').Config} */

export default {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'focus-input': '0px 0px 0px 3px var(--primary-50)'
      },
      screens: {
        '4xl': '1920px',
        '5xl': '2048px'
      },
      fontFamily: {
        manrope: ['var(--font-family)']
      },
      colors: {
        primary: {
          base: 'var(--primary-500)',
          25: 'var(--primary-25)',
          50: 'var(--primary-50)',
          100: 'var(--primary-100)',
          200: 'var(--primary-200)',
          300: 'var(--primary-300)',
          400: 'var(--primary-400)',
          500: 'var(--primary-500)',
          600: 'var(--primary-600)',
          700: 'var(--primary-700)',
          800: 'var(--primary-800)',
          900: 'var(--primary-900)',
          950: 'var(--primary-950)'
        },
        blue: {
          base: 'var(--blue-500)',
          25: 'var(--blue-25)',
          50: 'var(--blue-50)',
          100: 'var(--blue-100)',
          200: 'var(--blue-200)',
          300: 'var(--blue-300)',
          400: 'var(--blue-400)',
          500: 'var(--blue-500)',
          600: 'var(--blue-600)',
          700: 'var(--blue-700)',
          800: 'var(--blue-800)',
          900: 'var(--blue-900)',
          950: 'var(--blue-950)'
        },
        complementary: {
          base: 'var(--complementary-500)',
          400: 'var(--complementary-400)',
          600: 'var(--complementary-600)',
          700: 'var(--complementary-700)',
          800: 'var(--complementary-800)',
          900: 'var(--complementary-900)',
          950: 'var(--complementary-950)'
        },
        green: {
          base: 'var(--green-500)',
          25: 'var(--green-25)',
          50: 'var(--green-50)',
          100: 'var(--green-100)',
          200: 'var(--green-200)',
          300: 'var(--green-300)',
          400: 'var(--green-400)',
          500: 'var(--green-500)',
          600: 'var(--green-600)',
          700: 'var(--green-700)',
          800: 'var(--green-800)',
          900: 'var(--green-900)',
          950: 'var(--green-950)'
        },
        neutral: {
          base: 'var(--neutral-500)',
          0: 'var(--neutral-0)',
          25: 'var(--neutral-25)',
          50: 'var(--neutral-50)',
          100: 'var(--neutral-100)',
          200: 'var(--neutral-200)',
          300: 'var(--neutral-300)',
          400: 'var(--neutral-400)',
          500: 'var(--neutral-500)',
          600: 'var(--neutral-600)',
          700: 'var(--neutral-700)',
          800: 'var(--neutral-800)',
          900: 'var(--neutral-900)',
          950: 'var(--neutral-950)'
        },
        purple: {
          base: 'var(--purple-500)',
          25: 'var(--purple-25)',
          50: 'var(--purple-50)',
          100: 'var(--purple-100)',
          200: 'var(--purple-200)',
          300: 'var(--purple-300)',
          400: 'var(--purple-400)',
          500: 'var(--purple-500)',
          600: 'var(--purple-600)',
          700: 'var(--purple-700)',
          800: 'var(--purple-800)',
          900: 'var(--purple-900)',
          950: 'var(--purple-950)'
        },
        red: {
          base: 'var(--red-500)',
          25: 'var(--red-25)',
          50: 'var(--red-50)',
          100: 'var(--red-100)',
          200: 'var(--red-200)',
          300: 'var(--red-300)',
          400: 'var(--red-400)',
          500: 'var(--red-500)',
          600: 'var(--red-600)',
          700: 'var(--red-700)',
          800: 'var(--red-800)',
          900: 'var(--red-900)',
          950: 'var(--red-950)'
        },
        yellow: {
          base: 'var(--yellow-500)',
          25: 'var(--yellow-25)',
          50: 'var(--yellow-50)',
          100: 'var(--yellow-100)',
          200: 'var(--yellow-200)',
          300: 'var(--yellow-300)',
          400: 'var(--yellow-400)',
          500: 'var(--yellow-500)',
          600: 'var(--yellow-600)',
          700: 'var(--yellow-700)',
          800: 'var(--yellow-800)',
          900: 'var(--yellow-900)',
          950: 'var(--yellow-950)'
        },
        gray: {
          base: 'var(--gray-500)',
          50: 'var(--gray-50)',
          100: 'var(--gray-100)',
          200: 'var(--gray-200)',
          300: 'var(--gray-300)',
          400: 'var(--gray-400)',
          500: 'var(--gray-500)',
          600: 'var(--gray-600)',
          700: 'var(--gray-700)',
          800: 'var(--gray-800)',
          900: 'var(--gray-900)'
        },
        black: {
          text: 'var(--neutral-950)'
        }
      }
    }
  },
  plugins: []
}
