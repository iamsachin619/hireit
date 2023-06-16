const express  = require('express')
const { verify } = require('jsonwebtoken')
const routes = express.Router()
const adminfunctions = require('../controllers/admin')
const { verifyToken, verifyAdmin } = require('../util/verify')
const userfunctions = require('../controllers/users')


// routes.post('/staffregister',verifyToken, verifyAdmin, adminfunctions.staffregisterctrl )
// routes.post('/stafflogin', adminfunctions.staffloginctrl )
//add user
routes.post('/adduser',verifyToken, verifyAdmin, userfunctions.userregisterctrl)
routes.post('/disableuser',verifyToken, verifyAdmin, adminfunctions.userdisable)
routes.post('/enableuser',verifyToken, verifyAdmin, adminfunctions.userenable)
routes.get('/getUserList',verifyToken, verifyAdmin, adminfunctions.listOfUsers)
routes.post('/searchUsers',verifyToken, verifyAdmin, adminfunctions.searchUser)
routes.post('/searchStaff',verifyToken, verifyAdmin, adminfunctions.searchStaff)
routes.get('/getStaffList',verifyToken, verifyAdmin, adminfunctions.listOfStaff)



module.exports = routes