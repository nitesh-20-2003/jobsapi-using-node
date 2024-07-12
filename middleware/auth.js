const User=require('../models/user');
const jwt =require('jsonwebtoken');
const {Unauthenticateerror}=require('../errors');
const auth=(req,res,next)=>{
  // check header
  const authheader=req.headers.authorization;
  if (!authheader || !authheader.startsWith('Bearer')) {
    throw new Unauthenticateerror('No token provided');
  }
  
  const token=authheader.split(' ')[1];
  // console.log(token)
  try {
    const payload=jwt.verify(token,process.env.Security_key);
    // attach use r to the job route
    // console.log(payload);
    req.user={userid:payload,name:payload.name};
    
    next();

  } catch (error) 
  {
    throw new Unauthenticateerror('Authenticatin failed');
  }
}
module.exports=auth;