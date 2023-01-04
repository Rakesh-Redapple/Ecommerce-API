const express=require('express');
const{authenticateUser,autharizPermission}=require('../middleware/authentication');

const router= express.Router();


const {createReview,getAllReview,getSingleReview,updateReview,deleteReview}=require('../controller/reviewController');

router.route('/').get(getAllReview).post(authenticateUser,createReview);

router.route('/:id').get(authenticateUser,getSingleReview).patch(authenticateUser,updateReview).delete(authenticateUser,deleteReview);




module.exports=router;