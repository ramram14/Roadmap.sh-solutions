const express = require('express');
const { createShortenUrl, getOriginalUrl, updateOriginalUrl, deleteUrl, getUrlStats } = require('../controllers/urlControllers');

const router = express.Router();

/**
| -------------------------------------------------------------------------------------------------
* @route POST /api/shorten
| -------------------------------------------------------------------------------------------------
*/

/**
* @description Create a new shorten url
* @access Public
*/
router.post('/', createShortenUrl);

/**
* @description Get the original url from the database using the short code
* @access Public
*/
router.get('/:shortCode', getOriginalUrl);

/**
* @description Update the original url in the database using the short code
* @access Public
*/
router.put('/:shortCode', updateOriginalUrl);

/**
* @description Delete the url from the database using the short code
* @access Public
*/
router.delete('/:shortCode', deleteUrl);

/**
* @description Get the stats of the url
* @access Public
*/
router.get('/:shortCode/stats', getUrlStats);

module.exports = router;