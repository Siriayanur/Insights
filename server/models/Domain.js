const mongoose = require('mongoose');
const {videoSchema} = require('../models/Videos.js');
const {channelSchema } = require('../models/Channel');
const domainSchema = mongoose.Schema({
    kind: {
        type: String,
    },
    regionCode: {
        type:String,
    },
    channelData: {
        type:channelSchema,
    },
    videoData: {
        type:videoSchema,
    }

});

const Domain = mongoose.model('Domain', domainSchema);
module.exports = Domain;

















