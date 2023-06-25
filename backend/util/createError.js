const createError = (status, message, res) => {
    const err = {};
    err.status = status;
    err.message = message;
    res.status(status).json(err);
    // console.log('create error')
  };
   
  module.exports = {createError};