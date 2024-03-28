/** @type {import('tailwindcss').Config} */

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#6C63FF',
				dark: {
					bg: '#121212',
					card: '#1E1E1E',
					popup: '#2D2D2D',
				},
			},
		},
	},
	daisyui: {
		themes: ['light', 'dark'],
		DarkTheme: 'dark',
	},
	// eslint-disable-next-line no-undef
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
