const developerService = require('../services/developerService');

const createDeveloper = async (req, res) => {
  try {
    const newDeveloper = await developerService.createDeveloper(req.body);
    res.status(201).json({ developer: newDeveloper });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

const getAllDevelopers = async (req, res) => {
  try {
    const developers = await developerService.getAllDevelopers();
    res.status(200).json({ developers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los desarrolladores' });
  }
};

const getDeveloperById = async (req, res) => {
  const { id } = req.params;
  try {
    const developer = await developerService.getDeveloperById(id);
    res.status(200).json({ developer });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};

const updateDeveloper = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedDeveloper = await developerService.updateDeveloper(id, req.body);
    res.status(200).json({ developer: updatedDeveloper });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

const deleteDeveloper = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDeveloper = await developerService.deleteDeveloper(id);
    res.status(200).json({ message: 'Desarrollador eliminado', developer: deletedDeveloper });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createDeveloper,
  getAllDevelopers,
  getDeveloperById,
  updateDeveloper,
  deleteDeveloper,
};
