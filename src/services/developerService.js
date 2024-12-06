const Developer = require('../models/Developer');
const User = require('../models/User');

const createDeveloper = async (data) => {
  const {
    userId,
    firstName,
    lastName,
    email,
    numberPhone,
    photoProfile,
    linkedinUrl,
    gitHubUrl,
    roleDev,
    proyects
  } = data;

  try {
    const userExists = await User.findById(userId);
    if (!userExists) {
      throw new Error('El usuario no existe');
    }

    const newDeveloper = new Developer({
      userId,
      firstName,
      lastName,
      email,
      numberPhone,
      photoProfile,
      linkedinUrl,
      gitHubUrl,
      roleDev,
      proyects
    });

    return await newDeveloper.save();
  } catch (error) {
    throw error;
  }
};

const getAllDevelopers = async () => {
  try {
    return await Developer.find().populate('userId', 'firstName lastName email');
  } catch (error) {
    throw new Error('Error al obtener los desarrolladores');
  }
};

const getDeveloperById = async (id) => {
  try {
    const developer = await Developer.findById(id).populate('userId', 'firstName lastName email');
    if (!developer) {
      throw new Error('Desarrollador no encontrado');
    }
    return developer;
  } catch (error) {
    throw error;
  }
};

const updateDeveloper = async (id, data) => {
  try {
    const updatedDeveloper = await Developer.findByIdAndUpdate(id, data, { new: true });
    if (!updatedDeveloper) {
      throw new Error('Desarrollador no encontrado');
    }
    return updatedDeveloper;
  } catch (error) {
    throw error;
  }
};

const deleteDeveloper = async (id) => {
  try {
    const deletedDeveloper = await Developer.findByIdAndDelete(id);
    if (!deletedDeveloper) {
      throw new Error('Desarrollador no encontrado');
    }
    return deletedDeveloper;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createDeveloper,
  getAllDevelopers,
  getDeveloperById,
  updateDeveloper,
  deleteDeveloper,
};
