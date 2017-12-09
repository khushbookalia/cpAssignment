const express = require('express');
const router = express.Router();
const passport = require('passport');

const eventUsers = require("../../controllers/users");

router.post('/createNewUser' , eventUsers.postEventUser);//signUp

module.exports=router;