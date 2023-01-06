const express=require('express');
const{authenticateUser,autharizPermission}=require('../middleware/authentication');

const router= express.Router();

const{getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
    createOrder,updateOrder
}=require('../controller/orderController');

router.route('/').post(authenticateUser,createOrder).get(authenticateUser,autharizPermission('admin'),getAllOrders);

router.route('/:id').get(authenticateUser,getSingleOrder).patch(authenticateUser,updateOrder);

router.route('/showAllMyOrders').get(authenticateUser,getCurrentUserOrders);




module.exports=router;