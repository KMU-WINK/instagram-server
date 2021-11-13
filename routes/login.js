const express = require("express");
const models = require("../models");
const router = express.Router();

const jwt = require("jsonwebtoken");
const secretObj = require("../config/jwt");

router.get("/login", function(req, res, next){
    res.send("aaa");
    const token = jwt.sign({
        email:"hpyho33@kookmin.ac.kr"
    },
    secretObj.secret,
    {
        expiresIn:"5m"
    })

    models.user.find({
        where:{
            email:"hpyho33@kookmin.ac.kr"
        }
    })
    .then(user => {
        if(user.pwd === "test"){
            res.cookie("user", token);
            res.json({
                token:token
            })
        }
    })
})

module.exports = router;