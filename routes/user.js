const express = require('express');
const router = express.Router();
const {handleUserSignup,handleUserLogin} = require('../controllers/user');

//sign up request
router.post('/',handleUserSignup);
router.post('/login',handleUserLogin);
module.exports= router;