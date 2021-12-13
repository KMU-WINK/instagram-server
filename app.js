const express = require("express");
const app = express();
const port = 3000;
const user = require('./routes/user');
const article = require('./routes/article');
const comment = require('./routes/comment');
const image = require('./routes/image');
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use('/auth', user);

app.use("/article", article);

app.use("/comment", comment);

app.use("/image", image);

app.get("/", (req, res) => {
	res.send("aa");
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
