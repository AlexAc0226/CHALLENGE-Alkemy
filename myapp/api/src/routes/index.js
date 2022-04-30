const { Router } = require('express');

//const authentication = require('./Authentication.js');
//const listCharacters = require('./movie.js');
const movie = require('./movie.js');

const router = Router();

//router.use("/auth", authentication)
router.use("/", movie)

module.exports = router;
