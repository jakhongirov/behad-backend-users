const JWT = require('../lib/jwt')
const model = require('../modules/apps/model')

module.exports = {
    AUTH: async (req, res, next) => {
        try {
            const { token } = req.headers;

            if (token) {
                const userStatus = new JWT(token).verify()

                if (!userStatus) {
                    const app = await model.getAppbyKeyApp(token)

                    if (app) {
                        next()
                    } else {
                        return res.json({
                            status: 401,
                            message: 'Unauthorized'
                        })
                    }
                }
                else if (userStatus.role == 'admin') {
                    next()
                }
            } else {
                return res.json({
                    status: 401,
                    message: 'Unauthorized'
                })
            }

        } catch (err) {
            res.json({
                status: 401,
                message: 'Unauthorized'
            })
        }
    }
}