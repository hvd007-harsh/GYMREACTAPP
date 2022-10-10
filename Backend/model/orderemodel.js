const mongoose= require('mongoose');

const OrderSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        require:true
    },
    products:[
        {
            productId:{
                type:String
            },
            quantity:{
                type:Number,
                default:1
            }
        }
    ],
    amount:{ 
        type:Number,
        require:true
    },
    address:{
        type:Object,
        require:true
    },
    status:{
        type:String,
        enum:["pending","packing","shipped","delivered"],
        default: "pending"
    }

},{
    timestamps:true
})

module.exports = mongoose.model("cart",OrderSchema);