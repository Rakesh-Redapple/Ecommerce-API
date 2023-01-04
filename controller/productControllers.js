
const Product=require('../models/Product');
const {StatusCodes}=require('http-status-codes');
const path=require('path');


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
    try{
        const products= await Product.find({});
        res.status(StatusCodes.OK).json({products,count:products.length});
    }catch(error){
        console.log(error);
    }
}
const getSingleProduct= async(req,res)=>{
    try{
        const {id:productId}=req.params;
        const products= await Product.findOne({_id:productId});
        if(!products){
            return res.send(`not product found with ID:${productId}`);
        }
        res.status(StatusCodes.OK).json({products});
    }catch(error){
        console.log(error);
    }
}
const updateProduct= async(req,res)=>{
    try{
        const {id:productId}=req.params;
        const products= await Product.findOneAndUpdate({_id:productId},req.body,{new:true,runValidators:true});
        if(!products){
            return res.send(`not product found with ID:${productId}`);
        }
        res.status(StatusCodes.OK).json({products});
    }catch(error){
        console.log(error);
    }
}

const deleteProduct= async(req,res)=>{
    try{
        const {id:productId}=req.params;
        const products= await Product.findOne({_id:productId});
        if(!products){
            return res.send(`not product found with ID:${productId}`);
        }
        await products.remove();
        res.status(StatusCodes.OK).json({message:'product delete successfully!'});
    }catch(error){
        console.log(error);
    }
}
const uploadImage= async(req,res)=>{
    try{
        if(!req.files){
            return res.status(StatusCodes.BAD_REQUEST).json({message:'file field is empty'});
        }
        const productImage=req.files.image;
        if(!productImage.mimetype.startsWith('image')){
            return res.status(StatusCodes.BAD_REQUEST).json({message:'please upload image'});
        }
        const maxSize=1024*1024;
        if(productImage.size>maxSize){
            return res.status(StatusCodes.BAD_REQUEST).json({message:'please upload image file smaller than 1MB'});
        }
        const imagePath=path.join(__dirname,'../public/uploads/'+ `${productImage.name}`);
        await productImage.mv(imagePath)
res.status(StatusCodes.OK).json({image:`/uploads/${productImage.name}`});
    }catch(error){
        console.log(error);
    }
    
}



module.exports={createProduct,getAllProduct,getSingleProduct,
updateProduct,deleteProduct,uploadImage}

