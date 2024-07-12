const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    minlength: 3,
    maxlength: 50,
    match: [/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]{2,4}$/, 'Please provide a valid email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    maxlength: 100,
  }
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.createjwt = function() {
  return jwt.sign(
    { userId: this._id, name: this.name },
   process.env.Security_key,
    { expiresIn: process.env.Security_life }
  );
};

userSchema.methods.getName = function() {
  return this.name;
};
userSchema.methods.comparepassword=async function(candidatePassword){
  const ismatch=await bcrypt.compare(candidatePassword,this.password)
  return ismatch;
}

module.exports = mongoose.model('User', userSchema);
 