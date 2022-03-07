const express = require("express");
const models = require("../models");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");

const unlinkAsync = promisify(fs.unlink);

const router = express.Router();

// 파일 경로 및 이름 설정 옵션
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, __dirname + "/../images"); // 파일 업로드 경로
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname); //파일 이름 설정
	},
});

const upload = multer({ storage: storage });

/**
 * @swagger
 * /businessCard/{userId}:
 *  post:
 *      tags: [businessCard]
 *      summary: 명함 업로드
 *      parameters:
 *          - in: path
 *            type: number
 *            required: true
 *            name: userId
 *            description: 유저 아이디
 *          - in: body
 *            type: file
 *            required: true
 *            name: businessCard
 *            description: 명함 이미지
 *      responses:
 *          400:
 *              description: 유저 아이디가 유효하지 않은 경우
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          example: 올바른 유저 아이디를 입력해주세요.
 *          200:
 *              description: 명함 업로드 성공
 *              schema:
 *                  type: object
 *
 *
 */

// 명함 업로드
router.post("/:userId", upload.array("file"), (req, res, next) => {
	/*
	 * Multer 미들웨어는 파일 업로드를 위해 사용되는 multipart/form-data에서 사용된다.
	 * 다른 폼으로 데이터를 전송하면 적용이 안된다.
	 * Header의 명시해서 보내주는게 좋다.
	 */
	const props = req.body;

	models.user
		.findOne({
			where: { id: req.params.userId },
		})
		.then((user) => {
			req.files.map((data) => {
				models.businessCard.create({
					frontImg: data.originalname,
					createdAt: Date(),
					updatedAt: Date(),
					user_id: user.dataValues.id,
				});
			});
			res.status(201).json(user);
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json({
				message: "올바른 유저 아이디를 입력해주세요.",
			});
		});
});

/**
 * @swagger
 * /businessCard/{userId}:
 *  get:
 *      tags: [businessCard]
 *      summary: 명함 조회
 *      parameters:
 *          - in: path
 *            type: number
 *            required: true
 *            name: userId
 *            description: 유저 아이디
 *      responses:
 *          400:
 *              description: 유저 아이디가 유효하지 않은 경우
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          example: not found user
 *          401:
 *              description: 이미지가 유효하지 않은 경우
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          example: not found businessCard
 *          200:
 *              description: 명함 조회 성공
 *              schema:
 *                  type: file
 *                  example: sample.png
 */

// 명함 조회
router.get("/:userId", (req, res, next) => {
	models.user
		.findOne({
			where: { id: req.params.userId },
		})
		.then((user) => {
			models.businessCard
				.findOne({
					where: { user_id: user.id },
					order: [["createdAt", "DESC"]],
				})
				.then((image) => {
					res.sendFile(path.resolve(__dirname + "/../images/" + image.dataValues.frontImg));
				})
				.catch((err) => {
					res.status(401).json({
						message: "not found businessCard",
					});
				});
		})
		.catch((err) => {
			res.status(400).json({
				message: "not found user",
			});
		});
});
/**
 * @swagger
 * /businessCard/{userId}:
 *  delete:
 *      tags: [businessCard]
 *      summary: 명함 삭제
 *      parameters:
 *          - in: path
 *            type: number
 *            required: true
 *            name: userId
 *            description: 유저 아이디
 *      responses:
 *          400:
 *              description: 유저 아이디가 유효하지 않은 경우
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          example: not found user
 *          401:
 *              description: 이미지가 유효하지 않은 경우
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          example: not found businessCard
 *          200:
 *              description: 명함 삭제 성공
 *              schema:
 *                  type: string
 *                  example: "success delete"
 */
router.delete("/:userId", (req, res, next) => {
	models.user
		.findOne({
			where: { id: req.params.userId },
		})
		.then((user) => {
			models.businessCard
				.findOne({
					where: { user_id: user.id },
				})
				.then((image) => {
					fs.unlink(__dirname + "/../images/" + image.dataValues.frontImg, (err) => console.log(err));

					models.businessCard.destroy({
						where: { id: image.dataValues.id },
					});
					res.status(201).json({
						message: "success delete",
					});
				})
				.catch((err) => {
					res.status(401).json({
						message: "can not find card",
					});
				});
		})
		.catch((err) => {
			res.status(400).json({
				message: "can not find user",
			});
		});
});
module.exports = router;
