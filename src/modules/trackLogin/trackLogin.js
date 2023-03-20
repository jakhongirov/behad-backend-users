const model = require('./model')
const cron = require('node-cron')

module.exports = {
    PUT: async (req, res) => {
        try {
            const { type, url } = req.body

            if (type === 'entered') {
                const updateTrackLoginEnter = await model.updateTrackEnter()
                if (updateTrackLoginEnter) {
                    return res.json({
                        status: 200,
                        message: "Success"
                    })
                } else {
                    return res.json({
                        status: 400,
                        message: 'Bad request'
                    })
                }
            } else if (type === 'phone' && url === 'login') {
                const updateTrackLoginPhone = await model.updateTrackLoginPhone()
                if (updateTrackLoginPhone) {
                    return res.json({
                        status: 200,
                        message: "Success"
                    })
                } else {
                    return res.json({
                        status: 400,
                        message: 'Bad request'
                    })
                }
            } else if (type === 'pass' && url === 'login') {
                const updateTrackLoginPass = await model.updateTrackLoginPass()
                if (updateTrackLoginPass) {
                    return res.json({
                        status: 200,
                        message: "Success"
                    })
                } else {
                    return res.json({
                        status: 400,
                        message: 'Bad request'
                    })
                }
            } else if (type === 'fail' && url === 'login') {
                const updateTrackLoginFail = await model.updateTrackLoginFail()
                if (updateTrackLoginFail) {
                    return res.json({
                        status: 200,
                        message: "Success"
                    })
                } else {
                    return res.json({
                        status: 400,
                        message: 'Bad request'
                    })
                }
            } else if (type === 'phone' && url === 'register') {
                const updateTrackRegisterPhone = await model.updateTrackRegisterPhone()
                if (updateTrackRegisterPhone) {
                    return res.json({
                        status: 200,
                        message: "Success"
                    })
                } else {
                    return res.json({
                        status: 400,
                        message: 'Bad request'
                    })
                }
            } else if (type === 'pass' && url === 'register') {
                const updateTrackRegisterPass = await model.updateTrackRegisterPass()
                if (updateTrackRegisterPass) {
                    return res.json({
                        status: 200,
                        message: "Success"
                    })
                } else {
                    return res.json({
                        status: 400,
                        message: 'Bad request'
                    })
                }
            } else if (type === 'fail' && url === 'register') {
                const updateTrackRegisterFail = await model.updateTrackRegisterFail()
                if (updateTrackRegisterFail) {
                    return res.json({
                        status: 200,
                        message: "Success"
                    })
                } else {
                    return res.json({
                        status: 400,
                        message: 'Bad request'
                    })
                }
            }

        } catch (error) {
            console.log(error)
            res.json({
                status: 500,
                message: "Internal Server Error",
            })
        }
    },

    USE_CRON: async (_, res) => {
        try {

            cron.schedule('0 0 * * *', async () => {
                const createTrackLogin = await model.createTrackLogin()

                if (createTrackLogin) {
                    console.log(createTrackLogin);
                } else {
                    console.log("ERROR");
                }
            })

            return res.json({
                status: 200,
                message: 'START'
            })

        } catch (error) {
            console.log(error)
            res.json({
                status: 500,
                message: "Internal Server Error",
            })
        }
    },
}