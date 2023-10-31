const mongoose=require('mongoose');
const DataSchema=new mongoose.Schema(
    {
        id:Number,
        image:String,
        price:Number,
        title:String,
        category:String
    }
)
module.exports=mongoose.model('apidataa',DataSchema,'apidataa');