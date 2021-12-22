const express = require("express");
const models = require("../models");

const router = express.Router();

const jwt = require("jsonwebtoken");
const secretObj = require("../config/jwt");


const initialData = {
    userId:13,
    thumbnail:"http://beutifulImg.com",
    images:"test",
    location:"namyangju",
    content:"여기 진짜 이쁘죠 ~ #하준혁화장실",

}

router.get("/upload", function(req, res, next){

    const token = req.cookies.user;
    const {
        userId,
        thumbnail, 
        location,
        content,
    } = req.body || initialData;

    if(token){
        models.article.create({
            
            thumbnail:thumbnail,
            location:location,
            content:content,
            createdAt:new Date(),
            updatedAt:new Date(),
            user_id:userId,
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

    const {articleId, userId} = req.body || {articleId : 28, userId:13};

    if(token){
        models.article.destroy({
            where:{
                id:articleId,
                user_id:userId,
            }
        })
        .then((user) =>{
            res.send(200);
        })
    }
})

module.exports = router; 