const express=require("express");
const router=express.Router();//for subpaths

const authenticate=require('./allRoutes/authenticate');
const eventRoute = require('./allRoutes/events');
const eventUsers = require('./allRoutes/users')

router.use('/eventUser',eventUsers);
router.use('/authenticate', authenticate);
router.use('/events', eventRoute);
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});
module.exports=router;