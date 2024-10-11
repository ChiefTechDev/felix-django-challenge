/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
    content: [
        './accounts_app/templates/**/*.html',
        './templates/**/*.html',
        'node_modules/preline/dist/*.js',
    ],
    darkMode: 'false',
    
    theme: {
        colors: {
            primary: {
                DEFAULT: '#a15cff',
                500: '#a15cff',
                600: '#8d39ff',
            },
            transparent: 'transparent',
            current: 'currentColor',
            black: colors.black,
            blue: colors.blue,
            emerald: colors.emerald,
            gray: colors.gray,
            green: colors.green,
            indigo: colors.indigo,
            orange: colors.orange,
            red: colors.red,
            white: colors.white,
            yellow: colors.yellow,
        },
        extend: {

        },
        fontFamily: {
            sans: ['"BasierSquare"', 'sans-serif'],
            serif: ['serif'],
            mono: ['monospace'],
        },
    },
    plugins: [
        require('preline/plugin'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ],
}

