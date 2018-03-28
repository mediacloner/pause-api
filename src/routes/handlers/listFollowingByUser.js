const { success, fail } = require('./api-utils')
const logic = require('../../logic')


module.exports = (req, res) => {
    const {idUser} = req.tokencito

    logic.listFollowingById(idUser)
        .then(followers => {
            res.json(success(followers))
        })
        .catch(err => {
            res.json(fail(err.message))
        })
}


