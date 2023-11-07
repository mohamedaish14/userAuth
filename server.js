const express=require('express');
const app=express()
const dbconnection=require('./config/database')
const categoryrouts=require('./routs/categoryrouts')
const userrouts=require('./routs/userrouts');
const dotenv=require("dotenv");
dotenv.config({path:'config.env'})
const morgan=require('morgan');

//dbconnection
dbconnection();


//middelware
app.use(express.json());
if(process.env.NODE_ENV=='development'){
    app.use(morgan('dev'))
    console.log(process.env.NODE_ENV)}


//routes
app.use('/api/v1/categories',categoryrouts);
app.use('/api/v1/user',userrouts);



const port=process.env.PORT;
app.listen(port,()=>{console.log("app running..")})