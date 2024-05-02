const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const Like = require('../db/Like');
const Pet = require('../db/Pet');

router.post('/', authMiddleware.validateHeader, authMiddleware.validateUser, async (req, res) => {
    try {
        const userId = req.user; // Obtenemos el ID del usuario autenticado

        let likeItems = req.body;

        // Validar que el "carrito" sea un array
        if (!Array.isArray(likeItems)) {
            return res.status(400).json({ error: 'Invalid request body. Expected an array.' });
        }

        // Verificar y actualizar las cantidades de las mascotas en el carrito
        for (const item of likeItems) {
            const pet = await Pet.findById(item.petId);

            if (!pet) {
                return res.status(404).json({ error: `Pet with ID ${item.petId} not found.` });
            }

            if (item.quantity <= 0) {
                return res.status(400).json({ error: 'Quantity must be greater than 0.' });
            }

            if (item.quantity > pet.stock) {
                return res.status(400).json({ error: `Insufficient stock for pet with ID ${item.petId}.` });
            }
        }

        // Actualizar el carrito del usuario en la base de datos
        let userLike = await Like.findOneAndUpdate(
            { user: userId }, // Buscamos el carrito del usuario por su ID
            { pets: likeItems }, // Actualizamos las mascotas del carrito
            { upsert: true, new: true }
        );

        res.status(202).json({ message: 'Like updated successfully.', like: userLike });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/update', authMiddleware.validateHeader, authMiddleware.validateUser, async (req, res) => {
    try {
        const { petId, quantity } = req.body;

        // Verificar si la mascota existe en la base de datos
        const pet = await Pet.findById(petId);

        if (!pet) {
            return res.status(404).json({ error: `Pet with ID ${petId} not found.` });
        }

        // Verificar si hay suficiente stock disponible
        if (quantity > pet.stock) {
            return res.status(400).json({ error: `Insufficient stock for pet with ID ${petId}.` });
        }

        // Actualizar la cantidad de la mascota en el carrito
        let userLike = await Like.findOne({ user: req.user });

        if (!userLike) {
            return res.status(404).json({ error: 'Like not found for the specified user.' });
        }

        let updatedLike = userLike.like.map(item => {
            if (item.petId === petId) {
                item.quantity = quantity;
            }
            return item;
        });

        await Like.updateOne({ user: req.user }, { like: updatedLike });

        res.status(202).json({ message: 'Like updated successfully.', like: updatedLike });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:petId', authMiddleware.validateHeader, authMiddleware.validateUser, async (req, res) => {
    try {
        const petId = req.params.petId;

        // Eliminar la mascota del carrito
        let userLike = await Like.findOne({ user: req.user });

        if (!userLike) {
            return res.status(404).json({ error: 'Like not found for the specified user.' });
        }

        let updatedLike = userLike.like.filter(item => item.petId !== petId);

        await Like.updateOne({ user: req.user }, { like: updatedLike });

        res.status(200).json({ message: 'Pet removed from like successfully.', like: updatedLike });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
