const mongoose = require('mongoose');

const developerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Correo único
      match: [/\S+@\S+\.\S+/, 'Correo electrónico no válido'],
    },
    numberPhone: {
      type: String,
      required: false,
    },
    photoProfile: {
      type: String, 
      required: false,
    },
    linkedinUrl: {
      type: String,
      required: false,
    },
    gitHubUrl: {
      type: String,
      required: false,
    },
    roleDev: {
      type: String,
      enum: ['front', 'back', 'full'], 
      required: true,
    },
    aboutMe:{
        type: String,
        required:false,
    },
    joinDate: {
      type: Date,
      default: Date.now, 
    },
    proyects: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: false,
    }],
  },
  { timestamps: true } 
);

const Developer = mongoose.model('Developer', developerSchema);

module.exports = Developer;
