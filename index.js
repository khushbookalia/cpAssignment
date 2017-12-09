//libraries
"use strict"
const express=require("express");//routing and middleware web framework
const mongoose=require("mongoose");
const bodyParser=require("body-parser");//Parse incoming request bodies
const passport = require('passport');//authentication middleware
const cors = require("cors");
const app = express();
const apiRoute=require("./routes/api");

//Connecting to database
mongoose.Promise = global.Promise;
//to handle warning-> "DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated"
mongoose.connect("mongodb://cpEventMgmt:1234@ds121696.mlab.com:21696/event_management", { useMongoClient: true }, function (err, data) {//(uri, options)
     if (err) {
        console.log("Error connecting database");
    }
    else {
        console.log("Connected to database");
    }
});
app.set( 'port', ( process.env.PORT || 4000 ));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());   
require('./helpers/passport')(passport);

app.use(cors());
app.use("/api",apiRoute);

app.listen(app.get( 'port' ), function(err,data){
    if(err){
        console.log(err);
    }
    else{
        console.log("Server Started at port "+app.get('port'));
    }
})

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, Accept");
    next();
});



/* note: heroku logs --tail, for running status while pushing to server */