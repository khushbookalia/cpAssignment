const mongoose = require('mongoose');
const moment = require('moment').utc;
const mongoose_delete = require('mongoose-delete');

const commentSchema = mongoose.Schema({
    title:{
        type: String
    },
    createdOn: {
        type: Date,
        default: moment().format()
    },
    desc:{
        type: String
    },
    eventId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'events',
        default: null
    }
})

commentSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
module.exports = mongoose.model('comments',commentSchema);
