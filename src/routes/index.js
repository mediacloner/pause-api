const { Router } = require('express')
const bodyParser = require('body-parser')
const {login, listFollowingByUser, addKudo, retrieveUser, follow, listPosts, listPostsByUser, listPostsByGroup, createComment, createPost, createUser, deleteComment,search, retrievePost } = require('./handlers')
const jwtValidator = require('../routes/handlers/jwtValidator')



const router = Router()

const jsonBodyParser = bodyParser.json()
router.post('/login', jsonBodyParser, login) 

//TODO: 

//router.delete('/user/:id', [jwtValidator, jsonBodyParser], _delete)
//router.get('/user/:id', jwtValidator, retrieve)


router.get('/list', listPosts)

router.get('/list/:id', listPostsByUser)

router.get('/following/:id', listFollowingByUser)

router.get('/listgroup/:id', listPostsByGroup)

router.get('/search/:word',search)

router.get('/post/:id', retrievePost)

router.get('/user/:id', retrieveUser)

router.put('/kudos/:id', addKudo)

router.post('/comment/:id', jsonBodyParser, createComment)

router.post('/post', jsonBodyParser, createPost)

router.post('/user', jsonBodyParser, createUser)

router.post('/follow/:id', jsonBodyParser, follow)

router.delete('/comment/:id', jsonBodyParser, deleteComment)


module.exports = router