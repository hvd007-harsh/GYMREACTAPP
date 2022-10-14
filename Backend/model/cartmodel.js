const mongoose= require('mongoose');

const CartSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        require:true
    },
    products:[
        {
            productId:{
                type:mongoose.Types.ObjectId,
                ref:"products",
                require:true
            },
            quantity:{
                type:Number,
                require:true
            }
        }
    ],
    amount:{ 
        type:Number,
        require:true
    }
   

},{
    timestamps:true
})

module.exports = mongoose.model("cart",CartSchema);