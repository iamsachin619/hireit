const mongoose = require('mongoose');
// const url = 'mongodb+srv://hero:23M33cSW3rQ3pEwS@cluster0.ycy0x.mongodb.net/BooksLibrary';
const url =  'mongodb://localhost:27017/onlineLib';

// connect to database.
mongoose.connect(url);
// opt to use Global Promise library.
mongoose.Promise = global.Promise;
// connection for us to use.
const db = mongoose.connection;
// to get errors.
db.on('error', console.error.bind(console, 'DB Error: '));

module.exports = { db, mongoose };