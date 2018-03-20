const { Router } = require('express')
const bodyParser = require('body-parser')
const { listPosts, listPostsByUser, listPostsByGroup, createComment, createPost, createUser, deleteComment,listPostsBySearch, retrievePost } = require('./handlers')

const router = Router()

const jsonBodyParser = bodyParser.json()

router.get('/list', listPosts)

router.get('/list/:id', listPostsByUser)

router.get('/listgroup/:id', listPostsByGroup)

router.get('/search/word',listPostsBySearch)

router.get('/post/:id', retrievePost)

router.post('/comment/:id', jsonBodyParser, createComment)

router.post('/post', jsonBodyParser, createPost)

router.post('/user', jsonBodyParser, createUser)

router.delete('/comment/:id', jsonBodyParser, deleteComment)


module.exports = router