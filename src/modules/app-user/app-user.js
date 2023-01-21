const model = require('./model')

module.exports = {
    GET_APP_USERS: async (req, res) => {
        try {
            const { name, id, key, userId } = req.query

            if (name || id || key || userId) {

                if (userId && key) {
                    const appUserByUserIdKEy = await model.getAppUserByUserIdKEy(userId, key)

                    return res.json({
                        status: 200,
                        message: "Success",
                        data: appUserByUserIdKEy
                    });

                } else if (name) {
                    const appUserByName = await model.getByName(`%${name}%`)

                    return res.json({
                        status: 200,
                        message: "Success",
                        data: appUserByName
                    });
                } else if (id) {
                    const appUserById = await model.getById(id)

                    return res.json({
                        status: 200,
                        message: "Success",
                        data: appUserById
                    });
                } else if (key) {
                    const appUserByKey = await model.getByKey(`${key}%`)

                    return res.json({
                        status: 200,
                        message: "Success",
                        data: appUserByKey
                    });
                }
            } else {
                const allAppUser = await model.getAllAppUser()
                return res.json({
                    status: 200,
                    message: "Success",
                    data: allAppUser
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

    PUT_PRO_VERSION: async (req, res) => {
        try {
            const { id, pro_v } = req.body
            const changeProVersion = await model.changeProVersion(id, pro_v)

            if (changeProVersion) {
                res.json({
                    status: 200,
                    message: "Success"
                })
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
    }
}
