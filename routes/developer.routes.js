const express = require("express");
const devController = require('../controllers/DeveloperController');
const router = express.Router();



router.post('/', devController.createDeveloper);
router.get('/', devController.getAllDevelopers);
router.get('/:id', devController.getDeveloperById);
router.put('/:id', devController.updateDeveloper);
router.delete('/:id', devController.deleteDeveloper);



module.exports = router;