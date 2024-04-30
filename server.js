const express = require('express');
const app = express();
const router = require('./app/controllers/router');

app.use(express.static('app'));
app.use('/views', express.static('views'));

app.use(express.json());
app.use(router);


app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
