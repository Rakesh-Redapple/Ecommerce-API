const User=require('../models/User');
const{StatusCodes}=require('http-status-codes');
const getAllUser=async(req,res)=>{
    try{
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
    res.send('show-current-user');
}

const updateUser=async(req,res)=>{
    res.send('update-user');
}

const updateUserPassword=async(req,res)=>{
    res.send('updateuserpassword');
}


module.exports={getAllUser,getSingleUser,showCurrentUser,updateUser,updateUserPassword}