const express=require('express');
const{authenticateUser,autharizPermission}=require('../middleware/authentication');

const router= express.Router();


const {createProduct,
      getAllProduct,
      getSingleProduct,
      updateProduct,
      deleteProduct,
      uploadImage}=require('../controller/productControllers');



router.route('/').post([authenticateUser,autharizPermission('admin')],createProduct).get(getAllProduct);

router.route('/:id').get(getSingleProduct).patch([authenticateUser,autharizPermission('admin')],updateProduct).
delete([authenticateUser,autharizPermission('admin')],deleteProduct);


router.route('/uploadImage').post([authenticateUser,autharizPermission('admin')],uploadImage);


    module.exports=router;

