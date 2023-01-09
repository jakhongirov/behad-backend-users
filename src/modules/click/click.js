const model = require('./model')

module.exports = {
    POST: async (req, res) => {
        const body = req.body
        console.log(body);
        res.send("ok")
    },

    POST_2: async (req, res) => {
        const body = req.body
        console.log(body);
        res.send("ok")
    }
}