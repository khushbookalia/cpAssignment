const promise = require('bluebird');
events = require("../models/events");


exports.getAllEvents = function (req, res) {
    events.find((err, values) => {
        if(err){
            res.json({ success: false, message: 'Error in fetching all events',data: err });
        }
        else
            res.json({ success: true, message: 'Received all Events',data: values });            
    })
}

