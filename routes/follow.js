const express = require("express");
const models = require("../models");
const user = require("../models/user");

const router = express.Router();


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

// 팔로잉 유저 정보 가쟈오기, 현재는 id=1인 유저가 팔로잉 한 유저 닉네임 정보 가져오는 예시
// curl localhost:3000/follow/following
router.get("/following", (req, res, next) => {

    const temp_user_id = 1; // userId

    models.follow.findAll({
        raw:true,
        where: {
            from_user_id : temp_user_id
        },
        attributes: [],
        include: [{
            model: models.user,
            attributes: ['username']
        }]

    }).then((result) => {
        const nickname_list = [];
        for (let i=0; i<result.length; i++) {
            nickname_list.push(result[i]['user.username']);
        }
        res.send(nickname_list);
    })
    .catch((err) => {
        res.send(err);
    })
});

// 팔로워 정보 가져오기, 기능 미완성
router.get("/follower",(req,res,next) => {

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