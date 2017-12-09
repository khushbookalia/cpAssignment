const promise = require('bluebird');
comment = require("../models/comments");

//enter a cooment
exports.addComment = function(req,res){
    //console.log("Request for new comment..",req.body);
    promise.coroutine(function* () {   //generator function
        let values = new comment({
                title: req.body.title,
                desc: req.body.desc,
                eventId: req.params.eventId
            });
            yield values.save();//asynchronous
            res.json({ success: true, message: 'comment Added to Event', data: values });
    })()
}