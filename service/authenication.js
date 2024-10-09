const jwt=require('jsonwebtoken');
secret ='djkeerthan$123';
function createTokenForUser(user){
    const payload={
        _id:user._id,
        username:user.username,
        emial:user.emial,
    }
    const token=jwt.sign(payload,secret);
    return token;
}
function validateToken(token){
    const payload=jwt.verify(token,secret);
    return payload;
}

module.exports={
    createTokenForUser,
    validateToken,
}