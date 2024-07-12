const User = require('../models/user');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');
const { CustomAPIError, Badrequest, Unauthenticateerror } = require('../errors');

const register = async (req, res, next) => {
  try {
    const user = await User.create({ ...req.body });
    const token = user.createjwt();
    res.status(StatusCodes.CREATED).json({ user: { name: user.getName() }, token });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
    // res.send(error);
  }
}
const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Badrequest('Please provide a valid email and password');
  }
  const user = await User.findOne({ email });
  // if user doesn't exist, throw an error
  if (!user) {
    throw new Unauthenticateerror("User doesn't exist, invalid credentials");
  }
  const isPasswordCorrect = await user.comparepassword(password);
  if (!isPasswordCorrect) {
    throw new Unauthenticateerror('Invalid credentials');
  }
  const token = user.createjwt();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  register,
  login
};
