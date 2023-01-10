const Route = require("express").Router();
const user = require("../model/usermodel");
const validate = require("../utils/Validator");
const isAuth = require("../utils/isauth");
const { hash, compare } = require("bcrypt");

//ALL TOKENS ARE THERE 

const {
  accesstokengen,
  refreshtokengen,
  sendaccesstoken,
  sendrefreshtoken,
} = require("../utils/tokengen");
const { verify } = require("jsonwebtoken");


//Log in Route

Route.post("/login", async (req, res, next) => {
  try {
    req.user = req.body;
    const { email, password } = req.user;
    var val = validate(req, res, next);
    console.log(val)
     if(!(val.isValid)){ throw new Error (val.errors) }
    if (val.isValid) {
      const User = await user.findOne({
        email
      });
      console.log(User);
      var checkpass = await compare(password, User.Password);
      if (!checkpass) {
        throw new Error("Password did not match");
      }
      const Accesstoken = accesstokengen(User._id);
      const Refreshtoken = refreshtokengen(User._id);
      // await user.updateOne({_id:User._id},{
      //   refreshtoken: Refreshtoken
      // },()=>{
      //   console.log("Updated");
      //   res.send({status:202});
      // })
      User.refreshtoken = Refreshtoken;
      await User.save(err=> console.log(err));
      //Sending Refresh token
      sendrefreshtoken(res, Refreshtoken);

      sendaccesstoken(req, res, Accesstoken);
    }
  } catch (error) {
    console.log('error');
    res.send({message:error.message});
  }
});

//Register Route


Route.post("/register", async (req, res, next) => {
  try {
    console.log(req.body);
    req.user = req.body;
    var { name, email, password, confirmpassword } = req.user;
    name = name.trim();
    email = email.trim();
    password = password.trim();
     //eslint-disable-next-line
    confirmpassword =confirmpassword.trim();

    var val = validate(req, res, next);
    console.log(val.isValid);

    if (val.isValid) {
      const User = await user.find({
        email
      });
      console.log('enter');

      if (User[0]) {
        throw new Error("User already exist");

      }
      console.log(User[0],'user');
      const Password = await hash(password, 10);
      console.log(Password);
      const data = new user({name,email,Password});
      await data.save(err => console.log(err));

      res.send({
        status: 201,
        message:"Succesfully Register",
        success:true
      });
    }
  } catch (error) {
    console.log(error);
    res.send({message:error.message});
  }
});

//Logout Route 

Route.post("/logout", (req, res) => {
  res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
  res.send({
    message: "LogOut",
  });
});

//Refresh Token Route


Route.post("/refresh_token", async (req, res) => {
  
  try{
    let token = req.cookies.refreshtoken;
    console.log(token);
    if (!token) return res.send({ accesstoken: "" });
    let payload = null;
    payload = verify(token, process.env.REFRESH_SECRET);
    
    console.log(payload);

    const User = await user.findById(payload.userId);
    if (!User) return res.send({ accesstoken: "" });
  
    if (User.refreshtoken !== token) {
      return res.send({ accesstoken: "" });
    }
    console.log(User._id);
    //Token exist , create new Refresh- and accesstoken
    const refreshtoken = refreshtokengen(User._id);
    const accesstoken  = accesstokengen(User._id);
  
    User.refreshtoken = refreshtoken;
    await User.save();
    //All good to go , send new refresh token and accesstoken
    sendrefreshtoken(res, refreshtoken);
   res.send({
    accesstoken
   })
   
  }catch (err) {
    console.log(err);
  }
});

Route.post("/makeofgymwebsiteadmin", async(req, res) => {
  try {
    const userId = isAuth(req);
     console.log(userId);
    if (userId) {
      const User= await user.findById(userId);
      console.log(User);
      User.role = true;
      await User.save();
      res.send({
        message: `Role is set to admin`,
        admin: true
      });
    }
  } catch (err) {
    err.admin= false;
    err.message =" ERROR OF LOGIN 501"
    res.send(err);
  }
});

module.exports = Route;
