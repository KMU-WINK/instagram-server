
const express = require("express");
const models = require("../models");

const router = express.Router();

const jwt = require("jsonwebtoken");
const secretObj = require("../config/jwt");
const bcrypt = require("bcrypt");

const initialData = {
    profileImg:"https://update.com",
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
 *      type: "object"
 *      properties:
 *        email:
 *          type: "string"
 *        password:
 *          type: "string"
 *        userName:
 *          type: "string"
 *        profileImg:
 *          type: "string"
 *        nickname:
 *          type: "string"
 *        backgroundImage:
 *          type: "string"
 *        description:
 *          type: "string"
 *        private:
 *          type: "integer"
 *          form: "int64"
 *        themaColor:
 *          type: "string"
 *        createdAt:
 *          type: string
 *          format: date
 *        updatedAt:
 *          type: string
 *          format: date
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

router.get("/:userId", function(req, res, next){
    models.user.findOne({
        where:{
            id:req.params.userId
        }
    }).then(user=>{
        res.json({user:user})
    })
})



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
 *    responses:
 *      401:
 *        description: 입력오류
 *        schema:
 *          type: object
 *          properties:
 *            message:
 *              type: string
 *      200:
 *        description: 로그인 성공
 *        schema:
 *          type: object
 *          properties:
 *            token:
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
        expiresIn:"20m"
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
    })
})

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
 *      200:
 *        description: 성공
 */
//logout get
router.get("/logout", function(req, res, next){
    return res.cookie("user", "").json({logoutSuccess:true})
})

/**
 * @swagger
 * /auth/signup:
 *   post:
 *    tags:
 *    - User
 *    description: 회원가입
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
 *              userName
 *              profileImg
 *              nickName
 *              description
 *              private
 *              backgroundImage
 *              themaColor
 *              
 *          properties:           
 *            email: 
 *              type: string
 *            password:
 *              type: string
 *            userName:
 *              type: string
 *            profileImg:
 *              type: string
 *            nickName:
 *              type: string
 *            description:
 *              type: string
 *            private:
 *              type: boolean
 *            backgroundImage:
 *              type: string
 *            themaColor:
 *              type: string
 *    
 *    responces:
 *      403:
 *        description: 이미 존재하는 아이디
 *      201:
 *        description:  정상적으로 생성
 * 
 */
//signup post
router.post("/signup", function(req, res, next){
    const {
        email,
        password,
        userName,
        nickName,
    } = req.body || initialData;

    const {
        description,
        private,
        backgroundImage,
        themaColor,
        profileImg,
    } = initialData;

        models.user.findOne({
        where:{
            email: email
        }
    }).then(user => {
        //email already exist
        if(user){
            res.status(405).json({error: "이미 존재하는 아이디입니다."});
        }
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
                createdAt:new Date(),
                updatedAt:new Date(),
                private:private,
                backgroundImage:backgroundImage,
                themaColor:themaColor,
            })
            .then((user)=>{
                res.sendStatus(201)
            })
            .catch((err)=>{
                res.status(403).json({error: "생성 실패"});
            })
        }
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