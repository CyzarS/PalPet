const express = require('express');
const path = require('path');
const petRoutes = require('./routes/pet-route');
const likeRoutes = require('./routes/like-route');
const userRoutes = require('./routes/user-route')
const port = 3101;
const app = express();
const fs = require('fs');

app.use(express.json());

app.get('/js/register.js', (req, res) => {
  const filePath = path.join(__dirname, 'js', 'register.js');
  const stream = fs.createReadStream(filePath);
  res.setHeader('Content-Type', 'application/javascript');
  stream.pipe(res);
});

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para servir signup.html
app.get('/signup.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'singup.html'));
});

app.get('/', (req, res) => {
  res.send('Integrated Assignment 3. e-commerce app');
});

app.use('/api/products', petRoutes);

app.use('/api/cart', likeRoutes);

app.use('/api/users', userRoutes);

app.use('*', (req, res) => {
  res.redirect('/');
})

app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});