const express=require('express');
const{authenticateUser,autharizPermission}=require('../middleware/authentication');

const router= express.Router();

const {getAllUser,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword}=require('../controller/userController');

router.route('/').get(authenticateUser,autharizPermission('admin','owner','user'),getAllUser);
router.route('/showMe').get(showCurrentUser);
router.route('/updateUser').patch(updateUser)
router.route('/updateUserPassword').patch(updateUserPassword);
router.route('/:id').get(authenticateUser,getSingleUser);



module.exports=router;