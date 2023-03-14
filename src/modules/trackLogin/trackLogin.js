const model = require('./model')
const cron = require('node-cron')

module.exports = {
    PUT: async (req, res) => {
        try {
            const { type } = req.body

            if (type === 'entered') {
                const updateTrackLoginEnter = await model.updateTrackLoginEnter()
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
            } else if (type === 'phone') {
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
            } else if (type === 'success') {
                const updateTrackLoginSuccess = await model.updateTrackLoginSuccess()
                if (updateTrackLoginSuccess) {
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
            console.log(err)
            res.json({
                status: 500,
                message: "Internal Server Error",
            })
        }
    },

    USE_CRON: async (req, res) => {
        try {

            cron.schedule('0 1 * * *', async () => {
                const createTrackLogin = await model.createTrackLogin()

                if(createTrackLogin) {
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
            console.log(err)
            res.json({
                status: 500,
                message: "Internal Server Error",
            })
        }
    },
}