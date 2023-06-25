const jwt = require("jsonwebtoken");
const { createError } = require("./createError");



const verifyToken = (req, res, next) => {
  console.log('cookeiss obj ----',req.cookies)
  const token = req.cookies.access_token;
  console.log('token',token)
  if (!token) {
    // console.log('verify error')
    createError(401, "No token provided!", res)
    // console.log('verify error end')
    return;
  }
  console.log('verify before jwt')
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return createError(401, "Invalid token!", res);
    req._id = decoded.id;
    req.role = decoded.role; 
    // console.log('verify clear')
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
    if(req.role !== 'user') return createError(401, "Not a User!", res);

    req.user_id = req._id
    return next();
  
    //return next(createError(401, "Unauthorized!"));
  
}

const verifyStaff = async(req,res,next) =>{
    if(req.role !== 'staff') return createError(401, 'Not a Staff!', res)

    req.body.staff_id = req._id
    return next();
}

const verifyAdmin = async (req, res, next) =>{
  console.log('verify admin')
    if(req.role !== 'admin') return createError(401, 'Not an Admin!',res)
    return next();
}

module.exports={verifyToken,verifyUser,verifyStaff,verifyAdmin}