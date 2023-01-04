const mongoose=require('mongoose');
const ProductSchema= new mongoose.Schema({
    name:{type:String,
        trim:true,
        required:[true,'please provide product name'],
        maxlength:[100,'more than 100 character not allowed']
    },
    price:{
        type:Number,
        required:[true,'please provide product price'],
        default:0
    },
    description:{
        type:String,
        required:[true,'please provide product description'],
        maxlength:[1000,'more than 1000 character not allowed']
    },
    image:{
        type:String,
        default:'/uploads/example.jpeg'
    },
    category:{
        type:String,
        required:[true,'please provide product category'],
        enum:['office','kitchen','bedroom','education']
    },
    company:{
        type:String,
        required:[true,'please provide company'],
        enum:{
            values:['ikea','liddy','marcos'],
            message:'{VALUE} is not supported'
        }
    },
    colors:{
        type:[String],
        default:['black'],
        required:true
    },
    featured:{
        type:Boolean,
        default:false
    },
    freeShipping:{
        type:Boolean,
        default:false
    },
    inventory:{
        type:Number,
        required:true,
        default:15
    },
    averageRating:{
        type:Number,
        default:0
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model('Product',ProductSchema);