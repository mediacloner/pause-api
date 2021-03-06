const listPosts = require('./listPosts')
const listPostsByUser = require ('./listPostsByUser.js')
const listPostsByGroup = require ('./listPostsByGroup.js')
const listPostsBySearch = require ('./listPostsBySearch.js')
const listFollowingByUser = require ('./listFollowingByUser.js')
const createComment = require ('./createComment.js')
const createPost = require ('./createPost.js')
const createUser = require ('./createUser.js')
const deleteComment = require ('./deleteComment.js')
const retrievePost = require ('./retrievePost.js')
const retrieveUser = require ('./retrieveUser.js')
const addKudo = require ('./addKudo.js')
const follow = require ('./follow.js')
const search = require ('./search.js')
const login = require('./login')
const listPostsSpecificUser = require('./listPostsSpecificUser')



module.exports = {
    addKudo,
    listPosts,
    listPostsByUser,
    listFollowingByUser,
    listPostsByGroup,
    listPostsBySearch,
    createComment,
    createPost,
    createUser,
    deleteComment,
    retrievePost,
    retrieveUser,
    follow,
    search,
    login,
    listPostsSpecificUser


}