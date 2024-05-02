const router = require("express").Router()
const e = require("express");
const {User} = require('../db/User')
const jwt = require('jsonwebtoken')
const auth = require('../middlewares/auth');

router.post('/login', async (req, res) => {
    let { email, password } = req.body;
    let user = await User.authUser(email, password);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  
    let token = jwt.sign({ email: user.email, _id: user._id },
      process.env.TOKEN_KEY,
      { expiresIn: '1h' });
  
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000 // 1 hora en milisegundos
    });
  
    res.json({ message: 'Logged in successfully' });
  });

router.get('/logout', auth.validateTokenWithCookies, (req, res)=>{
    return res.clearCookie('access_token')
              .send({message: "Logged out successfully"});
})

module.exports = router;