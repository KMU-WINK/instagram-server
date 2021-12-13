const express = require("express");
const models = require("../models");

const router = express.Router();

const jwt = require("jsonwebtoken");
const secretObj = require("../config/jwt");


const initialData = {
    user_id:1,
    thumbnail:"http://beutifulImg.com",
    images:"test",
    location:"namyangju",
    content:"여기 진짜 이쁘죠 ~ #하준혁화장실",

}

router.get("/upload", function(req, res, next){

    const token = req.cookies.user;
    const {
        user_id,
        thumbnail, 
        location,
        content,
    } = req.body || initialData;

    if(token){
        models.article.create({
            user_id:user_id,
            thumbnail:thumbnail,
            location:location,
            content:content,
        })
        .then((user)=>{
            res.send(200)
        })
        .catch((err)=>{
            res.send(403)
        })
    }
    else{
        res.status(400);
    }
});

router.get("/delete", function(req, res, next){

    const token = req.cookies.user;

    const {articleId} = req.body || 3;

    if(token){
        models.article.destroy({
            where:{
                id:articleId,
            }
        })
        .then((user) =>{
            res.send(200);
        })
    }
})


module.exports = router; 