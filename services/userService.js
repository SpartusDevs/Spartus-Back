const User = require('../models/User');
const Developer = require('../models/Developer');
const developerService = require('./developerService'); 

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


const approveOrDisapproveUser = async (adminId, userId, actionData) => {
  try {
    const adminUser = await User.findById(adminId);
    if (!adminUser || adminUser.role !== 'admin') {
      throw new Error('Solo un administrador puede aprobar o desaprobar usuarios');
    }

    const userToUpdate = await User.findById(userId);
    if (!userToUpdate) {
      throw new Error('Usuario no encontrado');
    }

    if (actionData.state !== undefined) {
      userToUpdate.isActive = actionData.state;
    }

    if (actionData.state === true && actionData.role === 'dev') {
      const developerData = {
        userId: userToUpdate._id,
        firstName: userToUpdate.firstName,
        lastName: userToUpdate.lastName,
        email: userToUpdate.email,
        roleDev: actionData.roleDev || 'full', 
      };
      
      // Crear desarrollador
      await developerService.createDeveloper(developerData);
      console.log('Desarrollador creado exitosamente');
    }

    await userToUpdate.save();
    return userToUpdate;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  approveOrDisapproveUser
};
