const User=require('../models/User');
const {StatusCodes}=require('http-status-codes');
// const jwt= require('jsonwebtoken');

// const {createJWT}=require('../utils');
const {attachCookiesToResponse}=require('../utils');

const register=async(req,res)=>{

    try{

        const {email}=req.body;

        const emailExist= await User.findOne({email});
        if(emailExist){
            return res.status(StatusCodes.OK).json({message:'this email already exists try another email'})
        }

        // first registered user is an admin

        const isFirstAccount=(await User.countDocuments({}))===0;
        const role= isFirstAccount?'admin':'user';
        const user= await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            role:req.body.role
        })
// jwt functionality commented because of used in utils folder
         const userToken={name:user.name,userId:user._id,role:user.role};
        //  const token= createJWT({payload:userToken});

         // now going to save  token in cookies

        //  const oneDay=1000*60*60*24;
        //  res.cookie('token',token,{
        //     httpOnly:true,
        //     expires:new Date(Date.now()+oneDay)
        //  })

        attachCookiesToResponse({res,user:userToken})
        //res.status(StatusCodes.CREATED).json({User:userToken}); 
    }catch(error){
        return res.status(StatusCodes.OK).json({Error:error});
    }
 
}

const login=async(req,res)=>{
    try{
const {email,password}=req.body;
if(!email || !password){
  return  res.status(StatusCodes.BAD_REQUEST).json({message:'email address and password not found'});
}
const user= await User.findOne({email});
if(!user){
    return res.status(401).json({message:'user does not exist'})
}
const isPasswordCorrect= await user.comparePassword(password);
if(! isPasswordCorrect){
    return res.status(401).json({message:'user does not exist'})
}
const userToken={name:user.name,userId:user._id,role:user.role};
attachCookiesToResponse({res,user:userToken})
res.status(StatusCodes.CREATED).json({User:userToken}); 


    }catch(error){
        console.log(error.message);
    }
 
}

const logout=async(req,res)=>{
    try{
res.cookie('token','logout',{
    httpOnly:true,
    expires:new Date(Date.now()+5*1000)
});
res.status(StatusCodes.OK).json({message:'user logout!'})
    }catch(err){
        console.log(err);
    }
}



module.exports={register,login,logout}