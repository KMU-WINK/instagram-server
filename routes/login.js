const express = require("express");
const models = require("../models");

const router = express.Router();

const jwt = require("jsonwebtoken");
const secretObj = require("../config/jwt");

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

module.exports = router;