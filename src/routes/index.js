const { Router } = require('express')
const bodyParser = require('body-parser')
const { listPosts, listPostsByUser, listPostsByGroup, createComment, createPost, createUser, deleteComment,listPostsBySearch, retrievePost } = require('./handlers')

const router = Router()

const jsonBodyParser = bodyParser.json()

router.get('/list', listPosts)

router.get('/list/:id', listPostsByUser)

router.get('/listgroup/',jsonBodyParser, listPostsByGroup)

router.get('/search/word',listPostsBySearch)

router.get('/post/:id', retrievePost)

router.post('/comment', jsonBodyParser, createComment)

router.post('/post', jsonBodyParser, createPost)

router.post('/user', jsonBodyParser, createUser)

router.delete('/comment/:id', deleteComment)






/* router.post('/user', jsonBodyParser, create)

router.put('/user/:id', jsonBodyParser, update)

router.delete('/user/:id', jsonBodyParser, _delete)

router.get('/user/:id', retrieve) */

module.exports = router