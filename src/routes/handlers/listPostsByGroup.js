const { success, fail } = require('./api-utils')
const logic = require('../../logic')

module.exports = (req, res) => {
    const { body: { idUsers } } = req
    logic.listByGroup(idUsers)
        .then(posts => {
            res.json(success(posts))
        })
        .catch(err => {
            res.json(fail(err.message))
        })
}