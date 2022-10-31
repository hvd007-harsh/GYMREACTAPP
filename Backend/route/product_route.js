const express = require('express');
const isAuth = require('../utils/isauth');
const product = require("../model/productmodel");
const upload = require("../Middleware/Mutler");
const user = require('../model/usermodel');
const multer = require('multer');
const checkproduct = require("../utils/Productvalidation");
const fs = require('fs');




const Router = express.Router();


Router.post('/product',(req,res)=>{
    try{ 
        const userId = isAuth(req);
        console.log(userId);
        if(userId !== null){
         const Product = req.body();
         const Data =  product.find({title:Product.title});
         if(Data.title !== product.title){
                const data= new product({Product});
                data.save();
         }
         throw Error("The product is not unique")

        }
    }catch(err){
           res.send(err.message,404); 
        }
})

Router.post("/product/submit",async(req,res)=>{
    upload(req,res,async(err)=>{
        if(err instanceof multer.MulterError){
            res.send(err.message);
        } else if(err){
            res.send(err.message);
        }else{
            try{
                const userId = isAuth(req);
                const Userdata =await user.findOne({_id:userId});
               
            
                const image = req.file.filename;
                if(userId !== null){
                const productsubmit = req.body;
                checkproduct(productsubmit,image);
              
                
                const ProductData =await product.findOne({title: productsubmit.title});
                console.log(ProductData);
            
                if(ProductData){ 
                  throw new Error("The product is already submit/t"+image);
                };
                if(!(Userdata.role)){
                  throw new Error("User is not an admin/t"+image);
                }
                const Product = new product({
                    title: productsubmit.title,
                    author:productsubmit.author,
                    imgUri:image,
                    discription:productsubmit.discription,
                    color:productsubmit.color,
                    size:productsubmit.size,
                    mrp: productsubmit.mrp,
                    offer:productsubmit.offer,
                    stock: productsubmit.stock,
                    user: userId
            
                })
                  await  Product.save();
                res.send(Product);
              }
            }
            catch(err){ 
                const message = err.message;
                const message2 =  message.split("/t");
                const filename = message2[1];
                
                fs.rm(("public/image/"+filename),()=>{
                    console.log(filename+" file is deleted");
                });

               res.send(message2[0]).status(401);
            }
        }
    })
})
Router.get("/product/all",async(req,res)=>{
  try{
    const userId = isAuth(req);
    if(userId){
    const allproduct = await product.find({});
    console.log(allproduct);
    res.send(allproduct);
    }
  }catch(err){
    console.log(err);
  }
})

Router.get("/:product_name",async(req,res)=>{
    const product_name = req.params.product_name;
       const product_data =await product.find({title: {$regex:`(?-i)${product_name}` }});
   res.send(product_data[0]);

})
Router.put("/update",(req,res)=>{
    upload(req,res,async(err)=>{
        if(err instanceof multer.MulterError){
            res.send(err);
        } else if(err){
            res.send(err);
        }else{
            try{
                const userId = isAuth(req);
                const Userdata =await user.findOne({_id:userId});
                const image = req.file.filename;
            
                if(userId !== null){
                const productsubmit = req.body;
                checkproduct(productsubmit,image);
              
                
                const productdata =await product.findOne({title: productsubmit.title});
                console.log(productdata);
                if(!(Userdata.role)){
                  throw new Error("User is not an admin/t"+image);
                }
                if (req.file) {
                
                   productdata.image = image;
                   productsubmit.image = productdata.image;
                }

               await product.findOneAndUpdate({title:productdata.title},
                {
                    $set: {
                            title: productsubmit.title,
                            color:productsubmit.black,
                            size:productsubmit.size,
                            author: productsubmit.author,
                            imgUri:productsubmit.image,
                            discription:productsubmit.discription,
                            mrp: productsubmit.mrp,
                            offer:productsubmit.offer,
                            stock: productsubmit.stock,
                            user: userId

                    }
                })
             }
             res.send("Updated Successfully");
            }
            catch(err){ 
                const message = err.message;
                const message2 =  message.split("/t");
                const filename = message2[1];
                
                fs.rm(("public/image/"+filename),()=>{
                    console.log(filename+" file is deleted");
                });

               res.send(message2[0]).status(401);
            }
        }
    })
})

Router.delete('/delete',async(req,res)=>{
   try{ 
    let title =  req.body.title;
    let message;
    title = title.trim();
    if(title === ''){
        throw new Error('Please enter the correct product name');
    }
   const product_data=  await product.findOneAndDelete({title});
    console.log(product_data);
    fs.rm(("public/image/"+product_data.imgUri),()=>{
        message = product_data.imgUri+ " The image is deleted";
    })
     res.send(message);
   }
   catch(err){
    res.send(err.message);
   }

})


module.exports = Router;

