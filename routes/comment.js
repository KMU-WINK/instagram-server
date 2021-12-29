const express = require("express");
const models = require("../models");

const router = express.Router();

const jwt = require("jsonwebtoken");
const secretObj = require("../config/jwt");
const comment = require("../models/comment");
const article = require("../models/article");

/**
 * @swagger
 *  /comment/{articleId}:
 *    get:
 *      tags:
 *      - comments
 *      description: 게시글의 댓글 조회
 *      
 *      parameters:
 *        - in: path
 *          name: articleId
 *          required: true
 *          description: 게시글 id
 *      responses:
 *       200:
 *        description: 댓글 목록
 */

// 게시글 댓글 조회
router.get("/:articleId",(req,res,next)=>{
    const articleId = req.params.articleId

    models.comment.findAll({
        where: {
            article_id: articleId
        }
    })
    .then((user)=>{
        console.log(user)
        res.status(200).json({
            comments: user
        })
    })
    .catch((err)=>{
        res.send(err)
    })
})


/**
 * @swagger
 *  /comment/{articleId}:
 *    post:
 *      tags:
 *      - comments
 *      description: 게시글의 댓글 조회
 *      Authorization: Bearer <token>
 *      parameters:
 *        - in: path
 *          name: articleId
 *          required: true
 *          description: 게시글 id
 *        - in: body
 *          name: content
 *          type: object
 *          properties: 
 *              content:
 *                  type: string
 *          description: 댓글 내용
 *      responses:
 *       201:
 *        description: 작성 성공
 *       400:
 *        description: 댓글 내용 없음
 */
router.post("/:articleId", (req,res,next) =>{
    const content = req.body.content
    const articleId = req.params.articleId
    
    console.log(content)
    console.log(articleId)

    // 댓글에 아무 글자 없으면 400 return
    if (content){
        models.comment.create({
            content:content,
            createdAt: new Date(),
            updatedAt: new Date(),
            article_id:articleId,
        })
        .then((user)=>{
            res.status(201).json({
                message: "post comment success"
            })
        })
        .catch((err)=>{
            console.log("error")
            res.send(err)
        })
    }
    else{
        res.status(400).json({
            message: "input comment"
        })
    }

    // 개발할 때 테스트 때문에 token부분 주석처리 했습니다.

    // const token = req.cookies.user;

    // if(token){
    //     if (content){
    //         models.comment.create({
    //             content:content,
    //             createdAt: new Date(),
    //             updatedAt: new Date(),
    //             article_id:articleId,
    //         })
    //         .then((user)=>{
    //             res.status(201).json({
    //                 message: "post comment success"
    //             })
    //         })
    //         .catch((err)=>{
    //             console.log("error")
    //             res.send(err)
    //         })
    //     }
    //     else{
    //         res.status(400).json({
    //             message: "input comment"
    //         })
    //     }
    // }
    // else{
    //     res.status(401).json({
    //         message: "need auth"
    //     });
    // }
    
})


/**
 * @swagger
 *  /comment/{commentId}:
 *    delete:
 *      tags:
 *      - comments
 *      description: 댓글 삭제
 *      
 *      parameters:
 *        - in: path
 *          name: commentId
 *          required: true
 *          description: 게시글 id
 *      responses:
 *       204: 
 */
router.delete("/:commentId",(req,res,next) =>{
    const commentId = req.params.commentId

    models.comment.destroy({
        where:{
            id:commentId,
            // article_id:articleId,
        }
    })
    .then((user) =>{
        console.log(user)
        res.status(204).send()
    })
    .catch((err) => {
        res.send(err)
    })
})

/**
 * @swagger
 *  /comment/{commentId}:
 *    put:
 *      tags:
 *      - comments
 *      description: 게시글의 댓글 수정
 *      
 *      parameters:
 *        - in: path
 *          name: commentId
 *          required: true
 *          description: 게시글 id
 *        - in: body
 *          name: content
 *          type: object
 *          properties: 
 *              content:
 *                  type: string
 *          description: 댓글 내용
 *      responses:
 *       201:
 *        description: 댓글 업데이트 성공
 *       400:
 *        description: 댓글 내용 없음
 */

 // token 인증 구현 필요
router.put("/:commentId",(req,res,next) =>{
    const commentId = req.params.commentId
    const content = req.body.content

    if (content){

        models.comment.update({
            content: content,
            updatedAt: new Date(),
        },{
            where:{
                id:commentId
            }
        })
        .then((user)=>{
            res.status(201).json({
                message: "update comment success"
            })
        })
        .catch((err)=>{
            res.send(err)
        })
        
    }
    else{
        res.status(400).json({
            message: "input comment"
        })
    }

    
})


module.exports = router; 