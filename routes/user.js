
const express = require("express");
const models = require("../models");

const router = express.Router();

const jwt = require("jsonwebtoken");
const secretObj = require("../config/jwt");
const bcrypt = require("bcrypt");

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
/**
 * @swagger
 * tags:
 *   name: User
 *   description: 유저 정보 처리
 * definitions:
 *   User:
 *     type: "object"
 *     properties:
 *       email:
 *         type: "string"
 *       password:
 *         type: "string"
 *       userName:
 *         type: "string"
 *       profileImg:
 *         type: "string"
 *       nickname:
 *         type: "string"
 *       description:
 *         type: "string"
 *       private:
 *         type: "integer"
 *         form: "int64"
 *       createdAt:
 *         type: string
 *         format: date
 *       updatedAt:
 *         type: string
 *         format: date
*/

/**
 * @swagger
 * /auth/test:
 *   get:
 *    tags:
 *    - User
 *    description: 토큰 유효 검사
 *    produces:
 *    - application/json
 *    responses:
 *      200:
 *        description: 권한이 있음
 *      401:
 *        description: 권한이 없음
 */
//test get
router.get("/test", function(req, res, next){
    const token = req.cookies.user;
    let decoded = null
    console.log(token)
    
    if(token){
        decoded = jwt.verify(token, secretObj.secret);
    }

    if(decoded){
        res.json({
            status: 200,
            description: "권한이 있네요"
        })
    }
    else{
        res.json({
            status: 401,
            description: "권한이 없네요"
        })
    }
})


//login get
// router.get("/login", function(req, res, next){
//     const token = jwt.sign({
//         email:"hpyho33@kookmin.ac.kr"
//     },
//     secretObj.secret,
//     {
//         expiresIn:"5m"
//     })

//     models.user.findOne({
//         where:{
//             email:"hpyho33@kookmin.ac.kr"
//         }
//     })
//     .then(user => {
//         console.log(user);
//         if (!user){
//             return res.status(403).json({
//                 loginSuccess:false,
//                 message:"이메일이 없어요",
//             });
//         }
//         if(user.dataValues.password=== "test"){
//             res.cookie("user", token);
//             res.json({
//                 token:token
//             })
//         }
//     })
//     .catch(err => {
//         res.status(500);
//     })
// });

/**
 * @swagger
 * /auth/login:
 *   post:
 *    tags:
 *    - User
 *    description: 로그인 (이메일 존재, 비밀번호 일치 검사), 토큰 생성
 *    produces:
 *    - application/json
 *    parameters:
 *      - in: body
 *        name: user
 *        description: 유저의 이메일과 비밀번호
 *        schema:
 *          type: object
 *          required:
 *            - email
 *              password
 *          properties:
 *            email: 
 *              type: string
 *            password:
 *              type: string
 */
//login post
router.post("/login", function(req, res){
    let email = req.body.email;
    let password = req.body.password;

    const token = jwt.sign({
        email: email
    },
    secretObj.secret,
    {
        expiresIn:"5m"
    })

    models.user.findOne({
        where:{
            email: email
        }
    }).then(user => {
        if(user){
            if(bcrypt.compareSync(password, user.dataValues.password)){     
                res.cookie("user", token);
                res.json({token: token});
            }
            else{
                res.json({
                    "status" : 401,
                    "message" : "비밀번호가 틀렸습니다."
                    });
            }
        }
        else{
            res.json({
                "status": 401,
                "message": "이메일이 존재하지 않습니다."
            });
        }
        console.log(user);
    })
})
//login put
router.put("/login", function(req, res){res.sendStatus(405)})
//login delete
router.delete("/login", function(req, res){res.sendStatus(405)})

/**
 * @swagger
 * /auth/logout:
 *   get:
 *    tags:
 *    - User
 *    description: 로그아웃(토큰 초기화)
 *    produces:
 *    - application/json
 *    responses:
 *      201:
 *        description: 성공
 */
//logout get
router.get("/logout", function(req, res, next){
    res.sendStatus(201);
    return res.cookie("user", "").json({logoutSuccess:true})
})
//logout post
router.post("/logout", function(req,res){res.sendStatus(405)})
//logout put
router.put("/logout", function(req,res){res.sendStatus(405)})
//logout delete
router.delete("/logout", function(req,res){res.sendStatus(405)})



//signup get
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
        res.sendStatus(201)
    })
    .catch((err)=>{
        res.sendStatus(403)
    })
})

//signup post
router.post("/signup", function(req, res, next){
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

    

    models.user.findOne({
        where:{
            email: email
        }
    }).then(user => {
        //email already exist
        if(user){
            res.json({
                "status": 405,
                "message": "이미 존재하는 아이디입니다."
            });
        }
        //empty 프론트엔드에서 처리할 것 같아서 주석처리했습니다.
        //else if(!email){
        //    res.send(405+"\n 이메일을 적어주세요");
        //}
        else{
            let encryptedPW = bcrypt.hashSync(password,10);
            console.log(encryptedPW);
        
            models.user.create({
                email:email,
                password:encryptedPW,
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
                res.sendStatus(201)
            })
            .catch((err)=>{
                res.sendStatus(403)
            })
        }
    })
})
//router put
router.put("/signup", function(req,res,next){res.sendStatus(405)})
//router delete
router.delete("/signup", function(req,res){res.sendStatus(405)})


//middle ware : before run method, check whether is token invalid, 이 뒤에 있는 메소드들은 미들웨어를 거침 
//router.use("/*", function(req, res, next){
//    console.log("enter middleware");
//    const token = req.cookies.user;
//    try{
//        jwt.verify(token, secretObj.secret);
//        next();
//    }catch{
//        console.log("invalid token + ", token);
//    }
//})

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