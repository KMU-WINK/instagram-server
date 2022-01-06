const swaggerUi = require("swagger-ui-express");
const swaggereJsdoc = require("swagger-jsdoc");

const options = {
	swaggerDefinition: {
		info: {
			title: "[WINK x STACK] Instagram API",
			version: "1.0.0",
			description: "Instagram API Server Docs",
		},
		host: "localhost:3000",
		basePath: "/",
	},
	apis: [
		// Update TODO
		"./routes/*.js",
		"./swagger/*",
	],
};

const specs = swaggereJsdoc(options);

module.exports = {
	swaggerUi,
	specs,
};
