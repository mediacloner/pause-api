const { success, fail } = require('./api-utils')
const logic = require('../../logic')

module.exports = (req, res) => {
    const {
      body: {
         comment
      }
    } = req;
  
    logic
      .createComment(
         comment
      )
      .then(objResult => {
        res.json(success({ objResult }));
      })
      .catch(err => {
        res.json(fail(err.message));
      });
  };
  