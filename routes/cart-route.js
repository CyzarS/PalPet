const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const Cart = require('../db/Cart');
const Product = require('../db/Product');

router.get('/', authMiddleware.validateUser, async (req, res) => {
    try {
        const userId = req.user; // Obtenemos el ID del usuario autenticado

        // Buscar el carrito del usuario
        const userCart = await Cart.findOne({ user: userId }).populate('products.productId');

        if (!userCart) {
            return res.status(404).json({ error: 'Cart not found for the specified user.' });
        }

        // Transformar los productos del carrito para excluir el atributo 'stock'
        const cartWithoutStock = {
            ...userCart.toObject(),
            products: userCart.products.map(item => {
                const { stock, ...productWithoutStock } = item.productId.toObject();
                return { ...item.toObject(), productId: productWithoutStock };
            })
        };

        res.status(200).json({ cart: cartWithoutStock });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Ruta para agregar un producto al carrito de un usuario
router.post('/add', authMiddleware.validateUser, async (req, res) => {
    try {
        const userId = req.user; // Obtenemos el ID del usuario autenticado
        const { productId, quantity } = req.body;

        // Verificar si el producto existe en la base de datos
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: `Product with ID ${productId} not found.` });
        }

        // Buscar el carrito del usuario
        let userCart = await Cart.findOne({ user: userId });

        // Si el carrito no existe, crear uno nuevo
        if (!userCart) {
            userCart = new Cart({
                user: userId,
                products: []
            });
        }

        // Verificar si el producto ya existe en el carrito
        const existingProduct = userCart.products.find(item => item.productId.toString() === productId);

        if (existingProduct) {
            // Si el producto ya existe, verificar si la cantidad total (existente + nueva) excede el stock
            const totalQuantity = existingProduct.quantity + quantity;
            if (totalQuantity > product.stock) {
                return res.status(400).json({ error: `Insufficient stock for product with ID ${productId}.` });
            }
            existingProduct.quantity = totalQuantity;
        } else {
            // Si el producto no existe, verificar si la cantidad nueva excede el stock
            if (quantity > product.stock) {
                return res.status(400).json({ error: `Insufficient stock for product with ID ${productId}.` });
            }
            userCart.products.push({ productId, quantity });
        }

        // Guardar el carrito actualizado
        await userCart.save();

        res.status(200).json({ message: 'Product added to cart successfully', cart: userCart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Ruta para actualizar la cantidad de un producto en el carrito
router.put('/update', authMiddleware.validateUser, async (req, res) => {
    try {
        const userId = req.user; // Obtenemos el ID del usuario autenticado
        const { productId, quantity } = req.body;

        // Verificar si el producto existe en la base de datos
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: `Product with ID ${productId} not found.` });
        }

        // Verificar si hay suficiente stock disponible
        if (quantity > product.stock) {
            return res.status(400).json({ error: `Insufficient stock for product with ID ${productId}.` });
        }

        // Buscar el carrito del usuario
        const userCart = await Cart.findOne({ user: userId });

        if (!userCart) {
            return res.status(404).json({ error: 'Cart not found for the specified user.' });
        }

        // Buscar el producto en el carrito
        const cartProduct = userCart.products.find(item => item.productId.toString() === productId);

        if (!cartProduct) {
            return res.status(404).json({ error: `Product with ID ${productId} not found in the cart.` });
        }

        // Actualizar la cantidad del producto en el carrito
        cartProduct.quantity = quantity;

        // Guardar el carrito actualizado
        await userCart.save();

        res.status(200).json({ message: 'Cart updated successfully', cart: userCart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Ruta para eliminar un producto del carrito
router.delete('/remove/:productId', authMiddleware.validateUser, async (req, res) => {
    try {
        const userId = req.user; // Obtenemos el ID del usuario autenticado
        const productId = req.params.productId;

        // Buscar el carrito del usuario
        const userCart = await Cart.findOne({ user: userId });

        if (!userCart) {
            return res.status(404).json({ error: 'Cart not found for the specified user.' });
        }

        // Buscar el índice del producto en el carrito
        const productIndex = userCart.products.findIndex(item => item.productId.toString() === productId);

        if (productIndex === -1) {
            return res.status(404).json({ error: `Product with ID ${productId} not found in the cart.` });
        }

        // Eliminar el producto del carrito
        userCart.products.splice(productIndex, 1);

        // Guardar el carrito actualizado
        await userCart.save();

        res.status(200).json({ message: 'Product removed from cart successfully', cart: userCart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;