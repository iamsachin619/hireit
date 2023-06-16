const jwt = require("jsonwebtoken");
const { createError } = require("./createError");



const verifyToken = (req, res, next) => {
  console.log(req.cookies)
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "No token provided!"));
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return next(createError(401, "Invalid token!"));
    req._id = decoded.id;
    req.role = decoded.role;
   
    next();
    return
    
  });
  // req.owner_id = decoded.id;
  //  console.log('vot end')
  // next();
  // console.log('vot d end')
  return;
};

const verifyUser = async (req, res, next) => {
    if(req.role !== 'user') return next(createError(401, "Not a User!"));

    req.user_id = req._id
    return next();
  
    //return next(createError(401, "Unauthorized!"));
  
}

const verifyStaff = async(req,res,next) =>{
    if(req.role !== 'staff') return next(createError(401, 'Not a Staff!'))

    req.body.staff_id = req._id
    return next();
}

const verifyAdmin = async (req, res, next) =>{
    if(req.role !== 'admin') return next(createError(401, 'Not an Admin!'))
    return next();
}

module.exports={verifyToken,verifyUser,verifyStaff,verifyAdmin}