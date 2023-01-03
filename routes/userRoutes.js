const express=require('express');
const{authenticateUser,autharizPermission}=require('../middleware/authentication');

const router= express.Router();

const {getAllUser,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword}=require('../controller/userController');

router.route('/').get(authenticateUser,autharizPermission('admin','owner','user'),getAllUser);
router.route('/showMe').get(authenticateUser,showCurrentUser);
router.route('/updateUser').patch(authenticateUser,updateUser)
router.route('/updateUserPassword').patch(authenticateUser,updateUserPassword);
router.route('/:id').get(authenticateUser,getSingleUser);



module.exports=router;