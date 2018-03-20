const listPosts = require('./listPosts')
const listPostsByUser = require ('./listPostsByUser.js')
const listPostsByGroup = require ('./listPostsByGroup.js')
const listPostsBySearch = require ('./listPostsBySearch.js')
const createComment = require ('./createComment.js')
const createPost = require ('./createPost.js')
const createUser = require ('./createUser.js')
const deleteComment = require ('./deleteComment.js')
const retrievePost = require ('./retrievePost.js')
const retrieveUser = require ('./retrieveUser.js')
const follow = require ('./follow.js')


module.exports = {
    listPosts,
    listPostsByUser,
    listPostsByGroup,
    listPostsBySearch,
    createComment,
    createPost,
    createUser,
    deleteComment,
    retrievePost,
    retrieveUser,
    follow


}