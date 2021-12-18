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
    nickName:"test",
    description:"test",
    phoneNumber:"010-1234-6789",
    private:false,
}

router.get("/test", function(req, res, next){
    const token = req.cookies.user;
    let decoded = null
    console.log(token)
    if(token){
        decoded = jwt.verify(token, secretObj.secret);
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

    models.user.findOne({
        where:{
            email:"hpyho33@kookmin.ac.kr"
        }
    })
    .then(user => {
        console.log(user);
        if (!user){
            return res.status(403).json({
                loginSuccess:false,
                message:"이메일이 없어요",
            });
        }
        if(user.dataValues.password=== "test"){
            res.cookie("user", token);
            res.json({
                token:token
            })
        }
    })
    .catch(err => {
        res.status(500);
    })
});
router.get("/logout", function(req, res, next){
    return res.cookie("user", "").json({logoutSuccess:true})
})

router.get("/signup", function(req, res, next){
    const {
        email,
        password,
        userName,
        profileImg,
        nickName,
        description,
        phoneNumber,
        private,
    } = req.body || initialData;

    models.user.create({
        email:email,
        password:password,
        userName:userName,
        profileImg:profileImg,
        nickName:nickName,
        description:description,
        phoneNumber:phoneNumber,
        createdAt:new Date(),
        updatedAt:new Date(),
        private:private,
    })
    .then((user)=>{
        res.send(200)
    })
    .catch((err)=>{
        res.send(403)
    })
})

module.exports = router; 