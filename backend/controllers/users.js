const mongoose = require("mongoose");
const userForm = require("../models/userModel");
const jwt = require("jsonwebtoken");

async function userregisterctrl(req, res) {

  if( req.body.firstName == ''|| req.body.lastName ==''|| req.body.email ==''|| req.body.password ==''){
    res.json({err: 'Bad request'}).status(400)
  }else{

  
  let userData = await userForm.userModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    typeOfUser: "user",
    status: true,
  });

  console.log(userData)

  userData.save((err,userData) => {
    if (err) {
      res.json({err:'Bad request'}).status(400)
    } else {
      const token = jwt.sign(
        { id: userData._id, role: userData.typeOfUser },
        process.env.JWT_SECRET
      );
      res
        .status(200)
        // .cookie("access_token", token)
        .json({
          email: userData.email,
          firstName: userData.firstName,
          role: userData.typeOfUser,
          status: userData.status,
        })

        
    }
  });
}
}

async function userloginctrl(req, res) {
  // console.log(req.body)
  let useremail = req.body.email;
  let userpassword = req.body.password;
  // console.log(useremail);

  let user = await userForm.userModel.findOne({ email: useremail });
  // console.log(user);

  if (user) {
   
    if(user.status == false) {
        res.json({err: 'user is not active '}).status(403)
    }
    if (userpassword == user.password) {
      const token = jwt.sign(
        { id: user._id, role: user.typeOfUser },
        process.env.JWT_SECRET
      );
      res
        .cookie("access_token", token, {sameSite: 'none', secure: true })
        .json({
          email: user.email,
          firstName: user.firstName,
          role: user.typeOfUser,
        })
        .status(200);
    } else {
      res.json({err:'invalid pass'}).status(401);
    }
  } else {
    res.json({err:"User not found"}).status(404);
  }
}



module.exports = { userregisterctrl, userloginctrl };
