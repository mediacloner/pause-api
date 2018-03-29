const {Schema, Schema:{ObjectId}} = require('mongoose')
const User = require ('./User')
module.exports = new Schema({
    title: String,
    shortDescription: String,
    fullDescription: String,
    owner: { type: ObjectId, ref: 'User' },
    kudos: {type: Number, default:0},
    counterVisits: {type: Number, default:0},
    idPostTemplate: String,
    tag: String,
    createAt:{type: Date, default: Date.now},
    URLpath: String , 
    time: String,
    comments: [{

        userId: { type: ObjectId, ref: 'User' },
        comment: String,
    }]

})
