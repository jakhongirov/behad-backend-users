const model = require('./model');

module.exports = {
    GET: async (_, res) => {
        try {
            const trackingUsers = await model.getTrackingUsers()

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
    }
}