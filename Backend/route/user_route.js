const Route = require("express").Router();
const user = require("../model/usermodel");
const validate = require("../utils/Validator");
const isAuth = require("../utils/isauth");
const { hash, compare } = require("bcrypt");
const {
  accesstokengen,
  refreshtokengen,
  sendaccesstoken,
  sendrefreshtoken,
} = require("../utils/tokengen");
const { verify } = require("jsonwebtoken");
Route.post("/login", async (req, res, next) => {
  try {
    req.user = req.body;
    const { email, password } = req.user;
    var val = validate(req, res, next);
     console.log(val);
    if (val.isValid) {
      const User = await user.findOne({
        email
      });

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
      await User.save();
      //Sending Refresh token
      sendrefreshtoken(res, Refreshtoken);

      sendaccesstoken(req, res, Accesstoken);
    }
  } catch (error) {
    res.send(error);
  }
});
Route.post("/register", async (req, res, next) => {
  try {
    req.user = req.body;
    var { name, email, password, confirmpassword } = req.user;
    name = name.trim();
    email = email.trim();
    password = password.trim();
    confirmpassword.trim();

    var val = validate(req, res, next);

    if (val.isValid) {
      const User = await user.find({
        email,
      });

      if (User[0]) {
        res.send({
          status: 401,
        });
        throw new Error("User already exist");
      }

      password = await hash(password, 10);
      user.create(
        {
          name,
          email,
          Password: password,
        },
        () => {
          res.send({
            status: 201,
          });
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
});

Route.post("/logout", (req, res) => {
  res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
  res.send({
    message: "LogOut",
  });
});
Route.post("/refresh_token", async (req, res) => {
  
  try{
    let token = req.cookies.refreshtoken;

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
    if (userId !== null) {
      const User= await user.findById(userId);
      User.role = true;
      await User.save();
      res.send({
        message: `Role is set to admin`,
      });
    }
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = Route;
