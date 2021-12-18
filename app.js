const express = require("express");

const { swaggerUi, specs } = require('./modules/swagger');

const app = express();
const port = 3000;

// API Server Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
