const express = require("express");

const { swaggerUi, specs } = require("./modules/swagger");

const app = express();

const cors = require("cors");

const port = 3000;
const user = require("./routes/user");
const article = require("./routes/article");
const comment = require("./routes/comment");
const image = require("./routes/image");
const category = require("./routes/category");
const businessCard = require("./routes/businessCard");
const cookieParser = require("cookie-parser");
const { verifyToken } = require("./routes/authorization");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(
	cors({
		origin: "http://localhost:9000", // 출처 허용 옵션
		credential: "true",
	})
);

app.use("/auth", user);

app.use("/article", verifyToken, article);

app.use("/comment", verifyToken, comment);

app.use("/image", verifyToken, image);

app.use("/businessCard", businessCard);

app.use("/category", verifyToken, category);

// API Server Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", (req, res) => {
	res.send("aa");
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
