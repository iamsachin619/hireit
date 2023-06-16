const express  = require('express')
const routes = express.Router()
//const {userregisterctrl} = require('../controllers/users.js')
//const {userloginctrl} = require('../controllers/users.js')
const userfunctions = require('../controllers/users')
const rentalfunction = require('../controllers/rent')
const { verifyToken, verifyUser } = require('../util/verify')

//routes.post('/userregister', userregisterctrl )
routes.post('/userregister', userfunctions.userregisterctrl )
routes.post('/userlogin', userfunctions.userloginctrl )
routes.post('/usermybooks',verifyToken, verifyUser, rentalfunction.usermybooks)
routes.post('/usermyorders',verifyToken, verifyUser,rentalfunction.usermyOrders)
routes.post('/createRental',verifyToken,verifyUser, rentalfunction.bookrentalcreatecltr)
routes.post('/returnBook',verifyToken,verifyUser, rentalfunction.userReturnBook)

    
module.exports = routes