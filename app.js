const express = require("express");

const { swaggerUi, specs } = require('./modules/swagger');

const app = express();
const port = 3000;
const user = require('./routes/user');
const article = require('./routes/article');
const comment = require('./routes/comment');
const image = require('./routes/image');
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/auth', user);

app.use("/article", article);

app.use("/comment", comment);

app.use("/image", image);

// API Server Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", (req, res) => {
	res.send("aa");
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
