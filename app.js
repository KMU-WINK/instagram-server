const express = require("express");
const app = express();
const port = 3000;
const login = require('./routes/user');
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use('/auth', login);

app.get("/", (req, res) => {
	res.send("aa");
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
