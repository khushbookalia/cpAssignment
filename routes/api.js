const express=require("express");
const router=express.Router();//for subpaths

const authenticate=require('./allroutes/authenticate');
const eventRoute = require('./allRoutes/events');

router.use('/authenticate', authenticate);
router.use('/events', eventRoute);

module.exports=router;