const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    title: {
        type:String,
    },
    desc: {
        type:String,
    },
    creator: {
        type:String,
    },
    name: {
        type:String,
    },
    tags: {
        type:Array
    },
    selectedFile: {
        type:String
    },
    likes: {
        type: [String],
        default: []
    },
    comments: {
        type: [String],
        default : [],
    },
    createdAt: {
        type: Date,
        default:new Date()
    },
    refLink: {
        type:String,
    }
});
const PostMessage = mongoose.model('Post', postSchema);
module.exports = PostMessage;