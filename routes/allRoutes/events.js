const express = require('express');
const router = express.Router();
const passport = require('passport');

const event = require("../../controllers/events");
const comment = require("../../controllers/comment");

router.post('/createEvent' , passport.authenticate('jwt', { session: false }), event.addEvent);//add new Event
router.get('/getAllEvents', passport.authenticate('jwt', { session: false }), event.getAllEvents);//get All Event
router.get('/getEventDetails/:eventId' , passport.authenticate('jwt', { session: false }), event.getEvent);//get Specific Event
router.post('/getEventByFilter' , passport.authenticate('jwt', { session: false }), event.getEventByFilter);//filter Event
router.post('/addComment/:eventId' , passport.authenticate('jwt', { session: false }), comment.addComment);//add Comment to event
router.delete('/deleteEvent/:eventId',passport.authenticate('jwt', { session: false }), event.deleteEvent);

module.exports=router;