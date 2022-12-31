const express= require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const {StatusCodes}=require('http-status-codes');
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

app.get('/',(req,res)=>{
    res.send('Ecom api')
})
app.get('/api/v1',(req,res)=>{
    console.log(req.signedCookies);
    res.send('ecommmerce api outcome');
})
// middleware

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(morgan('tiny'));
app.use(cookieParser(process.env.JWT_SECRET));
app.use('/api/v1/auth',authRouter);

app.all('*',(req,res,next)=>{
    res.status(StatusCodes.BAD_REQUEST).json({message:'page not found'});
})

app.listen(port,()=>{
    console.log(`Server is running on port:${port}`);
})