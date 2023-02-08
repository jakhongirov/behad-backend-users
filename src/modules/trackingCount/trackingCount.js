const model = require('./model');

module.exports = {
    GET: async (req, res) => {
        try {
            const { position, id, num, key } = req.query

            if (position == 'next' && id && num == 10 && key) {
                const userTrackingCount10ByKeyLimitNext = await model.userTrackingCount10ByKeyLimitNext(key, id)

                return res.json({
                    status: 200,
                    message: "Success",
                    data: userTrackingCount10ByKeyLimitNext
                })

            } else if (position == 'next' && id && num == 30 && key) {
                const userTrackingCount30ByKeyLimitNext = await model.userTrackingCount30ByKeyLimitNext(key, id)

                return res.json({
                    status: 200,
                    message: "Success",
                    data: userTrackingCount30ByKeyLimitNext
                })
            } else if (position == 'next' && id && num == 50 && key) {
                const userTrackingCount50ByKeyLimitNext = await model.userTrackingCount50ByKeyLimitNext(key, id)

                return res.json({
                    status: 200,
                    message: "Success",
                    data: userTrackingCount50ByKeyLimitNext
                })
            } else if (position == 'next' && id && num == 60 && key) {
                const userTrackingCount60ByKeyLimitNext = await model.userTrackingCount60ByKeyLimitNext(key, id)

                return res.json({
                    status: 200,
                    message: "Success",
                    data: userTrackingCount60ByKeyLimitNext
                })

            } else if (position == 'prev' && id && num == 10 && key) {
                const userTrackingCount10ByKeyLimitPrev = await model.userTrackingCount10ByKeyLimitPrev(key, id)

                return res.json({
                    status: 200,
                    message: "Success",
                    data: userTrackingCount10ByKeyLimitPrev
                })

            } else if (position == 'prev' && id && num == 30 && key) {
                const userTrackingCount30ByKeyLimitPrev = await model.userTrackingCount30ByKeyLimitPrev(key, id)

                return res.json({
                    status: 200,
                    message: "Success",
                    data: userTrackingCount30ByKeyLimitPrev
                })
            } else if (position == 'prev' && id && num == 50 && key) {
                const userTrackingCount50ByKeyLimitPrev = await model.userTrackingCount50ByKeyLimitPrev(key, id)

                return res.json({
                    status: 200,
                    message: "Success",
                    data: userTrackingCount50ByKeyLimitPrev
                })
            } else if (position == 'prev' && id && num == 60 && key) {
                const userTrackingCount60ByKeyLimitPrev = await model.userTrackingCount60ByKeyLimitPrev(key, id)

                return res.json({
                    status: 200,
                    message: "Success",
                    data: userTrackingCount60ByKeyLimitPrev
                })

            } else if (position == 'next' && id && num == 10) {
                const userTrackingCount10LimitNext = await model.userTrackingCount10LimitNext(id)

                return res.json({
                    status: 200,
                    message: "Success",
                    data: userTrackingCount10LimitNext
                })

            } else if (position == 'next' && id && num == 30) {
                const userTrackingCount30LimitNext = await model.userTrackingCount30LimitNext(id)

                return res.json({
                    status: 200,
                    message: "Success",
                    data: userTrackingCount30LimitNext
                })
            } else if (position == 'next' && id && num == 50) {
                const userTrackingCount50LimitNext = await model.userTrackingCount50LimitNext(id)

                return res.json({
                    status: 200,
                    message: "Success",
                    data: userTrackingCount50LimitNext
                })
            } else if (position == 'next' && id && num == 60) {
                const userTrackingCount60LimitNext = await model.userTrackingCount60LimitNext(id)

                return res.json({
                    status: 200,
                    message: "Success",
                    data: userTrackingCount60LimitNext
                })
            } else if (position == 'prev' && id && num == 10) {
                const userTrackingCount10LimitPrev = await model.userTrackingCount10LimitPrev(id)

                return res.json({
                    status: 200,
                    message: "Success",
                    data: userTrackingCount10LimitPrev
                })
            } else if (position == 'prev' && id && num == 30) {
                const userTrackingCount30LimitPrev = await model.userTrackingCount30LimitPrev(id)

                return res.json({
                    status: 200,
                    message: "Success",
                    data: userTrackingCount30LimitPrev
                })
            } else if (position == 'prev' && id && num == 50) {
                const userTrackingCount50LimitPrev = await model.userTrackingCount50LimitPrev(id)

                return res.json({
                    status: 200,
                    message: "Success",
                    data: userTrackingCount50LimitPrev
                })
            } else if (position == 'prev' && id && num == 60) {
                const userTrackingCount60LimitPrev = await model.userTrackingCount60LimitPrev(id)

                return res.json({
                    status: 200,
                    message: "Success",
                    data: userTrackingCount60LimitPrev
                })
            } else if (num == 10 && key) {
                const userTrackingCount10ByKey = await model.userTrackingCount10ByKey(key)

                return res.json({
                    status: 200,
                    message: "Success",
                    data: userTrackingCount10ByKey
                })

            } else if (num == 30 && key) {
                const userTrackingCount30ByKey = await model.userTrackingCount30ByKey(key)

                return res.json({
                    status: 200,
                    message: "Success",
                    data: userTrackingCount30ByKey
                })

            } else if (num == 50 && key) {
                const userTrackingCount50ByKey = await model.userTrackingCount50ByKey(key)

                return res.json({
                    status: 200,
                    message: "Success",
                    data: userTrackingCount50ByKey
                })

            } else if (num == 60 && key) {
                const userTrackingCount60ByKey = await model.userTrackingCount60ByKey(key)

                return res.json({
                    status: 200,
                    message: "Success",
                    data: userTrackingCount60ByKey
                })

            } else if (num == 10) {
                const userTrackingCount10 = await model.userTrackingCount10()

                return res.json({
                    status: 200,
                    message: "Success",
                    data: userTrackingCount10
                })

            } else if (num == 30) {
                const userTrackingCount30 = await model.userTrackingCount30()

                return res.json({
                    status: 200,
                    message: "Success",
                    data: userTrackingCount30
                })
            } else if (num == 50) {
                const userTrackingCount50 = await model.userTrackingCount50()

                return res.json({
                    status: 200,
                    message: "Success",
                    data: userTrackingCount50
                })

            } else if (num == 60) {
                const userTrackingCount60 = await model.userTrackingCount60()

                return res.json({
                    status: 200,
                    message: "Success",
                    data: userTrackingCount60
                })

            }

        } catch (error) {
            console.log(error);
            res.json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    }
};