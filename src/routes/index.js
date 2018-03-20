const { Router } = require('express')
const bodyParser = require('body-parser')
const { retrieveUser, follow, listPosts, listPostsByUser, listPostsByGroup, createComment, createPost, createUser, deleteComment,search, retrievePost } = require('./handlers')

const router = Router()

const jsonBodyParser = bodyParser.json()

router.get('/list', listPosts)

router.get('/list/:id', listPostsByUser)

router.get('/listgroup/:id', listPostsByGroup)

router.get('/search/:word',search)

router.get('/post/:id', retrievePost)

router.get('/user/:id', retrieveUser)

router.post('/comment/:id', jsonBodyParser, createComment)

router.post('/post', jsonBodyParser, createPost)

router.post('/user', jsonBodyParser, createUser)

router.post('/follow/:id', jsonBodyParser, follow)

router.delete('/comment/:id', jsonBodyParser, deleteComment)


module.exports = router