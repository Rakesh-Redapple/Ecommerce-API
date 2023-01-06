const Order= require('../models/Order');
const Product= require('../models/Product');
const {StatusCodes}=require('http-status-codes');
const {checkPermission}=require('../utils');

const fakeStripeAPI= async({amount,currency})=>{
const client_secret='someRandomvalue';
return {client_secret,amount}
}

const createOrder=async(req,res)=>{
    try{
        const {items:cartItems,tax,shippingFee}=req.body;
        if(!cartItems ||cartItems.length<1){
            return res.status(400).json({message:'no cart items provided'});
        }
        if(!tax || !shippingFee){
            return res.status(400).json({message:'please provide tax and shipping fee'});
        }

        let orderItems=[];
        let subtotal=0;
        for(const item of cartItems){
            const dbProduct= await Product.findOne({_id:item.product});

            if(!dbProduct){
                return res.status(400).json({message:`no produt found with id: ${item.product}`})
            }
           
        const {name,price,image,_id}=dbProduct;
        const singleOrderItem={
            amount:item.amount,
            name:item.name,
            price:item.price,
            product:_id
        }
    


    
        // add item to order
        orderItems=[...orderItems,singleOrderItem];
        // calculate subTotal
        subtotal+=item.amount*price;
        // calculate total
        const total= tax+shippingFee+subtotal;
        // get client secret

        const paymentIntent= await fakeStripeAPI({
            amonut:total,
            currency:'usd'

        })

        const order= await Order.create({
            orderItems,total,subtotal,tax,shippingFee,clientSecret:paymentIntent.client_secret,user:req.user.userId
        })
    res.status(StatusCodes.CREATED).json({order,clientSecret:order.client_secret});
    }}catch(error){
        console.log(error);
    }
}
    

    

const getAllOrders=async(req,res)=>{
    try{
        const orders= await Order.find({});
        res.status(StatusCodes.OK).json({orders});
    }catch(error){
        console.log(error);
    }
}


const getSingleOrder=async(req,res)=>{
    try{
        const{id:orderId}=req.params;
        const order= await Order.findOne({_id:orderId});
        if(!order){
            return res.status(400).json({message:`no order fount with params id: ${orderId}`});
        }
        checkPermission(req.user,order.user);
        res.status(StatusCodes.OK).json({order});
    }catch(error){
        console.log(error);
    }
}


const getCurrentUserOrders=async(req,res)=>{
    try{
       const orders=await Order.find({user:req.user.userId}); 
        res.status(StatusCodes.OK).json({orders,count:orders.length});
    }catch(error){
        console.log(error);
    }
}


const updateOrder=async(req,res)=>{
    try{
        const{id:orderId}=req.params;
        const {paymentIntentId}=req.body;
        const order= await Order.findOne({_id:orderId});
        if(!order){
            return res.status(400).json({message:`no order fount with params id: ${orderId}`});
        }
        checkPermission(req.user,order.user);
        order.paymentIntentId=paymentIntentId;
        order.status='paid';
        await order.save();
        res.status(StatusCodes.OK).json({order});
    }catch(error){
        console.log(error);
    }
}



module.exports={
    getAllOrders,getSingleOrder,getCurrentUserOrders,createOrder,updateOrder
}