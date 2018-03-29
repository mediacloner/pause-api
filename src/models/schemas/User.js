const {Schema, Schema:{ObjectId}} = require('mongoose')


module.exports = new Schema({
    name: String,
    surname: String,
    email: String,
    username: String,
    password: String,
    city: String,
    country: String,
    kudos: Number,
    createAt: {type: Date, default: Date.now},
    about: String,
    followers: Array,
    following: [{

        userId: { type: ObjectId, ref: 'User' },
    }],

    timelineTitle: String
})