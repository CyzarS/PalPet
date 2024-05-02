const express = require('express');
const router = express.Router();
const { Pet } = require('../db/Pet');
const authMiddleware = require('../middlewares/auth');
const { validatePetAttributes } = require('../middlewares/pet-validation');

router.get('/', authMiddleware.validateHeader, authMiddleware.validateAdmin, async (req, res) => {
  try {
    let filteredPets = await Pet.find();
    // Filtrar por atributos
    const { query } = req;
    Object.keys(query).forEach((key) => {
      if (key !== 'available') {
        // Filtrar por otros atributos (excepto available)
        let value = query[key].toLowerCase();
        filteredPets = filteredPets.filter((pet) =>
          pet[key] && pet[key].toLowerCase().includes(value)
        );
      }
    });

    // Ocultar el atributo 'available' para usuarios no administradores
    let petsToReturn = filteredPets.map((pet) => {
      if (!req.admin) {
        let { available, ...rest } = pet.toObject(); // Convertir a objeto para eliminar el atributo virtual '_id'
        return rest;
      }
      return pet;
    });

    res.json(petsToReturn);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', authMiddleware.validateHeader, authMiddleware.validateAdmin, async (req, res) => {
  try {
    let petId = req.params.id;
    let pet = await Pet.findById(petId);

    if (!pet) {
      return res.status(404).json({ error: 'pet not found' });
    }

    if (!req.admin) {
      let { available, ...rest } = pet.toObject(); // Convertir a objeto para eliminar el atributo virtual '_id'
      return res.json(rest);
    }

    res.json(pet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', authMiddleware.validateHeader, authMiddleware.requiredAdmin, async (req, res) => {
  try {
    let newPetData = req.body;

    let validationResult = validatePetAttributes(newPetData);
    if (!validationResult.isValid) {
      return res.status(400).json({ error: 'Missing or invalid attributes', missingAttributes: validationResult.missingAttributes });
    }

    let existingPet = await Pet.findOne({ name: newPetData.name });
    if (existingPet) {
      return res.status(400).json({ error: 'Pet with the same name already exists' });
    }

    let newPet = new Pet(newPetData);
    await newPet.save();

    res.status(201).json({ message: `Pet '${newPet.name}' created successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', authMiddleware.validateHeader, authMiddleware.requiredAdmin, async (req, res) => {
  try {
    let petId = req.params.id;
    let updatedPetData = req.body;

    let validationResult = validatePetAttributes(updatedPetData);
    if (!validationResult.isValid) {
      return res.status(400).json({ error: 'Missing or invalid attributes', missingAttributes: validationResult.missingAttributes });
    }

    let existingPet = await Pet.findOne({ name: updatedPetData.name, _id: { $ne: petId } });
    if (existingPet) {
      return res.status(400).json({ error: 'Another pet with the same name already exists' });
    }

    let updatedPet = await Pet.findByIdAndUpdate(petId, updatedPetData, { new: true });
    if (!updatedPet) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    res.status(200).json({ message: `Pet '${updatedPet.name}' updated successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', authMiddleware.validateHeader, authMiddleware.requiredAdmin, async (req, res) => {
  try {
    let petId = req.params.id;

    let deletedPet = await Pet.findByIdAndDelete(petId);
    if (!deletedPet) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    res.status(200).json({ message: `Pet '${deletedPet.name}' deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
