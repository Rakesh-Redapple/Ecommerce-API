const Review=require('../models/Review');
const Product=require('../models/Product');
const{StatusCodes}=require('http-status-codes');
const {createTokenUser,attachCookiesToResponse,checkPermission}= require('../utils');

const createReview= async(req,res)=>{
    try{
        const {product:productId}=req.body;
        const isValidProduct= await Product.findOne({_id:productId});
        if(!isValidProduct){
            return res.status(StatusCodes.BAD_REQUEST).json({message:`no product found with id:${productId}`});
        }
        const alreadySubmittedReview=await Review.findOne({
            product:productId,
            user:req.user.userId
        });
        if(alreadySubmittedReview){
            return res.status(StatusCodes.OK).json({message:'already submitted review for this product'});
        }
        req.body.user=req.user.userId;
        const review= await Review.create(req.body);
        res.status(StatusCodes.CREATED).json({review});
    }catch(err){
        console.log(err.message)
    }
}

const getAllReview= async(req,res)=>{
    try{
        const review= await Review.find({});
        res.status(StatusCodes.OK).json({review,count:review.length});
    }catch(err){
        console.log(err)
    }
}


const getSingleReview= async(req,res)=>{
    try{
      const {id:reviewId}=req.params;
      const review= await Review.findOne({_id:reviewId});
      if(!review){
        return res.status(StatusCodes.OK).json({message:`not review found with id:${reviewId}`});
      }
      res.status(StatusCodes.OK).json({review});
    }catch(err){
        console.log(err)
    }
}


const updateReview= async(req,res)=>{
    try{
        const {id:reviewId}=req.params;
        const review= await Review.findOne({_id:reviewId});
        const {rating,title,comments}=req.body;
        if(!review){
          return res.status(StatusCodes.OK).json({message:`not review found with id:${reviewId}`});
        }
        checkPermission(req.user,review.user);
        review.rating=rating;
        review.title=title;
        review.comments=comments;

        await review.save();
        res.status(StatusCodes.OK).json({review});
    }catch(err){
        console.log(err)
    }
}

const deleteReview= async(req,res)=>{
    try{
        const {id:reviewId}=req.params;
        const review= await Review.findOne({_id:reviewId});
        if(!review){
          return res.status(StatusCodes.OK).json({message:`not review found with id:${reviewId}`});
        }
        checkPermission(req.user,review.user);
        await review.remove();
        res.status(StatusCodes.OK).json({message:'Success! review remove'});
    }catch(err){
        console.log(err)
    }
}


module.exports={createReview,getAllReview,getSingleReview,updateReview,deleteReview};