const isempty = require('is-empty');


module.exports = (product,image)=>{
    var empty;

    isempty(product.title)?( empty=true):(empty=false); 
    isempty(product.author)?( empty=true):(empty=false); 
    isempty(product.discription)?( empty=true):(empty=false); 
    isempty(product.mrp)?( empty=true):(empty=false); 
    isempty(product.size)?( empty=true):(empty=false); 
    isempty(product.stock)?( empty=true):(empty=false); 

   if(empty){ throw new Error("The field is empty in product/t"+image)}

}