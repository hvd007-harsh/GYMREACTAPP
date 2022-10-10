const express = require('express');
const isAuth = require('../utils/isauth');
const cart = require('../model/cartmodel');
const product = require('../model/productmodel');
const Route = express.Router();

Route.get('/add_cart',async(req,res)=>{
try{
    const userId = isAuth(req);
    console.log(userId);
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
        product:[
            {
            productId: current_product._id,
            quantity
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


module.exports = Route;