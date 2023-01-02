const {isTokenValid}=require('../utils');
const authenticateUser= async(req,res,next)=>{
    const token=req.signedCookies.token;
    if(!token){
        return res.status(401).json({message:'Authentication invalid'});
    }
try{
const payload= await isTokenValid({token});
req.user={name:payload.name,userId:payload.userId,role:payload.role}
console.log(payload);
next();
}catch(error){
    console.log(error);
}

}


// const autharizPermission= (req,res,next)=>{
//     if(req.user.role!=='admin'){
//         return res.status(401).json({'message':'unautharized user to acceess this route '});
//     }
//     next();
// }
// if we want to access with multiple role then set autharizPermission


const autharizPermission=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(401).json({message:'unautharized access perform'});
        }
        next();
    }

}


module.exports={authenticateUser,autharizPermission}