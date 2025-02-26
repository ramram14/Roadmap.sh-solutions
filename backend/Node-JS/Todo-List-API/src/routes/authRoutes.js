const express = require('express');
const { LoginUser, RegisterUser, refreshAccessToken } = require('../controllers/authControllers');

const router = express.Router();

/**
* @route POST /api/auth/register
* @desc Register a new user
* @access Public
*/
router.post('/register', RegisterUser);

/**
* @route POST /api/auth/login
* @desc Login a user
* @access Public
*/
router.post('/login', LoginUser);

/**
* @route GET /api/auth/refresh-token
* @desc Refresh access token
* @access Public
*/
router.get('/refresh-token', refreshAccessToken);

module.exports = router