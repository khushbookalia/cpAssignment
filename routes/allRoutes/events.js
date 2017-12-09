const express = require('express');
const router = express.Router();

const event = require("../../controllers/events");

router.get('/getAllEvents', event.getAllEvents);//get All Event

module.exports=router;