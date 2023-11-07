const mongoose=require('mongoose');


const categoryschema=new mongoose.Schema({
    name:{
        type:String,
        minlength:3,
        maxlength:12,
        required:[true,"the name of category is required "],
        unique:[true,"this name is token"]
    },
    //if the category name is A and B  in front slug will convenrt it in the back into a-and-b
    slug:{
        type:String,
        lowecase:true

    },
},
{timestamps:true}//this to add time to the model //search about it
);


const categorymodel=mongoose.model('category',categoryschema);
module.exports=categorymodel;