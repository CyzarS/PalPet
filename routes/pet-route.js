const express = require('express');
const router = express.Router();
const { Pet } = require('../db/Pet');
const authMiddleware = require('../middlewares/auth');
const { validatePetAttributes } = require('../middlewares/pet-validation');

router.get('/', authMiddleware.validateHeader, authMiddleware.validateAdmin, async (req, res) => {
  try {
    let filteredPets = await Product.find();
    // Filtrar por atributos
    const { query } = req;
    Object.keys(query).forEach((key) => {
      let value = query[key].toLowerCase();
      filteredPets = filteredPets.filter((product) =>
          product[key] && product[key].toLowerCase().includes(value)
      );
    });

    // Ocultar el atributo 'stock' para usuarios no administradores
    let productsToReturn = filteredPets.map((product) => {
      if (!req.admin) {
        let { stock, ...rest } = product.toObject(); // Convertir a objeto para eliminar el atributo virtual '_id'
        return rest;
      }
      return product;
    });

    res.json(productsToReturn);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', authMiddleware.validateHeader, authMiddleware.validateAdmin, async (req, res) => {
  try {
    let productId = req.params.id;
    let product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (!req.admin) {
      let { stock, ...rest } = product.toObject(); // Convertir a objeto para eliminar el atributo virtual '_id'
      return res.json(rest);
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', authMiddleware.validateHeader, authMiddleware.requiredAdmin, async (req, res) => {
  try {
    let newProductData = req.body;

    let validationResult = validatePetAttributes(newProductData);
    if (!validationResult.isValid) {
      return res.status(400).json({ error: 'Missing or invalid attributes', missingAttributes: validationResult.missingAttributes });
    }

    let existingProduct = await Product.findOne({ name: newProductData.name });
    if (existingProduct) {
      return res.status(400).json({ error: 'Product with the same name already exists' });
    }

    let newProduct = new Product(newProductData);
    await newProduct.save();

    res.status(201).json({ message: `Product '${newProduct.name}' created successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', authMiddleware.validateHeader, authMiddleware.requiredAdmin, async (req, res) => {
  try {
    let productId = req.params.id;
    let updatedProductData = req.body;

    let validationResult = validatePetAttributes(updatedProductData);
    if (!validationResult.isValid) {
      return res.status(400).json({ error: 'Missing or invalid attributes', missingAttributes: validationResult.missingAttributes });
    }

    let existingProduct = await Product.findOne({ name: updatedProductData.name, _id: { $ne: productId } });
    if (existingProduct) {
      return res.status(400).json({ error: 'Another product with the same name already exists' });
    }

    let updatedProduct = await Product.findByIdAndUpdate(productId, updatedProductData, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ message: `Product '${updatedProduct.name}' updated successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', authMiddleware.validateHeader, authMiddleware.requiredAdmin, async (req, res) => {
  try {
    let productId = req.params.id;

    let deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ message: `Product '${deletedProduct.name}' deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
