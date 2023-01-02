const User=require('../models/User');
const{StatusCodes}=require('http-status-codes');
const getAllUser=async(req,res)=>{
    try{
        console.log(req.user);
        const user=await User.find({role:'admin'}).select('-__V,password').select('-password');
        if(!user){
            return res.status(StatusCodes.NOT_FOUND);
        }
        res.status(StatusCodes.OK).json({user,count:user.length});
    }catch(error){
        console.log(error);
    }
}

const getSingleUser=async(req,res)=>{
    try{
        const user=await User.findOne({_id:req.params.id}).select('-__v').select('-password');
        if(!user){
            return res.status(404).json({message:`user not found by id:${req.params.id}`});
        }
        res.status(StatusCodes.OK).json({user});
    }catch(error){
        console.log(error);
    }
}

const showCurrentUser=async(req,res)=>{
   res.status(StatusCodes.OK).json({user:req.user});
}

const updateUser=async(req,res)=>{
    res.send('update-user');
}

const updateUserPassword=async(req,res)=>{
    const {oldPassword,newPassword}=req.body;
    if(!oldPassword || !newPassword){
        return res.status(400).json({message:'please provide both password'});
    }
    const user =await User.findOne({_id:req.user.userId});
    const isPasswordCorrect=await user.comparePassword(oldPassword);
    if(!isPasswordCorrect){
        return res.status(200).json({message:'invalid creditionals'})
    }

    user.password= newPassword;
    await user.save();
    res.status(200).json({message:'success! password updated'});
}


module.exports={getAllUser,getSingleUser,showCurrentUser,updateUser,updateUserPassword}