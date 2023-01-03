const model = require('./model')

module.exports = {
    GET_APP_USERS: async (req, res) => {
        try {
            const { name, id, key } = req.query

            if (name || id || key) {
                if (name) {
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
}
