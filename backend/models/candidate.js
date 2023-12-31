const db = require('./mongodb').db;
const mongoose = require('./mongodb').mongoose;   // connection is already established @mongodb.js file.

//Creating the Schema for candidate
let candidateSchema = mongoose.Schema({
    resume: String,  
	name: String,
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userdetails'
    },
    dob: String,
    email: String,
    status: {
        type:String,
        enum: ['pending', 'forwarded', 'rejected','scheduled']
    },
    pan: String,
    createdAt: Date,
 });


let candidateModel = mongoose.model('candidatesdetails', candidateSchema);

module.exports = { candidateModel };