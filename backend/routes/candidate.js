const express  = require('express')
const routes = express.Router()
//const {addbooksctrl} = require('../controllers/books.js')
const booksctrls = require('../controllers/books.js')


routes.get('/list', booksctrls.listCandidate )
routes.post('/updateStatus', booksctrls.updateCandidateStatus )
routes.post('/add', booksctrls.addCandidate )
routes.post('/delete', booksctrls.deleteCandidate )



module.exports = routes