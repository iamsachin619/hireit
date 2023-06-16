const mongoose = require("mongoose");
const rentForm = require("../models/rentmodel");
const bookForm = require("../models/bookModel");
//renting the book
async function bookrentalcreatecltr(req, res) {
  let dueDate = new Date();
  todaysday = dueDate.getDate();


  dueDate.setDate(todaysday + req.body.noOfDaysToRent ) //req.body.noOfDaysToRent
//   rentaldays = todaysday + 30;
//   console.log(rentaldays);
  console.log(req.body)
  let book = await bookForm.bookModel.findOne({_id:req.body.book_id})
  console.log({book})
  let rentData = rentForm.rentModel({
    Book_id: req.body.book_id,
    User_id: req.user_id,
    createdDate: new Date(),
    dueDate: new Date(),
    approvalDate: new Date(),
    amount: book.amountRate * req.body.noOfDaysToRent,
    approvedBy: "",
    lateFeeCharged: 0,
    returnDate: "",
    Status: "pending",
    noOfDaysToRent:req.body.noOfDaysToRent

  });

      rentData.save(err => {
          if(err){
              console.log(err)
          }
          else{
              res.send({success: true });
          }})
}



async function usermybooks(req, res) {
  let user_id = req.user_id;
  let rentsByUser = await rentForm.rentModel.find({
    User_id: user_id,
    Status: "approved",
  });
  console.log(rentsByUser);
  let myBooks = await Promise.all(
    rentsByUser.map(async (rental) => {
      let book = await bookForm.bookModel.findOne({ _id: rental.Book_id });
      return {...book._doc, rental:rental._doc};
    })
  );

  res.json(myBooks);
}

async function usermyOrders(req, res) {
  let user_id = req.user_id;
  let rentsByUser = await rentForm.rentModel.find({ User_id: user_id });
  
  let ordersWithBooks = await Promise.all(
    rentsByUser.map(async ( orders) => {
      let book = await bookForm.bookModel.findById(orders.Book_id)
      console.log(book)
      return {...orders._doc, book}
    })
    
  )
    
  
  console.log({ordersWithBooks})
  res.json(ordersWithBooks);
}


async function userReturnBook(req, res){
  let rent_id = req.body.rent_id
  let user_id = req.user_id
  let rental = await rentForm.rentModel.findById(rent_id)
  console.log({rental})
  if(rental.User_id != user_id || rental.Status != 'approved'){
    res.json({err:'Book does not belong to you'}).status(400)
  }
  let currentDate = new Date()
  let lateFeeCharged = 0
  if(rental.dueDate < currentDate){
    console.log(rental.dueDate)
    let book = await bookForm.bookModel.findById(rental.Book_id)
    let daysLate = currentDate.getDate() - rental.dueDate.getDate(); 
    console.log(daysLate)
    lateFeeCharged = process.env.LATE_FEE * daysLate

    //plus book rate per day
    lateFeeCharged = lateFeeCharged + (book.amountRate * daysLate)
    console.log(lateFeeCharged)
  }else{
    console.log(false)
  }
  let updatedRental = await rentForm.rentModel.findByIdAndUpdate(rent_id,{$set:{Status:'closed',returnDate:new Date(),lateFeeCharged:lateFeeCharged }},{new:true})
  res.json(updatedRental).status(200)
}

module.exports = {
  bookrentalcreatecltr,
  usermybooks,
  usermyOrders,
  userReturnBook
};
