const express = require("express");
const models = require("../models");

const router = express.Router();

const jwt = require("jsonwebtoken");
const secretObj = require("../config/jwt");


// 유저 게시글 조회
// 특정 유저 피드에 들어갔을 때 모든 게시글 가져오기
router.get("/users/:userId", (req, res, next) => {

    const userId = req.params.userId;

    models.article.findAll({
        where: {
            user_id: userId
        }
    })
    .then((article)=>{
        if (!article === []) {
            res.status(200).json({
                articles: article
            })
        }
        else {
            res.status(404).json({
                message: "Not Found"
            });
        }
        
    })
    .catch((err)=>{
        res.send(err);
    });

});

// 게시글 단일 조회
router.get("/:id", (req, res, next) => {
    const id = req.params.id;

    models.article.findOne({
        where: {
            id: id
        }
    })
    .then((article) => {
        if (!article) {
            res.status(404).json({
                message: "Not Found"
            });
        }
        else {
            res.status(200).json(article);
        }
    })
    .catch((err) => {
        res.send(err);
    });
});

// 게시글 업로드
router.post("/upload/:userId", (req, res, next) => {
    // const token = req.cookies.user; // 토큰 인증 없는 상태로 구현

    const userId = req.params.userId;

    models.article.create({
        thumbnail: req.body.thumbnail,
        location: req.body.location,
        content: req.body.content,
        createdAt: new Date(),
        updatedAt: new Date(),
        user_id: userId,
    })
    .then((user)=>{
        res.status(201).json(user);
    })
    .catch((err)=>{
        res.send(err)
    })

});

// 게시글 삭제
router.delete("/id/:id/userId/:userId", (req, res, next) => {
    const articleId = req.params.id;
    const userId = req.params.userId;

    models.article.destroy({
        where: {
            id: articleId,
            user_id: userId
        }
    })
    .then((responseRecord) => {
        if (responseRecord === 1) {
            res.status(204).send();
        }
        else {
            res.status(404).json({message: "Not Found"});
        }
    })
    .catch((err) => {res.send(err);});
});

// 게시글 일부 수정
router.patch("/:id", (req, res, next) => {
    const articleId = req.params.id;

    const location = req.body.location;
    const thumbnail = req.body.thumbnail;
    const content = req.body.content;

    models.article.update({
        thumbnail: thumbnail,
        location: location,
        content: content,
        updatedAt: new Date(),
    }, {
        where: {
            id: articleId
        }
    })
    .then((result) => {
        res.status(201).json({message: "success update article"});
    })
    .catch((err) => res.send(err));
});



module.exports = router; 