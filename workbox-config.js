module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.{html,json,png,js,css}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};