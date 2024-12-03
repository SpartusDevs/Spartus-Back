const User = require('../models/User');

const createUser = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    throw new Error('Error al crear el usuario: ' + error.message);
  }
};

const getAllUsers = async () => {
  try {
    return await User.find();
  } catch (error) {
    throw new Error('Error al obtener los usuarios: ' + error.message);
  }
};

const getUserById = async (userId) => {
  try {
    return await User.findById(userId);
  } catch (error) {
    throw new Error('Error al obtener el usuario: ' + error.message);
  }
};

const updateUser = async (userId, updatedData) => {
  try {
    return await User.findByIdAndUpdate(userId, updatedData, { new: true });
  } catch (error) {
    throw new Error('Error al actualizar el usuario: ' + error.message);
  }
};

const deleteUser = async (userId) => {
  try {
    return await User.findByIdAndDelete(userId);
  } catch (error) {
    throw new Error('Error al eliminar el usuario: ' + error.message);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
