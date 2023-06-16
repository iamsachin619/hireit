const { bookModel } = require('../models/bookModel')
const {rentModel} = require('../models/rentmodel')
const { userModel } = require('../models/userModel')

const listPendingRequests = async (req, res) => {
    let pendingRequests = await rentModel.find({Status: 'pending'})
    console.log({pendingRequests})

    let listWithBooks = await Promise.all(
      pendingRequests.map(async request =>{
        let book = await bookModel.findById(request.Book_id)
        return {...request._doc, book: book}
      })
    )
    console.log(listWithBooks)
    let listWithUser = await Promise.all(
      listWithBooks.map(async request =>{
        let user = await userModel.findById(request.User_id)
        return {...request, user: {email: user.email}}
      })
    )
    res.json(listWithUser).status(200)
}

async function bookrentalapprovalctrl(req, res) {
    const rental_id = req.body.rental_id;
    const staff_id = req.body.staff_id;
    console.log(req._id);
  
    // let rentData = await rentForm.rentModel.find({_id : req.body._id })
  
    //updating rent object
    let dueDate = new Date()
    let rent = await rentModel.findOne({_id : rental_id})
    console.log({rent})
    dueDate.setDate(dueDate.getDate()  + rent.noOfDaysToRent)
    let rentData = await rentModel.findOneAndUpdate(
      { _id: rental_id },
      { approvedBy: staff_id, Status: "approved",approvalDate:new Date() ,dueDate: dueDate },
      { new: true }
      // (err, docs) => {
      //   if (err) {
      //     console.log(err);
      //     res.send("task failed");
      //   } else {
      //     console.log("Updated: ", docs);
      //     res.send("approved").status(200);
      //   }
      // }
    );
    if(rentData){
      res.send("approved").status(200);
    }else{
      res.send("task failed").status(400);
    }
    console.log(rentData);
  
    // res.send("let check")
  }

async function bookrentaldeclinectrl(req, res){
  const rental_id = req.body.rental_id;
  const staff_id = req.body.staff_id;
  console.log(req._id);

  // let rentData = await rentForm.rentModel.find({_id : req.body._id })

  //updating rent object
  let dueDate = new Date()
  let rent = await rentModel.findOne({_id : rental_id})
  console.log({rent})
  dueDate.setDate(dueDate.getDate()  + rent.noOfDaysToRent)
  let rentData = await rentModel.findOneAndUpdate(
    { _id: rental_id },
    { Status: "declined"},
    { new: true }
    // (err, docs) => {
    //   if (err) {
    //     console.log(err);
    //     res.send("task failed");
    //   } else {
    //     console.log("Updated: ", docs);
    //     res.send("approved").status(200);
    //   }
    // }
  );
  if(rentData){
    res.send("declined").status(200);
  }else{
    res.send("task failed").status(400);
  }
}  

module.exports={listPendingRequests, bookrentalapprovalctrl, bookrentaldeclinectrl}