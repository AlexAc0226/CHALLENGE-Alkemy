const { Router } = require('express');

const movie = require('./movie.js');
const authentication = require('./authentication.js');

const router = Router();

router.use("/user", authentication)
router.use("/", movie)

module.exports = router;
