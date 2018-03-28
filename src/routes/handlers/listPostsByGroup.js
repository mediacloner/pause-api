const { success, fail } = require('./api-utils')
const logic = require('../../logic')

module.exports = (req, res) => {
    const {idUser} = req.tokencito

    logic.listByGroup(idUser)
        .then(posts => {
            res.json(success(posts))
        })
        .catch(err => {
            res.json(fail(err.message))
        })
}



