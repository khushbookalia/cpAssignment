const mongoose = require('mongoose');
const moment = require('moment').utc;
const mongoose_delete = require('mongoose-delete');

const eventSchema = mongoose.Schema({
    title:{
        type: String
    },
    dateOfEvent:{
        type: Date
    },
    createdOn: {
        type: Date,
        default: moment().format()
    },
    organisers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'eventUsers',
        default: null
    }],
    location:{
        type: String
    },
    description:{
        type: String
    },
    ticketPrice:{
        type: String,
        default: null
    }
})

eventSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
module.exports = mongoose.model('events',eventSchema);
