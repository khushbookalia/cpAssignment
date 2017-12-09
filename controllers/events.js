const promise = require('bluebird');
events = require("../models/events");

//enter event details
exports.addEvent = function(req,res){
    //console.log("Request for new event..",req.body);
    promise.coroutine(function* () {   //generator function
        let values = new events({
                title: req.body.eventName,
                dateOfEvent: req.body.date,
                organisers: req.body.organisers,
                location: req.body.location,
                description: req.body.description,
                ticketPrice: req.body.ticketPrice
            });
            yield values.save();//asynchronous
            res.json({ success: true, message: 'NEw Event saved', data: values });
    })()
}

exports.getAllEvents = function (req, res) {
    events.find((err, values) => {
        if(err){
            res.json({ success: false, message: 'Error in fetching all events',data: err });
        }
        else
            res.json({ success: true, message: 'Received all Events',data: values });            
    })
}

exports.getEvent = function (req, res){
    events.find({
        _id: req.params.eventId
    }).exec(function (err, data) {
        //console.log(data,"dat>>>>>>>>");
        if (err) {
            res.send({ success: false, message: 'Error in fetching this event', data: err});
        }
        res.json({ success: true, message: 'Received event Details', data: data });
    })
}

exports.getEventByFilter = function (req, res){
    events.findOne({$or:[{title: req.body.title}, {organisers: req.body.organisers}]}).exec(function (err, data) {
        //console.log(data,"dat>>>>>>>>");
        if (err) {
            res.send({ success: false, message: 'Error in fetching this event', data: err});
        }
        res.json({ success: true, message: 'Received event Details', data: data });
    })
}

exports.deleteEvent = function (req, res){
    events.delete({_id: req.params.eventId });
        res.json('Event Deletion');
}