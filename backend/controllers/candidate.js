const mongoose = require("mongoose");
const Candidate = require("../models/candidate");

async function addCandidate(req, res) {
  //only add if the email is not already present in the database with same uploadedBy
  let candidateExisting = await Candidate.candidateModel.findOne({email: req.body.email, uploadedBy: req._id})
  console.log({candidateExisting})
  if(candidateExisting){
    res.status(400).json({msg:"candidate already exists"})
    return
  }
  let candidateData = Candidate.candidateModel({
    resume: req.body.resume,  
	name: req.body.name,
    uploadedBy: req._id,
    dob: req.body.dob,
    email: req.body.email,
    status: 'pending',
    pan: req.body.pan,
    createdAt: new Date(),
  });

  // console.log(req.body.image)
  // console.log(candidateData)
  candidateData.save((err,docs) => {
    if (err) {
      console.log(err);
      res.send("task failed").status(400);
    } else {
      res.json(docs).status(200);
    }
  });
}

async function listCandidate(req, res) {
 
  
  //add pagination to the query with limit and skip functions
  let limit = parseInt(req.body.page) * parseInt(req.body.rows)
  let skip = (parseInt(req.body.page) - 1) * parseInt(req.body.rows)

  const filter = {};
  if(req.role == 'user'){
    filter.uploadedBy = req._id
  }

  if(req.body.status){
    filter.status = req.body.status
  }
  if(req.body.name){ 
    filter.name = req.body.name
  }
  if(req.body.email){
    filter.email = req.body.email
  }
  let total
  if(!req.body.total){
     total = await Candidate.candidateModel.count(filter)
    
  }else{
    total = req.body.total
  }
  let candidateList = await Candidate.candidateModel.find(filter).limit(limit).skip(skip);
  // console.log(candidateList)
  res.json({candidateList,total});
}

async function searchCandidate(req, res) {
  let searchtitle = req.body.search;

  console.log(searchtitle);
  const filter = {
    $or: [
      { email: { $in: [searchtitle] } },
      { name: { $in: [searchtitle] } },
    ],
  };
  let total
 
    total = await Candidate.candidateModel.count(filter)
  
  let candidateList = await Candidate.candidateModel.find(filter);
  //console.log(listofbooks)
  //res.json({title : listofbooks.title , year: listofbooks.yearOfPublishing }).status(200)
  res.json({candidateList,total});
}

async function deleteCandidate(req, res) {
  //check if the req._id is uploader
  let candidate_id = req.body.candidate_id;
  let deleteCandidate = await Candidate.candidateModel.findOneAndDelete({ _id: candidate_id, uploadedBy: req.body.uploadedBy });
  res.json(deleteCandidate);
}

async function updateCandidateStatus(req, res) {
  //check if the req._id is uploader
  let candidate_id = req.body.candidate_id;
  let updateStatus = await Candidate.candidateModel.findOneAndUpdate({ _id: candidate_id}, {status: req.body.status});
  res.json(updateStatus);
// async function editbookctrl(req, res) {
//   let book_id = req.body.book_id;
//   let editObj = req.body.editObj;

//   let updatedBook = await bookForm.bookModel.findByIdAndUpdate(
//      book_id ,
//     { $set: { ...editObj } },
//     { new: true }
//   );
//   res.json(updatedBook);
}

module.exports = {
    addCandidate,
    listCandidate,
  deleteCandidate,
  updateCandidateStatus,
  searchCandidate
};
