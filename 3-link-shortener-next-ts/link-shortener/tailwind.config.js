/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				gray: {
					950: '#18181b',
				},
				blue: {
					920: '#2F879D',
					950: '#53B3CB',
					980: '#215F6E',
				},
			},
		},
		fontFamily: {
			allSite: ['Poppins', 'sans-serif'],
		},
	},
	plugins: [],
};
