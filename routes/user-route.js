const express = require('express');
const router = express.Router();
const { User } = require('../db/User');
const authMiddleware = require('../middlewares/auth');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

router.get('/', authMiddleware.validateUser, async (req, res) => {
  try {
    // Obtener el ID del usuario del token
    const userId = req.user;

    // Buscar el usuario en la base de datos por su ID
    const user = await User.findById(userId);

    // Verificar si el usuario existe
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Devolver los datos del usuario
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/update', authMiddleware.validateUser, async (req, res) => {
  try {
    const userId = req.user; // ID del usuario obtenido del token

    const updateFields = {};
    if (req.body.phone !== undefined) {
      updateFields.phone = req.body.phone;
    }
    
    if (req.body.location !== undefined) {
      updateFields.location = req.body.location;
    }

    // Actualizar el usuario en la base de datos
    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log("Usuario actualizado:");
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
/*
router.get('/', authMiddleware.validateTokenWithCookies, async (req, res) => {
  try {
    /*if (!req.isAdmin) {
      return res.status(403).json({ error: 'Forbidden - Only admins can view users' });
    }

    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
*/

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user with the hashed password
    const newUser = await User.saveUser({ name, email, password: hashedPassword, isAdmin });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;