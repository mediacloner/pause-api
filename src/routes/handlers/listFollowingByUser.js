const { success, fail } = require('./api-utils')
const logic = require('../../logic')


module.exports = (req, res) => {
    const { params: { id } } = req

    logic.listFollowingById(id)
        .then(followers => {
            res.json(success(followers))
        })
        .catch(err => {
            res.json(fail(err.message))
        })
}