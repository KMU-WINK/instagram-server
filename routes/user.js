const express = require("express");
const models = require("../models");

const router = express.Router();

const jwt = require("jsonwebtoken");
const secretObj = require("../config/jwt");


const initialData = {
    email:"test",
    password:"test",
    userName:"test",
    profileImg:"https://asdasd.com",
    articleCount:1,
    followerCount:11,
    followCount:111,
    nickName:"test",
    webSite:"https://veloper.com",
    description:"test",
    phoneNumber:"010-1234-6789",
    sex:"male",
}

router.get("/test", function(req, res, next){
    const token = req.cookies.user;
    let decoded = null
    console.log(token)
    if(token){
        console.log(22)
        decoded = jwt.verify(token, secretObj.secret);
        console.log(11)
    }

    if(decoded){
        res.send("권한이 있네요")
    }
    else{
        res.send("권한이 없어요.")
    }
})

router.get("/login", function(req, res, next){
    const token = jwt.sign({
        email:"hpyho33@kookmin.ac.kr"
    },
    secretObj.secret,
    {
        expiresIn:"5m"
    })

    models.user.findAll({
        where:{
            email:"hpyho33@kookmin.ac.kr"
        }
    })
    .then(user => {
        if(user[0].dataValues.password=== "test"){
            res.cookie("user", token);
            res.json({
                token:token
            })
        }
    })
})

router.get("/signup", function(req, res, next){
    const {
        email,
        password,
        userName,
        profileImg,
        articleCount,
        followerCount,
        followCount,
        nickName,
        webSite,
        description,
        phoneNumber,
        sex
    } = req.body || initialData;

    models.user.create({
        email:email,
        password:password,
        userName:userName,
        profileImg:profileImg,
        articleCount:articleCount,
        followerCount:followerCount,
        followCount:followCount,
        nickName:nickName,
        webSite:webSite,
        description:description,
        phoneNumber:phoneNumber,
        sex:sex,
        createdAt:new Date(),
        updatedAt:new Date(),
    })
    .then((user)=>{
        res.send(user.nickName+"님"+"가입을 축하드립니다!")
    })
    .catch((err)=>{
        res.send("please data")
    })
})

module.exports = router; 