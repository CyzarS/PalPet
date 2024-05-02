const {User} = require('../db/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware para validar el token en el encabezado
function validateHeader(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'No authorization header provided' });
    }
  
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
  
    req.token = token;
    next();
  }

// Middleware para validar si el usuario es administrador
function validateAdmin(req, res,next){
    let pass= '23423'
    req.admin = false
    if(req.token == pass){
        req.admin = true
    }

    next()
}

// Middleware para requerir que el usuario sea administrador
function requiredAdmin(req,res, next){
    let pass= '23423'
    req.admin = false
    if(req.token == pass){
        req.admin = true
        next()
        return;
    }

    res.status(401).send({error: 'You are not admin'})

} 

function validateUser(req, res, next) {
    const token = req.cookies.access_token; // Obtener el token de las cookies
  
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
  
    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: err.message });
      }
  
      req.user = decoded._id; // Asignar el ID del usuario a req.user
      next();
    });
  }

// Middleware para validar el token
function validateToken(req, res, next) {
    let token = req.get('x-token')

    if(!token) {
        res.status(401).send({error: "token is missing"})
        return
    }

    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded)=> {
        if(err) {
            res.status(401).send({error: err.message})
            return
        }

        req.email= decoded.email;
        req._id= decoded._id;
        next()
    })
}

// Middleware para validar el token en las cookies
function validateTokenWithCookies(req, res, next) {
    let token = req.cookies.access_token;

    if(!token) {
        res.status(401).send({error: "token is missing"})
        return
    }

    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded)=> {
        if(err) {
            res.status(401).send({error: err.message})
            return
        }

        req.email= decoded.email;
        req._id= decoded._id;
        next()
    })
}

module.exports = { validateToken, validateHeader, validateTokenWithCookies, validateAdmin, requiredAdmin, validateUser}