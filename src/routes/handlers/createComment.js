const { success, fail } = require('./api-utils')
const logic = require('../../logic')

module.exports = (req, res) => {
    const {
      body: {
         id ,comment
      }
    } = req;

    const {idUser} = req.tokencito
  
    logic
      .createComment(
         comment, idUser, id
      )
      .then(objResult => {
        console.log(objResult)
        res.json(success({ objResult }));
      })
      .catch(err => {
        res.json(fail(err.message));
      });
  };
  