const model = require('./model')
const JWT = require('../../lib/jwt')

module.exports = {
    LOGIN: async (req, res) => {
        try {
            const { name, password } = req.body
            const foundAdmin = await model.getAdmin(name, password)
            const token = await new JWT({ "role": "admin" }).sign()

            if (foundAdmin) {
                res.json({
                    status: 200,
                    message: "Success",
                    token, token
                })
            } else {
                res.json({
                    status: 401,
                    message: "Unauthorized"
                })
            }

        } catch (err) {
            console.log(err)
            res.json({
                status: 500,
                message: "Internal Server Error",
            })
        }
    },
}