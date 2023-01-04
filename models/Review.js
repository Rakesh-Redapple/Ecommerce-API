const mongoose=require('mongoose');
const ReviewSchema=new mongoose.Schema({
    rating:{
        type:Number,
        min:1,
        max:5,
        required:[true,'please provide ratings']
    },
    title:{
        type:String,
        trim:true,
        required:[true,'please provide review title'],
        maxlength:100
    },
    comments:{
        type:String,
        required:[true,'please provide review text']
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    }, 
    product:{
        type:mongoose.Schema.ObjectId,
        ref:'Product',
        required:true
    }
},{timestamps:true});
// one user can give one review on every products
ReviewSchema.index({product:1,user:1},{unique:true});

module.exports=mongoose.model('Review',ReviewSchema);