const express = require("express");
const models = require("../models");

const router = express.Router();

const jwt = require("jsonwebtoken");
const secretObj = require("../config/jwt");
const comment = require("../models/comment");
const article = require("../models/article");

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