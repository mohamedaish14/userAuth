const express=require('express');
const {getcategoies
    ,creatcategory
    ,getcategorybyid
    ,updatecategory
,deletecategory}=require('../services/categoryservices')
const router=express.Router()



router.route('/').post(creatcategory).get(getcategoies);
router.route('/:id').get(getcategorybyid).put(updatecategory).delete(deletecategory);


module.exports=router;
