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
      return User.populate(posts, { path: "idUser", select: "user" });
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
    return Post.find({ posts: { owner: { $in: arrayOfIds } } })
    .then(post => {
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
        validate({ id, username, password });

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
