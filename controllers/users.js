const promise = require('bluebird');
eventUser = require("../models/users");

//enter user details(signUp)
exports.postEventUser = function(req,res){
    console.log("Request for new User..",req.body);
    promise.coroutine(function* () {   //generator function
        let values = new eventUser({
                email: req.body.email,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                mobileNo: req.body.mobileNo,
                userType: req.body.userType
            });
            yield values.save();//asynchronous
            res.json({ success: true, message: 'NEw User saved', data: values });
    })()
}