const categorymodel=require('../models/categorymodel')
const slugify = require('slugify');
const asynchandler=require('express-async-handler');


//get all categories
exports.getcategoies=asynchandler(async(req,res)=>{
    const page=req.query.page*1||1;
    const limit=req.query.limit*1||6;
    const skip=(page-1)*limit;
    const categories=await categorymodel.find({}).skip(skip).limit(limit);
    res.status(400).json({results:categories.length,pagedata:categories});

});
// get one category by id
exports.getcategorybyid=asynchandler(async(req,res)=>{
 const {id}=req.params;
 const category=await categorymodel.findById(id);
 if(!category){
    res.status(404).json("this category not found")
 }
 res.status(200).json({data:category});
});
//creat a new category  
exports.creatcategory=asynchandler(async (req,res)=>{
    const name=req.body.name;
    const category=await categorymodel.create({name,slug:slugify(name)});
res.status(201).json({data:category});
})

//update category 
exports.updatecategory=asynchandler(async(req,res)=>{
    const {id}=req.params;
    const {name}=req.body;
    const category=await  categorymodel.findByIdAndUpdate({_id:id},{name,slug:slugify(name)},{new:true})//take three things 1-the thing we will find by 2-the field will be updated 3-more options
    if(!category){
        res.status(404).json("this category not found")
    }
    res.status(201).json({data:category});
})
exports.deletecategory=asynchandler(async(req,res)=>{
    const {id}=req.params;
    const category=await categorymodel.findByIdAndDelete(id);
    if(!category){
        res.status(404).json("this category not found")
    }
    res.status(204).json();


})