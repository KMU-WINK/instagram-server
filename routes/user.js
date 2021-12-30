const express = require("express");
const models = require("../models");

const router = express.Router();

const jwt = require("jsonwebtoken");
const secretObj = require("../config/jwt");


const initialData = {
    email:"test",
    password:"update",
    userName:"update",
    profileImg:"https://update.com",
    nickName:"update",
    description:"test",
    private:false,
    backgroundImage:"https://image.com",
    themaColor:"#ff999",
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
        private,
        backgroundImage,
        themaColor,
    } = req.body || initialData;

    models.user.create({
        email:email,
        password:password,
        userName:userName,
        profileImg:profileImg,
        nickName:nickName,
        description:description,
        createdAt:new Date(),
        updatedAt:new Date(),
        private:private,
        backgroundImage:backgroundImage,
        themaColor:themaColor,
        selectedCategory:{1:"#ui_ux", 2:"#programming", 3:"#instaRedesign"}
        
    })
    .then((user)=>{
        res.send(200)
    })
    .catch((err)=>{
        res.send(err)
    })
})

router.get("/update", function(req, res, next){
    const token = req.cookies.user;

    const id = req.body || 5;

    const updatedProfile = req.body || initialData 
    console.log(updatedProfile);
    if (token) {
        models.user.update({
            nickName:updatedProfile.nickName,
            description:updatedProfile.description,
            email : updatedProfile.email,
            phoneNumber : updatedProfile.phoneNumber,
        },
        {
            where:{
                id:id,
        }}
        )
        .then(()=>[
            res.send(200)
        ])
        .catch((err)=>{
            res.send(err)
        })
    }
})

module.exports = router; 