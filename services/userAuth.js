const User=require('../models/userModel');
const asynchandler=require('express-async-handler');
const jwt = require('jsonwebtoken');
const apperror=require('../utils/appError')


exports.signup=asynchandler(async (req,res)=>{
 const newuser=await User.create({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    passwordconfirm:req.body.passwordconfirm
 });
 const token=jwt.sign({id:newuser._id},process.env.jwt_secret,
    {expiresIn:process.env.jwt_expirein})
 res.status(201).json({
    status:'created',
    token,
    data:newuser
 })
});


exports.login=asynchandler(async (req,res)=>{
    const {email,password}=req.body;

    if(!email||!password){
return  next(new apperror('please provide email and password',400))
    }
    const user=await User.findOne({email}).select('+password');
    if(!user||!await user.correctpassword(password,user.password)){
        return next(new apperror('please provide correct email and password',401))
    }
    const token=jwt.sign({id:user._id},process.env.jwt_secret,
        {expiresIn:process.env.jwt_expirein})
        res.status(200).json({
            status:'sucsess',
            token,
            
         })
})