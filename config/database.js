const mongoose=require('mongoose')
const dbconnection=()=>{mongoose
.connect(process.env.database)
.then((conn)=>{
    console.log(`connected:${conn.connection.host}`)})
.catch((err)=>{console.log(err);
    process.exit(1);})};
module.exports=dbconnection;