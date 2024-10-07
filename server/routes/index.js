const express = require("express");
const router = express.Router();

// different model routers
router.use('/item', require('./items'));


module.exports = router;
