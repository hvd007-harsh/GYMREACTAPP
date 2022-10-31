const express = require('express');
const isAuth = require('../utils/isauth');
const cart = require('../model/cartmodel');
const product = require('../model/productmodel');
const Route = express.Router();
const {ObjectId} = require('mongodb');

Route.get('/add_cart',async(req,res)=>{
try{
    const userId = isAuth(req);
    if(userId === null){
        throw new Error("Please Login before adding the cart");
    }
    let { title,quantity} = req.query;
 
    title = title.trim();
    quantity = Number(quantity.trim());
    const current_product =await product.findOne({title});

    const amount = quantity*(current_product.mrp);
    const Cart = new cart({
        userId,
        products:[
            {
            productId: current_product._id,
            quantity:quantity
            }
        ],
        amount,
    });

    await Cart.save();

    res.send(current_product);
}catch(err){
    res.send(err.message);
}
})
Route.get("/dashboard/",async(req,res)=>{
  try{
      const Id = isAuth(req);
      const data =await cart.aggregate([
        { $match:{ userId : ObjectId(Id) }},
        {$project:{ _id:0,product:1}},
        {$group:{_id:null,product:{ $push:"$product"}}}
      ])
      console.log(data);


      res.json(data).status(200);
  }catch(err){
     res.send(err.message);
  }
})


module.exports = Route;