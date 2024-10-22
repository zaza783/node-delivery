const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register driver

// Generate JWT token
const generateToken = (user, secret, expiresIn) => {
    return jwt.sign(
     {email: user.email, userId: user._id },
     secret,
     { expiresIn }
    );
  };
  
  // Generate refresh token
  
  exports.register = async(req, res, next) => {
    const { 
       name,
       email,
       password
    } = req.body;
  
    // check if user already exists 
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new AppError('Email is already exist!!', 400));
    }
    
  
    const user = new User({
      name, 
      email,
      password
    });
  
    const result = await user.save();
  
    // Executing the genrate token function
    const token = generateToken(result, process.env.JWT_SECRET, '1h');
  
    res.status(200).json({
       message: 'Signed Up Successfully!!!',
       result,
       token
    });
  };
  
// login driver

exports.login = async(req, res, next) => {
    const { email, password } = req.body;
 
    if (!email || !password) {
     return next(new AppError('Please provide your correct email or password', 400));
    }
 
    const user = await User.findOne({ email }).select('+password');
 
    if (!user || !(await user.correctPassword(password, user.password))) {
     return next('Incorrect email or password', 401);
    }
 
    const token = generateToken(user, process.env.JWT_SECRET, '1h');
 
    await user.save({ validateBeforeSave: false });
 
    res.status(200).json({
     token,
    })
 };