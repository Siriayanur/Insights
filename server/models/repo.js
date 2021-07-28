const mongoose = require('mongoose');
const repoSchema = mongoose.Schema({
        repoName: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        
        stars: {
            type: Number,
        },
        forks: {
            type: Number,
        },
        avatarUrl: {
            type: String,
            default :''
        },
        repoUrl: {
            type: String,
        },
        languages: {
            type : Array,
        },
        
        majorLanguage: {
            type: String
        },
        //user info 
        username: {
            type: String,
            required: true
        },
        userProfileUrl: {
            type: String,
        },
        likes: {
            type:Number
        }
    }
)

const Repo = mongoose.model('Repo', repoSchema);
module.exports = Repo;