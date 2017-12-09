const mongoose = require('mongoose');
const moment = require('moment').utc;
const mongoose_delete = require('mongoose-delete');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;
const userSchema = mongoose.Schema({
    email: {
        type: String,
        // required:[true, 'Please enter email id'],
        unique:[true, 'Email already registered']
    },
    password: {
        type: String,
        // required:true,
        // hide: true
    },
    createdOn: {
        type: Date,
        default: moment().format()
    },
    firstName: {
        type: String,
        lowercase: true,
        // required:[true, 'Please enter your name']
    },
    lastName: {
        type: String,
        lowercase: true,
        default: null
        // required:[true, 'Please enter your name']
    },

    mobileNo: {
        type: String
        // maxlength: 10,
        // minlength: 10,
        // unique: true,
        // required:[true, 'Please enter mobile no.']
    },
    authyId: String,
    // status: {
    //     type: Boolean,
    //     default: true
    // },
    userType: {
        type: String,
        enum: ['ORGS', 'PRTC'],//['ORGS - Organiser', 'PRTC - Participant']
    }
});

//serial pre hook, here middleware execute one after another, when each middleware calls next
userSchema.pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {         //cb:callback
    var user = this;
    bcrypt.compare(''+candidatePassword, user.password, function (err, isMatch) {
        //console.log(candidatePassword,user.password);
        if (err) {
            //console.log("error..",err);
            return cb(err);
        }
        cb(null, isMatch);
    });
};

userSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
module.exports = mongoose.model('eventUser',userSchema);

