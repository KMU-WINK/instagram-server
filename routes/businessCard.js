const express = require("express");
const models = require("../models");

const router = express.Router();


/**
 * @swagger
 * /businessCard/upload/{userId}:
 *  get:
 *      tags: [businessCard]
 *      summary: 명함 업로드
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
 *                          example: 올바른 유저 아이디를 입력해주세요.
 *          200:
 *              description: 명함 업로드 성공
 *              schema:
 *                  type: object
 *                  
 *
 */

// 명함 업로드
router.get("/upload/:userId", (req, res, next) => {

    const props = req.body;

    models.user.findOne({
        where:{id:req.params.userId}
    }).then((user) => {
        models.businessCard.create({
            frontImg:props.frontImg,
            createdAt:Date(),
            updatedAt:Date(),
            user_id:user.dataValues.id
        })
        .then((user)=>{
            res.status(201).json(user);
        })
        .catch((err)=>{
            res.status(500).json({
                message:err,
            })
        })
    })
    .catch(err => {
        console.log(err);
        res.status(400).json({
            message: "올바른 유저 아이디를 입력해주세요."
        });
    })

    
});

module.exports = router; 