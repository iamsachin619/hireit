const express  = require('express')
const routes = express.Router()
//const {userregisterctrl} = require('../controllers/users.js')
//const {userloginctrl} = require('../controllers/users.js')
const rentalfunction = require('../controllers/rent')
const staffFunctions = require('../controllers/staff')
const booksctrls = require('../controllers/books.js')
const { verifyToken, verifyUser, verifyStaff } = require('../util/verify')
const { route } = require('./book')
const multer = require('../util/multer')



routes.post('/listPendingRequests',verifyToken, verifyStaff, staffFunctions.listPendingRequests)  

routes.post('/approveRental',verifyToken, verifyStaff, staffFunctions.bookrentalapprovalctrl)
routes.post('/declineRental',verifyToken, verifyStaff, staffFunctions.bookrentaldeclinectrl)  //to devlop

routes.post('/addbooks',verifyToken, verifyStaff,multer.single('imgFile'), booksctrls.addbooksctrl )
routes.post('/deletebooks',verifyToken, verifyStaff, booksctrls.deletebooksctrl)
routes.post('/editbooks',verifyToken, verifyStaff, booksctrls.editbookctrl)

module.exports = routes

