const express = require("express");
const models = require("../models");

const router = express.Router();

const jwt = require("jsonwebtoken");
const secretObj = require("../config/jwt");

/**
 * @swagger
 * /article/users/{userId}:
 *  get:
 *      tags: [article]
 *      summary: 유저 게시글 전체 조회
 *      parameters:
 *          - in: path
 *            type: number
 *            required: true
 *            name: userId
 *            description: 유저 아이디
 *      responses:
 *          404:
 *              description: 유저 게시글 없는 경우
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          example: 유저의 게시글이 존재하지 않습니다.
 *          200:
 *              description: 게시글 조회 성공
 *              schema:
 *                  type: object
 *                  properties:
 *                      articles:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: number
 *                              thumbnail:
 *                                  type: string
 *                              location:
 *                                  type: string
 *                              content:
 *                                  type: string
 *                              createdAt:
 *                                  type: string
 *                              updatedAt:
 *                                  type: string
 *                              user_id:
 *                                  type: number
 */
// 유저 게시글 조회
// 특정 유저 피드에 들어갔을 때 모든 게시글 가져오기
router.get("/users/:userId", (req, res, next) => {
	const userId = req.params.userId;

	models.article
		.findAll({
			where: {
				user_id: userId,
			},
		})
		.then((article) => {
			if (article.length !== 0) {
				res.status(200).json({
					articles: article,
				});
			} else {
				res.status(404).json({
					message: "유저의 게시글이 존재하지 않습니다.",
					articles: [],
				});
			}
		})
		.catch((err) => {
			res.send(err);
		});
});

router.get("/", (req, res, next) => {
	models.article
		.findAll()
		.then((article) => {
			if (article.length !== 0) {
				res.status(200).json({
					articles: article,
				});
			} else {
				res.status(404).json({
					message: "게시글이 존재하지 않습니다.",
				});
			}
		})
		.catch((err) => {
			res.send(err);
		});
});

/**
 * @swagger
 * /article/{id}:
 *  get:
 *      tags: [article]
 *      summary: 게시글 단일 조회
 *      parameters:
 *          - in: path
 *            type: number
 *            required: true
 *            name: id
 *            description: 게시글 아이디
 *      responses:
 *          404:
 *              description: 존재하지 않는 게시글
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          example: 존재하지 않는 게시글입니다.
 *          200:
 *              description: 게시글 조회 성공
 *              schema:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: number
 *                      thumbnail:
 *                          type: string
 *                      location:
 *                          type: string
 *                      content:
 *                          type: string
 *                      createdAt:
 *                          type: string
 *                      updatedAt:
 *                          type: string
 *                      user_id:
 *                          type: number
 */
// 게시글 단일 조회
router.get("/:id", (req, res, next) => {
	const id = req.params.id;
	// const id = req.param('id');

	models.article
		.findOne({
			where: {
				id: id,
			},
		})
		.then((article) => {
			if (!article) {
				res.status(404).json({
					message: "존재하지 않는 게시글입니다.",
				});
			} else {
				res.status(200).json(article);
			}
		})
		.catch((err) => {
			res.send(err);
		});
});

/**
 * @swagger
 * /article/upload/{userId}:
 *  post:
 *      tags: [article]
 *      summary: 게시글 생성
 *      parameters:
 *          - in: path
 *            type: number
 *            required: true
 *            name: userId
 *            description: 유저 아이디
 *          - in: body
 *            name: 게시글 정보
 *            description: 썸네일, 위치 정보, 게시글 내용
 *            schema:
 *              type: object
 *              required:
 *                  - thumbnail
 *              properties:
 *                  thumbnail:
 *                      type: string
 *                  location:
 *                      type: string
 *                  content:
 *                      type: string
 *
 *      responses:
 *          400:
 *              description: 유저 아이디에 문자가 들어온 경우
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          example: 올바른 유저 아이디를 입력해주세요.
 *          201:
 *              description: 게시글 생성 성공
 *              schema:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: number
 *                      thumbnail:
 *                          type: string
 *                      location:
 *                          type: string
 *                      content:
 *                          type: string
 *                      createdAt:
 *                          type: string
 *                      updatedAt:
 *                          type: string
 *                      user_id:
 *                          type: number
 */

// 게시글 업로드
router.post("/upload/:userId", (req, res, next) => {
	// const token = req.cookies.user; // 토큰 인증 없는 상태로 구현

	models.article
		.create({
			thumbnail: req.body.thumbnail,
			location: req.body.location,
			content: req.body.content,
			createdAt: new Date(),
			updatedAt: new Date(),
			user_id: req.params.userId,
		})
		.then((user) => {
			res.status(201).json(user);
		})
		.catch((err) => {
			res.status(400).json({
				message: "올바른 유저 아이디를 입력해주세요.",
			});
		});
});

/**
 * @swagger
 * /article/{id}:
 *  delete:
 *      tags: [article]
 *      summary: 게시글 삭제
 *      parameters:
 *          - in: path
 *            name: id
 *            description: 게시글 아이디를 이용한 게시글 삭제
 *            type: number
 *            required: true
 *      responses:
 *          204:
 *              description: 게시글 삭제 성공
 *          404:
 *              description: 존재하지 않는 게시글
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          example: 존재하지 않는 게시글입니다.
 *
 */

// 게시글 삭제
router.delete("/:id", (req, res, next) => {
	const articleId = req.params.id;

	models.article
		.destroy({
			where: {
				id: articleId,
			},
		})
		.then((responseRecord) => {
			if (responseRecord === 1) {
				res.status(204).send();
			} else {
				res.status(404).json({ message: "존재하지 않는 게시글입니다." });
			}
		})
		.catch((err) => {
			res.send(err);
		});
});

/**
 * @swagger
 * /article/{id}:
 *  patch:
 *      tags: [article]
 *      summary: 게시글 수정
 *      parameters:
 *          - in: path
 *            name: id
 *            description: 게시글 아이디를 이용한 게시글 수정
 *            type: number
 *            required: true
 *          - in: body
 *            name: 게시글 정보
 *            description: 썸네일, 위치 정보, 게시글 내용
 *            schema:
 *              type: object
 *              properties:
 *                  thumbnail:
 *                      type: string
 *                  location:
 *                      type: string
 *                  content:
 *                      type: string
 *      responses:
 *          201:
 *              description: 게시글 수정 성공
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          example: success update article
 *          400:
 *              description: 아이디에 문자가 들어온 경우
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          example: 올바른 아이디를 입력해주세요.
 *
 */

// 게시글 일부 수정
router.patch("/:id", (req, res, next) => {
	const articleId = req.params.id;

	const location = req.body.location;
	const thumbnail = req.body.thumbnail;
	const content = req.body.content;

	models.article
		.update(
			{
				thumbnail: thumbnail,
				location: location,
				content: content,
				updatedAt: new Date(),
			},
			{
				where: {
					id: articleId,
				},
			}
		)
		.then((result) => {
			res.status(201).json({ message: "success update article" });
		})
		.catch((err) =>
			res.status(400).json({
				message: "올바른 아이디를 입력해주세요.",
			})
		);
});

module.exports = router;
