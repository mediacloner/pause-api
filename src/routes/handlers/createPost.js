const { success, fail } = require("./api-utils");
const logic = require("../../logic");

module.exports = (req, res) => {
  const {
    body: {
        title,
        shortDescription,
        fullDescription,
        owner,
        idPostTemplate,
        tag,
        URLpath, 
        time
    }
  } = req;

  const {idUser} = req.tokencito

  logic
    .createPost(
        title,
        shortDescription,
        fullDescription,
        idUser,
        idPostTemplate,
        tag,
        URLpath, 
        time
    )
    .then(objResult => {
      res.json(success({ objResult }));
    })
    .catch(err => {
      res.json(fail(err.message));
    });
};
