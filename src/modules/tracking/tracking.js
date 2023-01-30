const model = require('./model');

module.exports = {
    GET: async (req, res) => {
        try {
            const { id, position, userId } = req.query

            if (position == 'next' && id && userId) {
                const userTrackingLimitNext = await model.userTrackingLimitNext(userId, id)
                return res.json({
                    status: 200,
                    message: "Success",
                    data: userTrackingLimitNext
                });
            } else if (position == 'prev' && id && userId) {
                const userTrackingLimitPrev = await model.userTrackingLimitPrev(userId, id)
                return res.json({
                    status: 200,
                    message: "Success",
                    data: userTrackingLimitPrev
                });
            } else {
                const trackingUsers = await model.getTrackingUsers(userId)

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