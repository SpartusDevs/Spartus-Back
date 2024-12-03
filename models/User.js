const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true, 
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, 
      match: [/\S+@\S+\.\S+/, 'Correo electrónico no válido'], 
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'dev'], 
    },
    roleId: {
      type: String,
      required: false,
    },
    profileImg: {
      type: String,
      required: false,
    },
    birthDate: {
      type: Date, 
      required: false,
    },
    nationality: {
      type: String, 
      required: false,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true, 
    },
    createdAt: {
      type: Date,
      default: Date.now, 
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } 
);

// Creación del modelo
const User = mongoose.model('User', userSchema);

module.exports = User;

