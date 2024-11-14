/** @type {import('tailwindcss').Config} */

// https://coolors.co/000814-001d3d-003566-ffc300-ffd60a
export default {
    content: [
        './index.html',
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'spiral': "url('/its_the_spiral.svg')",
            },
            colors: {
                neutral: {
                    light: '#F5F5F5',
                    DEFAULT: '#AAAAAA',
                    dark: '#333333',
                },
                rich_black: {
                    DEFAULT: '#000814',
                    100: '#000204',
                    200: '#000308',
                    300: '#00050c',
                    400: '#000710',
                    500: '#000814',
                    600: '#001f76',
                    700: '#0056d8',
                    800: '#3b89ff',
                    900: '#9dc4ff'
                },
                oxford_blue: {
                    DEFAULT: '#001d3d',
                    100: '#00060c',
                    200: '#000c18',
                    300: '#001225',
                    400: '#001831',
                    500: '#001d3d',
                    600: '#004997',
                    700: '#0074f1',
                    800: '#4ba2ff',
                    900: '#a5d1ff'
                },
                yale_blue: {
                    DEFAULT: '#003566',
                    100: '#000b14',
                    200: '#001529',
                    300: '#00203d',
                    400: '#002a52',
                    500: '#003566',
                    600: '#005fb8',
                    700: '#0a89ff',
                    800: '#5cb0ff',
                    900: '#add8ff'
                },
                mikado_yellow: {
                    DEFAULT: '#ffc300',
                    100: '#332700',
                    200: '#664e00',
                    300: '#997500',
                    400: '#cc9c00',
                    500: '#ffc300',
                    600: '#ffcf33',
                    700: '#ffdb66',
                    800: '#ffe799',
                    900: '#fff3cc'
                },
                gold: {
                    DEFAULT: '#ffd60a',
                    100: '#352c00',
                    200: '#6a5800',
                    300: '#9f8500',
                    400: '#d4b100',
                    500: '#ffd60a',
                    600: '#ffde3b',
                    700: '#ffe76c',
                    800: '#ffef9d',
                    900: '#fff7ce'
                },
                licorice: {
                    DEFAULT: '#0b0014',
                    100: '#020004',
                    200: '#040008',
                    300: '#07000c',
                    400: '#090010',
                    500: '#0b0014',
                    600: '#410076',
                    700: '#7700d8',
                    800: '#a73bff',
                    900: '#d39dff'
                }
            },
        },
    },
    plugins: [],
}
