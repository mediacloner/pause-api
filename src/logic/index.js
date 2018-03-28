const { User, Post } = require("../models/index");
const validate = require("./validate");
const uuid = require("uuid/v4");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
  register(name, surname, email, username, password) {
    return Promise.resolve()
      .then(() => {
        validate({ name, surname, email, username, password });

        return User.findOne({ username });
      })
      .then(user => {
        if (user) throw Error("username already exists");

        const id = uuid();

        return User.create({
          id,
          name,
          surname,
          email,
          username,
          password
        }).then(() => id);
      });
  },

  list() {
    return Post.find({}).sort({createAt: 'desc'}).then(posts => {
      return User.populate(posts, { path: "owner", select: "username" });
    });
  },


  listFollowingById( _id ) {
    
    return (
     
          User.findOne({_id }, {username:1})
            .populate('userId')
            .populate('following.userId', {username:1, timelineTitle:1, city:1 } )
    )
  },


  retrievePost(id) { 

    return Post.find({_id:id}).then(post => {

      return User.populate(post, { path: "owner", select: ["username", "timelineTitle", "about", "following"] });
    }).then(comment => {return User.populate(comment, { path: "comments.userId", select: ["username"] })});
  },


  search(searchVal){

    return Promise.resolve()
    .then(()=>{
        var reg  = new RegExp(searchVal, "i")

        return Post.find({$or: [{fullDescription: reg},{title: reg}]})

    })
    .then((result) => {
      return result
    })
  },

  retrieveUser(id) {

    return User.find({_id:id})
  },


  createPost(
    title,
    shortDescription,
    fullDescription,
    owner,
    idPostTemplate,
    tag,
    URLpath, 
    time) {
    return Promise.resolve()
      .then(() => {

        const post = new Post({
          title,
          shortDescription,
          fullDescription,
          owner: ObjectId(owner),
          idPostTemplate,
          tag,
          URLpath,
          time
        })
        return post.save()

      })
      .then(resPost => {
        if (!resPost) throw Error("Error");

        return resPost;
      });
  },


  createUser(
    name, surname, email, username, password, city, country, about, timelineTitle) {
    return Promise.resolve()
      .then(() => {
        const user = new User({
          name, surname, email, username, password, city, country, about, timelineTitle

        })

        
        return user.save()

      })
      .then(resUser => {
        if (!resUser) throw Error("Error");

        return resUser;
      });
  },

  createComment(
    comment, userId, _id) {

    return Promise.resolve()
      .then(() => {
        return Post.findOneAndUpdate({ _id },
          {
            "$push": {
              comments: { comment, userId }
            }
          }, {
            new: true //to return updated document
          }
        )
      }
      )
  },


  addKudo( _id) {

    return Promise.resolve()
    .then(() => {
      validate({ _id });

      return Post.findOneAndUpdate({ _id },
          {
            "$inc": { kudos: 1 }
          }, {
            new: true 
          }
        )
      }
      )
  },


  follow( 
    userFollow, _id) {

    return Promise.resolve()
      .then(() => {
          return User.findOne({_id})
            .then(user=>{
              let following = user.following
              const exist = following.some(fol=>{
                return fol.userId==userFollow
              })
              console.log(exist)
              if(exist){
                following = following.filter(fol=>{
                  console.log (fol.userId+'!=' + userFollow)
                  return fol.userId != userFollow
                })
              }else{
                following.push({userId: userFollow})
              }
              user.following = following
              return user.save()// User.update({_id},{following})
            })

        /* return User.findOneAndUpdate({ _id },
          {
            "$push": {
              following: {userId: userFollow} 
            }
          }, {
            new: true //to return updated document
          }
        ) */
      }
      )
  },




deleteComment(_id) {

  return Promise.resolve()
    .then(() => {
      return Post.findOneAndUpdate({'comments._id': _id}, {$pull: {comments: {_id}}},
        function(err, doc) {
          return doc        
        });
    })},

getUserFollowing(idUser) {
  validate(idUser)

  return User.findOne({ _id: idUser }, { following: 1, _id: 0 })
      .then(following => {
          return User.find({ _id: { $in: following.following } })

      })
},


verify(username, password) {
  return Promise.resolve()
      .then(() => {
          validate({ username, password })

          return User.findOne({ username, password })
      })
      .then(user => {
          if (!user) throw Error('username and/or password wrong')

          return user.id
      })
},

  listById(owner) {
    return (
      Post.find({ owner }).sort({createAt: 'desc'})

        .populate({ path: "owner", select: "username" })
        // .then(posts=>{
        //     return Post.find({ owner }).populate({ path: 'owner', select: 'username' })
        // })
        .then(post => {
          if (!post) throw Error("posts does not exist");
          return post;
        })
    );
  },  
  
  


  listByGroup(_id) {
    return Promise.resolve()
      .then(() => {
        validate({ _id });

        return User.findOne({ _id }, { _id: 0, password: 0 });
      })
      .then(user => {
        if (!user) throw Error("user does not exist");
        return user.following.map((obj) => {return obj.userId})
      })
      .then (followingRes => {

        return Post.find({ owner: { $in: followingRes } }).sort({createAt: 'desc'})})
      .then(post => {

        if (!post) throw Error("posts does not exist");

        return post;
      })
  }

};
