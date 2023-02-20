const model = require('./model');

module.exports = {
    GET: async (req, res) => {
        try {
            const { userId, key, offset } = req.query

            const trackingUsers = await model.getTrackingUsers(userId, key, offset)

            if (trackingUsers) {
                return res.json({
                    status: 200,
                    message: "Success",
                    data: trackingUsers
                });
            }

        } catch (error) {
            console.log(error);
            res.json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    },

    GET_USER_TRACKING_FILTER: async (req, res) => {
        try {
            const { offset, key, day } = req.query

            if (offset && key && day) {
                const userTrackingFilterByKey = await model.usersTrackingFilterBykey(offset, day, key)

                if (userTrackingFilterByKey) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: userTrackingFilterByKey
                    })
                }
            } else if (offset && day) {
                const userTrackingFilter = await model.usersTrackingFilter(offset, day)

                if (userTrackingFilter) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: userTrackingFilter
                    })
                }
            } else {
                return res.json({
                    status: 400,
                    message: "Bad request"
                })
            }

        } catch (error) {
            console.log(error);
            res.json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    },

    GET_USERS_TRACKING_COUNT: async (_, res) => {
        try {
            const usersTrackingCount = await model.usersTrackingCount()

            return res.json({
                status: 200,
                message: "Success",
                data: usersTrackingCount
            })

        } catch (error) {
            console.log(error);
            res.json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    }
}