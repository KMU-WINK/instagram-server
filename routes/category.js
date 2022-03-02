const express = require("express");
const models = require("../models");

const router = express.Router();

/** 
 * @swagger 
 * /category/{userId}:
 *  get:
 *      tags: [Category]
 *      description: 카테고리 조회
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            type: number
 *            required: true
 *            name: userId
 *            description: 유저 아이디
 *      responses:
 *        502:
 *          description: 잘못된 접근
 *        201:
 *          description: 정상적으로 생성
 *          schema:
 *              type: object
 *              properties:
 *                  categories:
 *                      type: string
 *                      example: '[1,2,3,4]'
 */

// 카테고리 조회
router.get("/:userId", (req, res, next) => {

    models.category.findAll({
        where: { user_id: req.params.userId }
    }).then((categories) => {
        res.status(200).json({
            categories: categories
        })
    })
        .catch(err => {
            console.log(err);
            res.status(502).json({
                message: "올바르지 않은 접근입니다."
            });
        })
});

/** 
 * @swagger 
 * /category/{userId}:
 *  post:
 *      tags: [Category]
 *      description: 카테고리 업로드
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: body
 *            name: category
 *            description: 카테고리 타이틀과 게시글 순서
 *            schema:
 *              type: object
 *              required:
 *                  - title
 *                    articles
 *              properties:
 *                  title:
 *                      type: string
 *                  sequence:
 *                      type: string
 *      responses:
 *        403:
 *          description: 잘못된 입력 
 *        201:
 *          정상적으로 생성
 */

// 카테고리 업로드
router.post("/:userId", (req, res, next) => {

    const {
        title,
        articles,
    } = req.body;

    models.user.findOne({
        where: { id: req.params.userId }
    }).then(() => {
        models.category.create({
            title: title,
            articles: articles,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        res.status(200).json({
            message: "success create category"
        })
    })
        .catch(err => {
            console.log(err);
            res.status(400).json({
                message: "올바른 유저 아이디를 입력해주세요."
            });
        })
});

/** 
 * @swagger 
 * /category/{userId}:
 *  put:
 *      tags: [Category]
 *      description: 카테고리 업데이트
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: user id
 *            description: 카테고리 아이디 
 *            required: true
 *              
 *          - in: body
 *            name: category title
 *            description: 카테고리 타이틀
 *            schema:
 *              type: string
 *              example: '#modify'
 *              
 *      responses:
 *        403:
 *          description: 잘못된 입력 
 *        201:
 *          description: 정상적으로 생성
 */

// 카테고리 업데이트
router.put("/:categoryId", (req, res, next) => {
    
    const categoryId = req.params.categoryId;

    const {title} = req.body;

    models.category.update({
        title:title,
    },{
        where:{
            id:categoryId,
        }
    })
    .then(()=>{
        res.status(201).json({
            message:"update category success"
        })
    })
    .catch(()=>{
        res.status(400).json({
            message:"제대로 줘."
        })
    })
})

/** 
 * @swagger 
 * /category/sequece:
 *  put:
 *      tags: [Category]
 *      description: 게시글 순서 업데이트
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: body
 *            name: body
 *            description: 게시글 순서 정보
 *            schema:
 *              type: object
 *              required:
 *                  - categoryId
 *                    articles
 *              properties:
 *                  categoryId:
 *                      type: number
 *                  articles:
 *                      type: string
 *              
 *      responses:
 *        400:
 *          description: 잘못된 입력 
 *        201:
 *          description: 정상적으로 수정
 */

// 게시글 순서 업데이트 
router.put("/sequence", (req, res, next) => {
    const {
        categoryId,
        articles
    } = req.body;

    if (articles) {
        console.log(categoryId, articles)
        models.category.update({
                articles: articles,
            },{
                where:{
                    id:2
                }
            })
            .then(()=>{
                res.status(201).json({
                    message: "update sequence success"
                })
            }).catch((err)=>{
                res.status(400).json({
                    message:"올바른 게시글 순서를 입력하시오."
                })
            }
        )
    }
    else{
        res.status(400).json({
            message:"올바른 게시글 순서를 입력하시오."
        })
    }
})

/** 
 * @swagger 
 * /category/{userId}:
 *  delete:
 *      tags: [Category]
 *      description: 카테고리 삭제
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            type: number
 *            required: true
 *            name: userId
 *            description: 유저 아이디
 *      responses:
 *        400:
 *          description: 유효하지 않은 카테고리 아이디
 *        201:
 *          description: 정상적으로 삭제
 */

// 카테고리 삭제
router.delete("/:categoryId", (req, res, next) => {

    const categoryId = req.params.categoryId;
    
    models.category.destroy({
        where:{
            id:categoryId,
        }
    })
    .then(() =>{
        res.status(201).json({
            message:"success delete category"
        })
    })
    .catch((err) => {
        console.log(err)
        res.status(400).json({
            message:"카테고리 아이디가 유효하지 않습니다."
        })
    })
})

module.exports = router;