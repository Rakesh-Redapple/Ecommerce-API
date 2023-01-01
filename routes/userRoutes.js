const express=require('express');

const router= express.Router();

const {getAllUser,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword}=require('../controller/userController');

router.route('/').get(getAllUser);
router.route('/showMe').get(showCurrentUser);
router.route('/updateUser').post(updateUser)
router.route('/updateUserPassword').patch(updateUserPassword);
router.route('/:id').get(getSingleUser);



module.exports=router;