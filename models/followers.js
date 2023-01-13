const mongoose = require('mongoose')

const followerSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    followedToPage: {
        type: String,
        required:true
    },
    followDate: {
        type: Date,
        required:true,
        default:Date.now
    }
})

module.exports = mongoose.model('Follower', followerSchema)