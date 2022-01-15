const jwt = require('jsonwebtoken');
const secretObj = require("../config/jwt");

//토큰 유효한 검사
//app.js에서 / article, comment, image 로 진입하기 전에 토큰 유효한지 검사하고 유효하면 그대로 진행하고 유효하지 않으면 에러. 
const verifyToken = (req, res, next) => {
    try{
        const token = req.cookies.user;
        const decoded = jwt.verify(token, secretObj.secret);
        
        
        if(decoded){
            res.locals.userId = decoded.email;
            next();
        }
        else{
            res.status(401).json({error: 'unauthorized'});
        }
    }
    catch(err){
        res.status(401).json({error: 'token expired'});
    }
};

exports.verifyToken = verifyToken;