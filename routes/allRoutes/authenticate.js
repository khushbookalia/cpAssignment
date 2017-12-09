const express = require('express');
const authenticate = require("../../controllers/authenticate");
const passport = require('passport');
const router = express.Router();

router.post('/', authenticate.postDetails);

//exporting the router
module.exports = router;