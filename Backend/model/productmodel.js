const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    title:{
        type:String,
        require:true,
        unique:true
    },
    color:{
       type:String,
    },
    size:{
        type:String,
    },
    author:{
       type:String,
       require:true
    },
    imgUri:{
        type:String,
        require:true
    },
    discription:{
        type:String,
        require:true
    },
    mrp:{
        type:Number,
        require:true
    },
    offer:{
        type:Number,
        require:true
    },
    rating:{
        type:Number,
    },
    comment:{
        type:String,
    },
    stock:{
        type:Number,
        require:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports= mongoose.model("product",ProductSchema);