const validate = require('validator');
const isempty = require('is-empty');
     

module.exports = function (req,res,next) {

    let errors = {};

    req.user.name = !(isempty(req.user.name)) ? req.user.name : "";
    req.user.password = !(isempty(req.user.password))? req.user.password: "";
    req.user.confirmpassword = !(isempty(req.user.confirmpassword))? req.user.confirmpassword: "";
    req.user.email = !(isempty(req.user.email))?req.user.email: "";


//  Name checks
if(req.user.name)
  if(isempty(req.user.name))
    errors.name  = "Name is required";

// email checks 
 if(validate.isEmpty(req.user.email)){
    errors.email = "Email is empty";
 }
 else if(!validate.isEmail(req.user.email)){
    errors.email = "Email is invalid"
 }

//password checks

if(validate.isEmpty(req.user.password)){
    errors.password = "Password need to be filled";
}
else if(!validate.isLength(req.user.password,{min:6, max: 10})){
    errors.password = "Password must be at least 6 characters";
}
if(req.user.confirmpassword){
 if(!validate.equals(req.user.password,req.user.confirmpassword)){
     errors.password2 = "Password must match";
}
}

return {errors,isValid: isempty(errors)};
}