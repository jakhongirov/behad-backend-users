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
            const { url } = req.params
            const { offset, key, day, sort } = req.query

            if (url === 'apps') {
                if (offset && key && day) {
                    const userTrackingFilterByKey = await model.usersTrackingFilterBykey(offset, day, key, sort)

                    if (userTrackingFilterByKey) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: userTrackingFilterByKey
                        })
                    }
                } else if (offset && day) {
                    const userTrackingFilter = await model.usersTrackingFilter(offset, day, sort)

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
            } else if (url === 'users') {
                if (offset && key && day) {
                    const userTrackingFilterUsersByKey = await model.usersTrackingFilterUsersBykey(offset, day, key, sort)

                    if (userTrackingFilterUsersByKey) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: userTrackingFilterUsersByKey
                        })
                    }
                } else if (offset && day) {
                    const userTrackingFilterUsers = await model.usersTrackingFilterUsers(offset, day, sort)

                    if (userTrackingFilterUsers) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: userTrackingFilterUsers
                        })
                    }
                } else {
                    return res.json({
                        status: 400,
                        message: "Bad request"
                    })
                }
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