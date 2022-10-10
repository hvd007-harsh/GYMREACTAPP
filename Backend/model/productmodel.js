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
        type:Number,
        require:true
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
        require:true,
    },
    comment:{
        type:String,
        require:true
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