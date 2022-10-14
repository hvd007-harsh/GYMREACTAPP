const Router = require("express").Router();
const order = require('../model/ordermodel');


Router.post("/addorder",(req,res)=>{   
    try{
       const order_data = req.body;
       const Order = order.find({userId:order._id});
       if(!Order){
        const Order_data = new order({
            order_data
        })
        Order_data.save();
       }
       res.send(Order);

    }catch(err){
        console.log(err);
    }
     
})
module.exports = Router;