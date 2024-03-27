/** @type {import('tailwindcss').Config} */

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#6C63FF',
				dark: {
					default: '#666666',
          lighter: '#999999',
          light: '#CCCCCC',
          darker: '#333333',
          darkest: '#000000',
				}
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
