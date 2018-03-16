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
        namePostTemplate,
        tag
    }
  } = req;

  logic
    .createPost(
        title,
        shortDescription,
        fullDescription,
        owner,
        idPostTemplate,
        namePostTemplate,
        tag
    )
    .then(id => {
      res.json(success({ id }));
    })
    .catch(err => {
      res.json(fail(err.message));
    });
};
