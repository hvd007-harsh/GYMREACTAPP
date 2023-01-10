const Router = require("express").Router();
const order = require('../model/ordermodel');
const crypto = require('crypto');
const Razorpay = require('razorpay');

Router.post('/order',async(req,res)=>{
    try {
        console.log('orderzjbsdkbjas',req.body.amount);
        const instance = Razorpay({
            key_id:process.env.KEY_ID,
            key_secret:process.env.KEY_SECRET
        })
        const options = {
            amount: req.body.amount*100,
            currency:"INR",
            receipt: crypto.randomBytes(10).toString("hex")
        }
        instance.orders.create(options, (error,order)=>{
            if(error){
                console.log(error);
                return res.send(order).status(500)
            }
            console.log(order);
            res.status(200).send(order)
        })
        
    } catch (error) {
         res.json(error);
    }
})

Router.post('/verify',async(req,res)=>{
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;
       
        const sign = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSign = crypto.createHmac("sha256",process.env.KEY_SECRET).update(sign.toString()).digest("hex")


        if(razorpay_signature === expectedSign){
            return res.status(200).json({message : 'Payment verified Successfully'})
        }else{
            return res.status(400).json({message : 'Invalid Signature Sent!'})
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error!"})
    }
})

module.exports = Router