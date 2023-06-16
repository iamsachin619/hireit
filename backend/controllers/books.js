const mongoose = require("mongoose");
const bookForm = require("../models/bookModel");

function addbooksctrl(req, res) {
  let bookData = bookForm.bookModel({
    image: req.imgName,
    title: req.body.title,
    author: req.body.author,
    publisher: req.body.publisher,
    category: req.body.category,
    yearOfPublishing: req.body.yearOfPublishing,
    uploader: req.body.staff_id,
    amountRate: req.body.amountRate,
  });

  // console.log(req.body.image)
  // console.log(bookData)
  bookData.save((err,docs) => {
    if (err) {
      console.log(err);
      res.send("task failed").status(400);
    } else {
      res.json(docs).status(200);
    }
  });
}

async function listbooksctrl(req, res) {
  
  const filter = {};
  let listofbooks = await bookForm.bookModel.find(filter);
  console.log(listofbooks);
  //res.json({title : listofbooks.title , year: listofbooks.yearOfPublishing }).status(200)
  res.json(listofbooks);
}

async function searchbooksctrl(req, res) {
  let searchtitle = req.body.search;

  console.log(searchtitle);
  const filter = {
    $or: [
      { title: { $in: [searchtitle] } },
      { publisher: { $in: [searchtitle] } },
    ],
  };
  let listofbooks = await bookForm.bookModel.find(filter);
  //console.log(listofbooks)
  //res.json({title : listofbooks.title , year: listofbooks.yearOfPublishing }).status(200)
  res.json(listofbooks);
}

async function deletebooksctrl(req, res) {
  let book_id = req.body.book_id;
  let deleteBook = await bookForm.bookModel.findOneAndDelete({ _id: book_id });
  res.json(deleteBook);
}

async function editbookctrl(req, res) {
  let book_id = req.body.book_id;
  let editObj = req.body.editObj;

  let updatedBook = await bookForm.bookModel.findByIdAndUpdate(
     book_id ,
    { $set: { ...editObj } },
    { new: true }
  );
  res.json(updatedBook);
}

module.exports = {
  addbooksctrl,
  listbooksctrl,
  searchbooksctrl,
  deletebooksctrl,
  editbookctrl,
};
