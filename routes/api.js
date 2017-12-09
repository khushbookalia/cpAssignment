const express=require("express");
const router=express.Router();//for subpaths

const authenticate=require('./allRoutes/authenticate');
const eventRoute = require('./allRoutes/events');
const eventUsers = require('./allRoutes/users')

router.use('/eventUser',eventUsers);
router.use('/authenticate', authenticate);
router.use('/events', eventRoute);

module.exports=router;