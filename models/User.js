const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 

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
    phone:{
      type: String,
      required: false,
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
      default: false, 
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

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10); 
    this.password = await bcrypt.hash(this.password, salt); 
  }
  next(); 
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
