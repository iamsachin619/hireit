const express  = require('express')
const routes = express.Router()
//const {addbooksctrl} = require('../controllers/books.js')
const candidateControlls = require('../controllers/candidate.js')


routes.post('/list', candidateControlls.listCandidate )
routes.post('/updateStatus', candidateControlls.updateCandidateStatus )
routes.post('/add', candidateControlls.addCandidate )
routes.post('/delete', candidateControlls.deleteCandidate )
routes.post('/search', candidateControlls.searchCandidate )



module.exports = routes