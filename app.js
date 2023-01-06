const express= require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const {StatusCodes}=require('http-status-codes');
const fileUpload= require('express-fileupload');
require('express-async-errors');;
dotenv.config({path:'./.env'});
const app=express();
// rest of the packages

const morgan= require('morgan');
const cookieParser= require('cookie-parser');

const port=process.env.PORT||3500;

mongoose.set('strictQuery', false);

// database
const DB= process.env.MONGO_URI;
mongoose.connect(DB).then(()=>{
    console.log(`DB Connected!`);
})
// routers

const authRouter=require('./routes/authRoutes');
const userRouter=require('./routes/userRoutes');
const productRouter=require('./routes/productRoute');
const reviewRouter=require('./routes/reviewRoute');
const orderRouter=require('./routes/orderRoute');

// app.get('/',(req,res)=>{
//     res.send('Ecom api')
// })
app.get('/api/v1',(req,res)=>{
    console.log(req.signedCookies);
    res.send('ecommmerce api outcome');
})
// middleware

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(morgan('tiny'));
app.use(express.static('./public'))
app.use(cookieParser(process.env.JWT_SECRET));
app.use(fileUpload());
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/products',productRouter);
app.use('/api/v1/reviews',reviewRouter);
app.use('/api/v1/orders',orderRouter);

app.all('*',(req,res,next)=>{
    res.status(StatusCodes.BAD_REQUEST).json({message:'page not found'});
})

app.listen(port,()=>{
    console.log(`Server is running on port:${port}`);
})