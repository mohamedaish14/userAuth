const mongoose=require('mongoose');
const  validator = require('validator');
const bcrypt=require('bcryptjs');

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"the name is required"],
    },
    email:{
        type:String,
        required:[true,"the email is required"],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,"the email must be validated"]

    },
    password:{
        type:String,
        required:[true,"the password is required"],
        minlength:3,
        select:false
    },
    passwordconfirm:{
        type:String,
        required:[true,"the passwordconfi,rm is required"],
        validator:{validate:function(el){
            return el===this.password},
            message:"please confirm the right password corectly"
        },
    }
});
userSchema.pre('save',async function(next){
if(!this.isModified) return next();
this.password=await bcrypt.hash(this.password,10);
this.passwordconfirm=undefined;
next();
})
userSchema.methods.correctpassword=async function(candidatepassword,userpassword){
    return await bcrypt.compare(candidatepassword,userpassword);
};
const User= mongoose.model('User',userSchema);
module.exports=User;