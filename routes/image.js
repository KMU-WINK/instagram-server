const express = require("express");
const models = require("../models");

const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

fs.readdir("images", (error) => {
	// images 폴더 없으면 생성
	if (error) {
		fs.mkdirSync("images");
	}
});

const upload = multer({
	storage: multer.diskStorage({
		destination(req, file, cb) {
			cb(null, __dirname + "/../images");
		},
		filename(req, file, cb) {
			const ext = path.extname(file.originalname);
			cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
		},
	}),
	limits: { fileSize: 5 * 1024 * 1024 },
});

/**
 * @swagger
 *  /image/{articleId}:
 *    post:
 *      tags:
 *      - image
 *      description: 게시글의 image 등록
 *
 *      parameters:
 *        - in: formData
 *          name: file
 *          required: true
 *          description: image file
 *      responses:
 *       201:
 *        description: success save image
 */

router.post("/:articleId", upload.single("img"), (req, res) => {
	// 한 번에 여러개 image들어올 경우
	// const image = req.files;
	// const p = image.map(map => map.path)

	// console.log(image);
	// console.log(p)

	// console.log("file: ",req.file)
	// console.log(req.files)

	const articleId = req.params.articleId;
	console.log(articleId);

	models.article
		.findOne({
			where: {
				id: articleId,
			},
		})
		.then((article) => {
			models.image
				.create({
					url: `/images/${req.file.filename}`,
					createdAt: new Date(),
					updatedAt: new Date(),
					article_id: article.dataValues.id,
				})
				.then((image) => {
					res.status(201).json({
						message: "success save image",
						image,
					});
				})
				.catch((err) => {
					res.send(err);
				});
		});
});

/**
 * @swagger
 *  /image/{articleId}:
 *    get:
 *      tags:
 *      - image
 *      description: 게시글의 image 조회
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: image/{게시글 id}
 *
 *      responses:
 *       200:
 *        description: image 경로 return
 */
router.get("/:articleId", (req, res, next) => {
	const articleId = req.params.articleId;

	console.log(articleId);

	models.image
		.findAll({
			where: {
				article_id: articleId,
			},
		})
		.then((images) => {
			console.log(images);
			res.status(200).json({
				images: images,
			});
		})
		.catch((err) => {
			res.send(err);
		});
});

/**
 * @swagger
 *  /image/{imageId}:
 *    put:
 *      tags:
 *      - image
 *      description: 게시글의 image 업데이트
 *
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: image/{이미지 id}
 *
 *      responses:
 *       201:
 *        description: update image success
 */
router.put("/:imageId", upload.single("img"), (req, res, next) => {
	const imageId = req.params.imageId;

	console.log(req.file);

	models.image
		.update(
			{
				url: `/images/${req.file.filename}`,
				updatedAt: new Date(),
			},
			{
				where: {
					id: imageId,
				},
			}
		)
		.then((user) => {
			res.status(201).json({
				message: "update image success",
			});
		})
		.catch((err) => {
			res.send(err);
		});
});

/**
 * @swagger
 *  /image/{imageId}:
 *    delete:
 *      tags:
 *      - image
 *      description: 이미지 삭제
 *
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: image/{이미지 id}
 *
 *      responses:
 *       204:
 *
 */
router.delete("/:imageId", (req, res, next) => {
	const imageId = req.params.imageId;

	models.image
		.destroy({
			where: {
				id: imageId,
				// article_id:articleId,
			},
		})
		.then((user) => {
			console.log(user);
			res.status(204).send();
		})
		.catch((err) => {
			res.send(err);
		});
});
module.exports = router;
