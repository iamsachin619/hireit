const mongoose = require("mongoose");
const userForm = require("../models/userModel");
const jwt = require('jsonwebtoken')
//Staff registration section
function staffregisterctrl(req, res){
let userData = userForm.userModel({
    firstName: req.body.firstName,  
	lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    typeOfUser: 'staff',
    status: true
    });

        console.log(userData)

    userData.save((err, docs) => { 
        if(err){
            console.log(err)
            res.send('not created').status(400)
        }
        else{
            res.json(docs).status(200);
        }})
}

async function listOfUsers(req, res){
    let users = await userForm.userModel.find({typeOfUser:'user'})
    res.json(users).status(200)
}

async function listOfStaff(req, res){
    let staffs = await userForm.userModel.find({typeOfUser:'staff'})
    res.json(staffs).status(200)
}

async function searchUser(req, res){
    console.log('serach funciton')
    let searchtitle = req.body.search

    const filter = {
        $or: [
           
          { firstName: { $in: [searchtitle] } },
          { lastName: { $in: [searchtitle] } },
          { email: { $in: [searchtitle] } },
        ],
      };

    const searchResult = await userForm.userModel.find({...filter,typeOfUser:'user'})
    res.json(searchResult).status(200)
}

async function searchStaff(req, res){
    console.log('serach funciton')
    let searchtitle = req.body.search

    const filter = {
        $or: [
           
          { firstName: { $in: [searchtitle] } },
          { lastName: { $in: [searchtitle] } },
          { email: { $in: [searchtitle] } },
        ],
      };

    const searchResult = await userForm.userModel.find({...filter,typeOfUser:'staff'})
    res.json(searchResult).status(200)
}
//Staff login section
async function  staffloginctrl(req, res){
    let useremail = req.body.email
    let userpassword = req.body.password

    let user = await userForm.userModel.findOne({email : useremail })
        
        if(user){

            if(user.typeOfUser != 'staff'){
                res.send('not a staff').status(403)
            }
            if(user.status == false){
                res.send('staff is not activated').status(403)
            }
            if(userpassword == user.password){
                const token = jwt.sign(
                    { id: user._id, role: "staff" },
                    process.env.JWT_SECRET
                  );
  
                res
                .cookie("access_token", token, { httpOnly: true })
                .json({email : user.email , firstName: user.firstName,role:user.typeOfUser })
                .status(200)
            }else{
                res.send('invalid pass').status(401)
            }
            
        }
        else{
            res.send("User not found").status(404)
        }

}


async function userdisable(req,res){
    let useremail = req.body.email

    let user = await userForm.userModel.findOne({email : useremail })
        console.log("User details: " + user )

        if(user){
            console.log("found user")
          userForm.userModel.updateOne({email :  user.email }, { status  : false },  (err, docs) => {
    
            if (err){
                console.log(err)
                res.send('task failed').status(400)
            }
            else{
                console.log("Updated user : ", docs);
                res.send("updated").status(200)
            }
            
    
    })
        }
        else{
            res.send("user not found").status(404)
        }
       
}


async function userenable(req,res){
    let useremail = req.body.email

    let user = await userForm.userModel.findOne({email : useremail })
        console.log("User details: " + user )

        if(user){
        
          userForm.userModel.updateOne({email :  user.email }, { status  : true }, function (err, docs) {
                if (err){
                    console.log(err)
                    res.send('task failed').status(400)
                }
                else{
                   res.send('user enabled').status(200)
                }
                })
        }
        else{
            res.send("user not found").status(404)
        }
       
}

    module.exports = {staffregisterctrl , staffloginctrl, userdisable, userenable,listOfUsers,searchUser,listOfStaff,searchStaff}
    