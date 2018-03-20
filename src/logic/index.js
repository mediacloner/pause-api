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
    // OK
    return Post.find({}).then(posts => {
      return User.populate(posts, { path: "owner", select: "username" });
    });
  },


  retrievePost(id) { // id ok find ko

    return Post.find({_id:id}).then(post => {

      return User.populate(post, { path: "owner", select: "username" });
    });
  },


  createPost(
    title,
    shortDescription,
    fullDescription,
    owner,
    idPostTemplate,
    tag) {
    return Promise.resolve()
      .then(() => {
        const post = new Post({
          title,
          shortDescription,
          fullDescription,
          owner: ObjectId(owner),
          idPostTemplate,
          tag
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

  createComment(  // working 
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



















  listById(owner) {
    return (
      Post.find({ owner })
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

  listByGroup(arrayOfIds) {
    console.log(arrayOfIds)
    return Post.find({ owner: { $in: arrayOfIds } })
      .then(post => {
        console.log(post)
        if (!post) throw Error("posts does not exist");

        return post;
      });
  },

  update(
    id,
    name,
    surname,
    email,
    username,
    password,
    newUsername,
    newPassword
  ) {
    return Promise.resolve()
      .then(() => {
        validate({
          id,
          name,
          surname,
          email,
          username,
          password,
          newUsername,
          newPassword
        });

        return User.findOne({ username: newUsername });
      })
      .then(user => {
        if (user) throw Error("username already exists");

        return User.findOne({ id });
      })
      .then(user => {
        if (!user) throw Error("user does not exists");

        if (user.username !== username || user.password !== password)
          throw Error("username and/or password wrong");

        //return User.updateOne({ id }, { $set: { name, surname, email, username: newUsername, password: newPassword } }) // NOTE $set also works here, but it can be simplified as following statement
        return User.updateOne(
          { id },
          { name, surname, email, username: newUsername, password: newPassword }
        );
      });
  },

  retrieve(id) {
    return Promise.resolve()
      .then(() => {
        validate({ id });

        //return User.findOne({ id }, 'id name surname email username') // WARN! it returns _id too!
        return User.findOne({ id }, { _id: 0, password: 0 });
      })
      .then(user => {
        if (!user) throw Error("user does not exist");

        return user;
      });
  },




  remove(id, username, password) {
    return Promise.resolve()
      .then(() => {
        return User.findOne({ id });
      })
      .then(user => {
        if (!user) throw Error("user does not exist");

        if (user.username !== username || user.password !== password)
          throw Error("username and/or password wrong");

        return User.deleteOne({ id });
      });
  }
};
