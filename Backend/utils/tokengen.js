const {sign} = require('jsonwebtoken');

function accesstokengen (userId){
return sign({userId},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15m'})   
}
function refreshtokengen(userId){
    return sign({userId},process.env.REFRESH_SECRET,{expiresIn:'7d'});
}
function sendaccesstoken (req,res,accesstoken){
    res.send({
           accesstoken,
           email:req.user.email
    })
}
function sendrefreshtoken(res,refreshtoken){
    res.cookie('refreshtoken',refreshtoken,{
        httpOnly:true,
        path:'/user/refresh_token',
        maxAge:900000000
    })
}

module.exports={
    accesstokengen,
    refreshtokengen,
    sendaccesstoken,
    sendrefreshtoken
}