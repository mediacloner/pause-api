require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const uuid = require('uuid/v4')
const { success, fail } = require('./api-utils')


const mongo = {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    database: process.env.MONGO_DB,
}

with(mongo) {
    mongoose.connect(`mongodb://${host}:${port}/${database}`)
}


const router = express.Router()


const Post = mongoose.model('Post', {

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


const User = mongoose.model('User', {
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

router.get('/list', (req, res) => {
    User.find({}, {   title: 1,
    mainDescription: 1,    
    secDescription: 1,
    idUser:0,    
    kudos:0,
    counterVisits:0,
    idPostTemplate:0,    
    namePostTemplate:0,
    tag:0,
    createAt:0})
        .then(list => res.json(success(list)))
        .catch(err => res.json(fail(err.message)))
})


router.get('/list/:id', (req, res) => {
    const { params: { id } } = req

    Promise.resolve()
        .then(() => {
            validate({ id })


            return list.findOne({ id }, {   title: 1,
                                            mainDescription: 1,    
                                            secDescription: 1,
                                            idUser:0,    
                                            kudos:0,
                                            counterVisits:0,
                                            idPostTemplate:0,    
                                            namePostTemplate:0,
                                            tag:0,
                                            createAt:0})
                                            })
        .then(list => {
            if (!list) throw Error('list does not exist')

            res.json(success(list))
        })
        .catch(err => {
            res.json(fail(err.message))
        })
})

const app = express()

app.use('/api', router)

const port = process.env.PORT

app.listen(port, () => console.log(`users api running on port ${port}`))