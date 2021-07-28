const mongoose = require('mongoose');
const channelSchema = mongoose.Schema({
    channelId: {
        type: String,
        required: true,
    },
    channelTitle: {
        type:String,
    },
    channelDesc: {
        type:String,
    },
    channelAvatarUrl: {
        type:String,
    },
    // channelUploadsUrl: {
    //     type:String,
    // },
    channelViews: {
        type:String
    },
    channelSubscriberCount: {
        type:String,
    },
    channelVideoCount: {
        type:String
    }
})
const Channel = mongoose.model('Channel', channelSchema);
module.exports = {
    channelSchema,
    Channel
};