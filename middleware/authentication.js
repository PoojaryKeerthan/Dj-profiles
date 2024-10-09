const {validateToken}=require('../service/authenication');

function authenticateCookie(cookieName){
    return function(req,res,next){
        const token=req.cookies[cookieName];
        if(!token){return next();}
        try {
            const payload=validateToken(token);
            req.user=payload;
        } catch (error) {
        }
        next();
    }
}

module.exports=authenticateCookie;