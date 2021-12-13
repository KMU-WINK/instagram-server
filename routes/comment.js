const express = require("express");
const models = require("../models");

const router = express.Router();

const jwt = require("jsonwebtoken");
const secretObj = require("../config/jwt");
const comment = require("../models/comment");
const article = require("../models/article");


const initialData = {
    articleId:28,
    content:"준혁씨 ~ 버그 생겼는데 직접 와서 해결좀 해줘요 우리 잘못 아니니까.",

}

router.get("/upload", function(req, res, next){

    const token = req.cookies.user;
    const {
        articleId,
        content,
    } = req.body || initialData;

    if(token){
        models.comment.create({
            content:content,
            createdAt: new Date(),
            updatedAt: new Date(),
            article_id:articleId,
        })
        .then((user)=>{
            res.send(200)
        })
        .catch((err)=>{
            res.send(err)
        })
    }
    else{
        res.status(400);
    }
});

router.get("/delete", function(req, res, next){

    const token = req.cookies.user;

    const {articleId, commentId} = req.body || {articleId : 22, commentId:5};

    if(token){
        models.comment.destroy({
            where:{
                id:commentId,
                article_id:articleId,
            }
        })
        .then((user) =>{
            res.send(200);
        })
    }
})


module.exports = router; 