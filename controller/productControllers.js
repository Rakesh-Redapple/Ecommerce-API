
const Product=require('../models/Product');
const {StatusCodes}=require('http-status-codes');


const createProduct= async(req,res)=>{
    try{
        req.body.user=req.user.userId;
        const product= await Product.create(req.body);
        res.status(StatusCodes.CREATED).json({product});
    }catch(err){
        return res.status(StatusCodes.BAD_REQUEST).json({message:err.message});
    }
}

const getAllProduct= async(req,res)=>{
    res.send('getAllProduct');
}
const getSingleProduct= async(req,res)=>{
    res.send('get single product');
}
const updateProduct= async(req,res)=>{
    res.send('update product');
}
const deleteProduct= async(req,res)=>{
    res.send('delete  product');
}
const uploadImage= async(req,res)=>{
    res.send('upload product product');
}



module.exports={createProduct,getAllProduct,getSingleProduct,
updateProduct,deleteProduct,uploadImage}

