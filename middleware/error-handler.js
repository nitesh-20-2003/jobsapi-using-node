const { StatusCodes } = require('http-status-codes');
const { CustomAPIError } = require('../errors');

const errorHandlerMiddleware = (err, req, res, next) => {
  // set default
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, try again buddy"
  };

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message });
  // } 
  if (err.name === 'ValidationError') {
    // Extract errors from the ValidationError object
    let message=[];
   Object.values(err.errors).map((item)=>message.push(item.message)
   )
   console.log(message);
   customError.msg=message.join(',');
   customError.statusCode=400;
  }
  // console.log(Object.values(err.errors));

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)}, please choose another value.`;
    console.log(Object.keys(err.keyValue));
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
