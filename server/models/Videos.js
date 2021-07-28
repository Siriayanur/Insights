const mongoose = require('mongoose');
const videoSchema = mongoose.Schema({
    videoId: {
        type: String,
    },
    videoPublishTime: {
        type:String
    },
    videoTitle: {
        type:String,
    },
    videoDesc: {
        type: String,
        
    },
    videoThumbnailUrl: {
        type:String
    },
    videoTags: {
        type:Array
    },
    videoDuration: {
        type:String,        
    },
    videoViews: {
        type:Number,
    },
    videoLikes: {
        type:Number,
    }

})
const Video = mongoose.model('Video', videoSchema);
module.exports = { videoSchema, Video };