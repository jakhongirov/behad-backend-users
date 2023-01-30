const model = require('./model');

module.exports = {
    GET_APP: async (req, res) => {
        try {
            const { name, id, app_key, key, position } = req.query

            if (name || id || app_key || key || position) {

                if (position === 'next' && id) {
                    const appLimitById = await model.appLimitByIdNext(id)

                    return res.json({
                        status: 200,
                        message: "Succcess",
                        data: appLimitById
                    })

                } else if (position === 'prev' && id) {
                    const appLimitById = await model.appLimitByIdPrev(id)

                    return res.json({
                        status: 200,
                        message: "Succcess",
                        data: appLimitById
                    })

                } else if (id) {
                    const AppbyId = await model.getAppbyId(Number(id))
                    return res.json({
                        status: 200,
                        message: "Succcess",
                        data: AppbyId
                    })
                } else if (name) {
                    const AppbyName = await model.getAppbyName(`%${name}%`)
                    return res.json({
                        status: 200,
                        message: "Succcess",
                        data: AppbyName
                    })
                } else if (app_key) {
                    const AppbyKey = await model.getAppbyKey(`%${app_key}%`)
                    return res.json({
                        status: 200,
                        message: "Succcess",
                        data: AppbyKey
                    })
                } else if (key) {
                    const getAppbyKeyApp = await model.getAppbyKeyApp(key)
                    return res.json({
                        status: 200,
                        message: "Succcess",
                        data: getAppbyKeyApp
                    })
                }

            } else {
                const allApps = await model.getAllApps()
                return res.json({
                    status: 200,
                    message: "Succcess",
                    data: allApps
                })
            }
        } catch (error) {
            console.log(error)
            res.json({
                status: 500,
                message: "Internal Server Error",
            })
        }

    },

    ADD_APP: async (req, res) => {
        try {
            const { name, current_vs, min_vs, key, price, payment, app_post } = req.body

            const AddApp = await model.addApp(name, current_vs, min_vs, key, price, payment, app_post)

            res.json({
                status: 200,
                message: "Succcess",
                data: AddApp
            })

        } catch (error) {
            console.log(error)
            res.json({
                status: 500,
                message: "Internal Server Error",
            })
        }
    },

    PUT_APP: async (req, res) => {
        try {
            const { id, name, current_vs, min_vs, key, price, payment, app_post } = req.body

            const upadateApp = await model.putApp(id, name, current_vs, min_vs, key, price, payment, app_post)

            res.json({
                status: 200,
                message: "Updated",
                data: upadateApp
            })

        } catch (error) {
            console.log(error)
            res.json({
                status: 500,
                message: "Internal Server Error",
            })
        }
    },

    DELETE_APP: async (req, res) => {
        try {
            const { id } = req.body

            const deleteApp = await model.deleteApp(id)

            res.json({
                status: 200,
                message: "Deleted",
                data: deleteApp
            })

        } catch (error) {
            console.log(error)
            res.json({
                status: 500,
                message: "Internal Server Error",
            })
        }
    }
}