const express = require('express');
const path = require('path');
const productRoutes = require('./routes/product-route');
const cartRoutes = require('./routes/cart-route');
const userRoutes = require('./routes/user-route');
const authRoutes = require('./routes/auth-route');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3101;
const hbs = require('express-handlebars');
const app = express();
const fs = require('fs');

app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: path.join(__dirname, 'views/layouts')
}))

app.set('view engine', 'hbs');

app.use(express.json());
app.use(cookieParser());

app.get('/js/register.js', (req, res) => {
  const filePath = path.join(__dirname, 'js', 'register.js');
  const stream = fs.createReadStream(filePath);
  res.setHeader('Content-Type', 'application/javascript');
  stream.pipe(res);
});

app.get('/js/login.js', (req, res) => {
  const filePath = path.join(__dirname, 'js', 'login.js');
  const stream = fs.createReadStream(filePath);
  res.setHeader('Content-Type', 'application/javascript');
  stream.pipe(res);
});

app.get('/js/sweetalert2.all.min.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, 'js', 'sweetalert2.all.min.js'));
});

// Ruta para servir login.html
app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Ruta para servir signup.html
app.get('/signup.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'singup.html'));
});

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Integrated Assignment 3. e-commerce app');
});

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// app.use('*', (req, res) => {
//   res.redirect('/');
// });

app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});