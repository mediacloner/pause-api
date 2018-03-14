const mongoose = require('mongoose')

const User = mongoose.model('users', {
    user:String,
    name:String,
    lastName:String,
    email:String,
    password:String,
    city:String,
    country:String,
    kudos:Number,
    createdAt:Date,
    updatedAt:Date,
    about: String,
    followers:Array,
    following:Array,
    titleTimeline:String
    
})

module.exports = User