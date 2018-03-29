const mongoose = require('mongoose')

const {Post, User} = require('./schemas')

module.exports = {
    User: mongoose.model('User', User),
    Post: mongoose.model('Post', Post)
}