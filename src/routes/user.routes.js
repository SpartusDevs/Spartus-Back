const express = require("express");
const userController = require('../controllers/UserController');
const authController = require('../controllers/AuthController');
const authMiddleware = require('../middlewares/authMiddleware'); 
const router = express.Router();



router.post('/', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/edit_profile',authMiddleware, userController.updateMyProfile);
router.put('/:id',  userController.updateUser);

router.delete('/:id', userController.deleteUser);

router.post('/approve-disapprove', authMiddleware, userController.approveOrDisapproveUser);

module.exports = router;