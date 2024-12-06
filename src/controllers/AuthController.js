const authService = require('../services/authService'); 

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    const token = await authService.registerUser({
      firstName,
      lastName,
      email,
      password,
      role,
    });

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await authService.loginUser({ email, password });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al autenticar el usuario', error: error.message });
  }
};

module.exports = { registerUser, loginUser };
