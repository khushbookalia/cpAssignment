const express = require('express');
const router = express.Router();
const passport = require('passport');

const event = require("../../controllers/events");

router.get('/getAllEvents', passport.authenticate('jwt', { session: false }), event.getAllEvents);//get All Event

module.exports=router;