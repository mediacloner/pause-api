const { Router } = require('express')
const bodyParser = require('body-parser')
const {login, listPostsSpecificUser, listFollowingByUser, addKudo, retrieveUser, follow, listPosts, listPostsByUser, listPostsByGroup, createComment, createPost, createUser, deleteComment,search, retrievePost } = require('./handlers')
const jwtValidator = require('../routes/handlers/jwtValidator')



const router = Router()

const jsonBodyParser = bodyParser.json()
router.post('/login', jsonBodyParser, login) 


router.get('/list', listPosts)

router.get('/listbyuser',jwtValidator, listPostsByUser)

router.get('/listgroup',jwtValidator, listPostsByGroup)

router.get('/following',jwtValidator, listFollowingByUser)

router.post('/post', [jwtValidator, jsonBodyParser], createPost)

router.get('/listpostuser/:id',listPostsSpecificUser)

router.get('/search/:word',search)

router.get('/post/:id', retrievePost)

router.get('/user/:id', retrieveUser)

router.put('/kudos/:id', addKudo)

router.post('/comment', [jwtValidator, jsonBodyParser], createComment)

router.post('/user', jsonBodyParser, createUser)

router.post('/follow/:id', jsonBodyParser, follow)

router.delete('/comment/:id', jsonBodyParser, deleteComment)


module.exports = router