const express  = require('express')
const routes = express.Router()
//const {addbooksctrl} = require('../controllers/books.js')
const candidateControlls = require('../controllers/candidate.js')

const { verifyToken, verifyAdmin, verifyUser } = require('../util/verify')

routes.post('/list',verifyToken, candidateControlls.listCandidate )
routes.post('/updateStatus',verifyToken, verifyAdmin, candidateControlls.updateCandidateStatus )
routes.post('/add',verifyToken, verifyUser, candidateControlls.addCandidate )
routes.post('/delete',verifyToken, verifyUser, candidateControlls.deleteCandidate )
routes.post('/search', candidateControlls.searchCandidate )



module.exports = routes