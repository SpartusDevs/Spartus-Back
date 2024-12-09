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
    // Autenticar al usuario y obtener el token
    const { token, user } = await authService.loginUser({ email, password });

    res.json({ token, user }); // Incluir el usuario en la respuesta
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error al autenticar el usuario',
      error: error.message,
    });
  }
};


module.exports = { registerUser, loginUser };
