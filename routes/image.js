const express = require("express");
const models = require("../models");

const router = express.Router();


const initialData = {
    articleId:27,
    url:"https://beutifulimage.com",
}

router.get("/upload", function(req, res, next){

    const token = req.cookies.user;
    const {
        articleId,
        url,
    } = req.body || initialData;

    if(token){
        models.image.create({
            url:url,
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

    const {articleId, imageId} = req.body || {articleId : 27, imageId:3};

    if(token){
        models.image.destroy({
            where:{
                id:imageId,
                article_id:articleId,
            }
        })
        .then((user) =>{
            res.send(200);
        })
    }
})


module.exports = router; 