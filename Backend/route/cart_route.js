const express = require('express');
const isAuth = require('../utils/isauth');
const cart = require('../model/cartmodel');
const product = require('../model/productmodel');
const Route = express.Router();
const {
  ObjectId
} = require('mongodb');

Route.get('/add_cart', async (req, res) => {
  try {
    const userId = isAuth(req);
    if (userId === null) {
      throw new Error("Please Login before adding the cart");
    }
    let {
      title,
      quantity,
      id,
      price
    } = req.query;
    console.log(title, quantity, id, userId, price);
    title = title.trim();
    quantity = Number(quantity.trim());

    //Here we are finding the cart in which we have to store 
    let cartplace = await cart.findOne({
      userId
    });

    console.log(cartplace);
    //After finding cart we will initialize the cart if it exist and if not then we will create one 
    if (cartplace) {

      let ProductIndex = cartplace.prod.findIndex(elem => String(elem.productId) === String(ObjectId(id)))
      // Here we are incrementing the quantity and the data 
      console.log(ProductIndex);
      if (ProductIndex !== -1) {
        cartplace.prod[ProductIndex].quantity++;
        cartplace.amount = quantity * price + cartplace.amount;
      } else {
        cartplace.prod.push({
          productId: id,
          quantity: quantity
        })
        cartplace.amount = quantity * price + cartplace.amount;
      }


      await cartplace.save((err) => {
        console.log('something went wrong', err)
      })
    } else {
      await cart.create({
        userId: userId,
        prod: [{
          productId: id,
          quantity: 1
        }],
        amount: price
      })
    }
    res.send('successfully added to the cart').status(200);

  } catch (err) {
    res.send(err.message).status(500);
  }

})

Route.get('/allorder',async (req,res)=>{
   try {
    const userId = isAuth(req);
    if (userId === null) {
      throw new Error("Please Login before adding the cart");
    }
    let orderlist = await cart.findOne({userId}).populate("prod.productId");
    console.log('order')


    
   res.send(orderlist);


   } catch (error) {
    res.send(error.message).status(500);
   }
})


//getting quantity of the product and number of cart 
Route.get('/quantity', async (req, res) => {

  const userId = isAuth(req);
  if (userId === null) {
    throw new Error("Please Login before adding the cart");
  }
  let cartplace = await cart.findOne({
    userId
  });
  let QuantityOfproducts = 0;
  cartplace.prod.forEach((element, index) => {
    QuantityOfproducts = element.quantity + QuantityOfproducts;
  });
  console.log(QuantityOfproducts);

  res.send(String(QuantityOfproducts));
})


Route.get("/dashboard/", async (req, res) => {
  try {
    const Id = isAuth(req);
    const data = await cart.aggregate([{
        $match: {
          userId: ObjectId(Id)
        }
      },
      {
        $project: {
          _id: 0,
          product: 1
        }
      },
      {
        $group: {
          _id: null,
          product: {
            $push: "$product"
          }
        }
      }
    ])
    console.log(data);


    res.json(data).status(200);
  } catch (err) {
    res.send(err.message);
  }
})


module.exports = Route;