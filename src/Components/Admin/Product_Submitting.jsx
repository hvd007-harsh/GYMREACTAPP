import React, { useState } from "react";
import {
  Box,
  Card,
  Input,
  TextareaAutosize,
  TextField,
  OutlinedInput,
  Button,
} from "@mui/material";
import Axios from "../../utils/AxiosInstance";
import { useCookies } from "react-cookie";

const Product_Submitting = () => {
// Example UseState  
//eslint-disable-next-line
const [cookie,setCookies] = useCookies(['isLoggedin']);
//eslint-disable-next-line
const [product, setProduct] = useState({});
const submit = ()=>{
  console.log(product);
  const Response = Axios.post('/product/product/submit',product,{
    headers:{
      "authorization": "Bearer "+ cookie.isLoggedin ,
      "Content-Type":"multipart/form-data"
    }
  })
  Response.then(res =>{
    console.log(res.data);
  })
 }
  return (
    <div>
      <Box className="h-96">
        <Card >
          <form className=" padding-6 mb-29 bg-gray-dark text-gray h-full">
            <div className="field m-4">
              <label
                htmlFor="{Product Name}"
                className="float-left  font-semibold font-200"
              >
                Name:
              </label>
              <TextField
                label="Title"
                type="text"
                name="title"
                value={product.title}
                onChange={(e) => {
                  product.title = e.target.value;
                }}
                className="float-right w-3/4"
                placeholder="title of product..."
                id="title"
              />
            </div>
            <div className="field m-4">
              <label
                htmlFor="{Product Author}"
                className="float-left font-semibold font-200"
              >
                Author:
              </label>
              <TextField
                label="author"
                value={product.author}
                onChange={(e) => {
                  product.author = e.target.value;
                }}
                className="float-right w-3/4"
                type="text"
                name="author"
                id="p_mrp"
              />
            </div>
            <div className="field m-4">
              <label
                htmlFor="{Product imgUri}"
                className="float-left font-semibold font-200 "
              >
                Image:
              </label>
              {/* Image Section  */}
              <input
                type="file"
                name="image"
                onChange={(e) => {
                  console.log(URL.createObjectURL(e.target.files[0]));
                  // setProduct({imgUri:URL.createObjectURL(e.target.files)});
                  product.image= e.target.files[0];
                }}
                accept={"image/png,image/jpeg"}
                id="p_image"
                className="float-right w-3/4"
              />
            </div>
            <div className="field m-4">
              <label
                htmlFor="{Product Description}"
                className="float-left font-semibold font-200 "
              >
                Product Discription:
              </label>
              <TextareaAutosize
                name="description"
                id="discription"
                cols="30"
                placeholder="description..."
                value={product.description}
                onChange={(e) => {
                  product.description = e.target.value;
                }}
                minRows={"3"}
                className="float-right w-3/4"
              ></TextareaAutosize>
            </div>
            <div className="field m-4">
              <label
                htmlFor="{Product color}"
                className="float-left font-semibold font-200"
              >
                Color:
              </label>
              <input
                type="color"
                name="color"
                onChange={(e) => {
                  product.color = e.target.value; 
                }}
                id="color"
                className="float-right w-3/4"
              />
            </div>
            <div className="field m-4">
              <label
                htmlFor="outlined-adornment-amount"
                className="float-left font-semibold font-200 "
              >
                Amount:
              </label>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={"₹"}
                label={"Amount"}
                value={product.mrp}
                onChange={(e) => {
                  product.mrp = e.target.value;
                }}
                className="float-right w-3/4"
              />
            </div>
            <div className="field m-4">
              <label
                htmlFor="{Product Size}"
                className="float-left font-semibold font-200 "
              >
                Size:
              </label>
              <TextField
                label="Size"
                id="filled-size-small"
                defaultValue="Small"
                value={product.size}
                onChange={(e) => {
                  product.size = e.target.value;
                }}
                variant="filled"
                className="float-right w-3/4"
                size="small"
              />
            </div>
            <div className="field m-4">
              <label
                htmlFor="{Product Offer}"
                className="float-left font-semibold font-200 "
              >
                Offer:
              </label>
              <Input
                type="number"
                name="Offer"
                id="offer"
                value={product.offer}
                onChange={(e) => {
                  product.offer = e.target.value;
                }}
                placeholder="Offer"
                className="float-right w-3/4"
              />
            </div>
            <div className="field m-4">
              <label
                htmlFor="{Product Stock}"
                className="float-left font-semibold font-200 "
              >
                Stock:
              </label>
             
              <Input
                type="number"
                name="Stock"
                id="stock"
                value={product.stock}
                onChange={(e) => {
                  product.stock = e.target.value;
                }}
                placeholder="Stock"
                className="float-right w-3/4"
              />
            </div>

            <Button
              className=" float-right w-3/4 justify-around m-4  mr-9 hover:bg-gradient-to-t transition-all bg-gradient-to-r from-Navy via-cyan to-purple"
              onClick={submit}
            >
              SUBMIT
            </Button>
          </form>
        </Card>
      </Box>
    </div>
  );
};

export default Product_Submitting;
