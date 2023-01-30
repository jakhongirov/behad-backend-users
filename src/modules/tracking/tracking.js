const model = require('./model');

module.exports = {
    GET: async (req, res) => {
        try {
            const { id, position, userId, key } = req.query

            if (position == 'next' && id && userId && key) {
                const userTrackingLimitNext = await model.userTrackingLimitNext(userId, id, key)
                return res.json({
                    status: 200,
                    message: "Success",
                    data: userTrackingLimitNext
                });
            } else if (position == 'prev' && id && userId && key) {
                const userTrackingLimitPrev = await model.userTrackingLimitPrev(userId, id, key)
                return res.json({
                    status: 200,
                    message: "Success",
                    data: userTrackingLimitPrev
                });
            } else {
                const trackingUsers = await model.getTrackingUsers(userId, key)

                if (trackingUsers) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: trackingUsers
                    });
                }
            }

        } catch (error) {
            console.log(error);
            res.json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    }
}