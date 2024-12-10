
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.SECRET_KEY;

const registerUser = async ({ firstName, lastName, email, password, role }) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('El correo electrónico ya está registrado');
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      role,
    });

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      secretKey,
      { expiresIn: '1h' }
    );

    return token;
  } catch (error) {
    throw new Error(error.message);
  }
};

const loginUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Correo electrónico o contraseña incorrectos');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Correo electrónico o contraseña incorrectos');
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      secretKey,
      { expiresIn: '1h' }
    );

    const { password: _, updatedAt, createdAt, ...userWithoutSensitiveData } = user.toObject();

    return { token, user: userWithoutSensitiveData };
  } catch (error) {
    throw new Error(error.message);
  }
};


module.exports = {
  registerUser,
  loginUser,
};