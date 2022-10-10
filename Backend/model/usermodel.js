const mongoose = require('mongoose');
const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    role:{
        type:Boolean,
        default:false,
        require:true
    },
    refreshtoken:{
     type:String,
     expiresIn:3600
    },
    Password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }


})
 
module.exports = mongoose.model('user',userschema);