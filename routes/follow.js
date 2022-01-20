const express = require("express");
const models = require("../models");
const user = require("../models/user");

const router = express.Router();

/**
 * @swagger
 * /follow:
 *  post:
 *      tags: [follow]
 *      summary: 팔로우 및 언팔로우
 *      parameters:
 *          - in: body
 *            name: from_user_id & to_user_id
 *            description: 팔로우 하는 유저의 id, 팔로우 대상 유저 id
 *            schema:
 *              type: object
 *              required:
 *                  - from_user_id
 *                  - to_user_id
 *              properties:
 *                  from_user_id:
 *                      type: number
 *                  to_user_id:
 *                      type: number
 *      responses:
 *          201:
 *              description: 팔로우 성공
 *              schema:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: number
 *                      from_user_id:
 *                          type: number
 *                      to_user_id:
 *                          type: number
 *                      updatedAt:
 *                          type: string
 *                      createedAt:
 *                          type: string
 *          204:
 *              description: 언팔로우 성공
 *          400:
 *              description: 리퀘스트 요청 에러
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: object
 */
// 팔로우, 언팔로우 기능 구현
// localhost:3000/follow
router.post('', (req, res, next) => {

    models.follow.findOne({
        where: {
            from_user_id: req.body.from_user_id,
            to_user_id: req.body.to_user_id
        }
    }).then((result) => {
        // follow 정보 없으므로 following
        if (result === null) {
            models.follow.create({
                from_user_id: req.body.from_user_id,
                to_user_id: req.body.to_user_id
            })
            .then((user)=>{
                res.status(201).json(user);
            })
            .catch((err)=>{
                res.status(400).json({
                    message: err
                });
            })
        }
        // 이미 follow 정보 있으므로 un-following
        else {
            models.follow.destroy({
                where: {
                    from_user_id: req.body.from_user_id,
                    to_user_id: req.body.to_user_id
                }
            })
            .then((responseRecord) => {
                if (responseRecord === 1) {
                    res.status(204).send();
                }
            })
            .catch((err) => {res.send(err);});
        }
    })    
});


/**
 * @swagger
 * /follow/following:
 *  post:
 *      tags: [follow]
 *      summary: 팔로잉한 유저 이름 목록 가져오기
 *      parameters:
 *          - in: body
 *            name: user_id
 *            description: 해당 유저의 id값
 *            schema:
 *              type: object
 *              required:
 *                  - user_id
 *              properties:
 *                  user_id:
 *                      type: number
 *      responses:
 *          200:
 *              description: 팔로잉 유저 목록 조회 성공
 *              schema:
 *                  type: object
 *                  properties:
 *                      users:
 *                          type: object
 *          404:
 *              description: 팔로잉 정보 없음
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 */

router.post("/following", (req, res, next) => {

    const user_id = req.body.user_id;

    models.follow.findAll({
        raw:true,
        where: {
            from_user_id : user_id
        },
        attributes: [],
        include: [{
            model: models.user,
            attributes: ['username']
        }]

    }).then((result) => {
        if (result.length !== 0) {
            const nickname_list = [];
            for (let i=0; i<result.length; i++) {
                nickname_list.push(result[i]['user.username']);
            }
            res.status(200).send({
                users: nickname_list
            });
        }
        else {
            res.status(404).send({
                message: "팔로잉 유저 정보 없음"
            })
        }
        
    })
    .catch((err) => {
        res.status(500).send({
            message: err
        });
    })
});

// 팔로워 정보 가져오기, 기능 미완성
router.post("/follower",(req,res,next) => {

    const user_id = req.body.user_id;

    models.follow.findAll({
        raw:true,
        where: {
            to_user_id: user_id
        },
        attributes: ['from_user_id', 'to_user_id'],
        include: [{
            model: models.user,
            attributes: ['userName','nickName'],
            required: false
        }]
    }).then((user) => {
        console.log(user);
        res.status(200).json({
            result:user
        })
    }) 
    
})

module.exports = router;