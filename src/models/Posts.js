const mongoose = require('mongoose')

const Post = mongoose.model('posts', {

    title: String,
    mainDescription: String,    
    secDescription: String,
    idUser:String,    
    kudos:String,
    counterVisits:Number,
    idPostTemplate:String,    
    namePostTemplate:String,
    tag:String,
    createAt:Date,
    comments: [{
        idUser:String,    
        comment:String,
        deleteUserId: Number    
    }]
    
})
module.exports = Post