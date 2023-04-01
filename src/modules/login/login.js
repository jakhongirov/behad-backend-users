const model = require('./model');
const JWT = require('../../lib/jwt')
const bcryptjs = require('bcryptjs')

module.exports = {
    LOGIN: async (req, res) => {
        try {
            const { temptoken, app_key, notification_token } = req.params;
            const { phone, password } = req.body
            const foundUser = await model.getUser(phone)

            if (foundUser) {
                const validPass = await bcryptjs.compare(password, foundUser.user_password)

                if (validPass) {
                    const token = await new JWT({ id: foundUser.user_id, name: foundUser.user_name }).sign()
                    await model.deleteUserDeviceId(temptoken)
                    await model.addTokenUser(foundUser.user_id, temptoken)
                    await model.addTrackingUser(foundUser.user_id, app_key)
                    const app_user = await model.getAppUser(foundUser.user_id, app_key)
                    await model.updateTrackLoginSuccess()

                    if (!app_user) {
                        await model.addAppUser(notification_token ? notification_token : "", foundUser.user_id, app_key)
                    }

                    return res.json({
                        status: 200,
                        message: "Success",
                        token, token
                    })

                } else {
                    return res.json({
                        status: 401,
                        message: "Unauthorized"
                    })
                }

            } else {
                return res.json({
                    status: 404,
                    message: "Not found"
                })
            }

        } catch (err) {
            console.log(err)
            res.json({
                status: 500,
                message: "Internal Server Error",
            })
        }
    },

    REGISTER: async (req, res) => {
        try {
            const { temptoken, app_key, notification_token } = req.params
            const { name, surname, age, who, birthday, phone, password, country, capital } = req.body

            const checkUser = await model.checkUser(phone)

            let newUser;
            let code = '';

            const makeCode = (length) => {
                let characters = '0123456789asdfghjklqwertyuiopzxcvbnm';
                let charactersLength = characters.length;
                for (let i = 0; i < length; i++) {
                    code += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
            }

            if (!checkUser) {
                const pass_hash = await bcryptjs.hash(password, 10)

                if (temptoken == '00000000-0000-0000-0000-000000000000') {
                    await makeCode(16)
                    const addUser = await model.registerUser(name, surname, age, who, birthday, phone, pass_hash, country, capital, code)
                    newUser = addUser
                } else {
                    const addUser = await model.registerUser(name, surname, age, who, birthday, phone, pass_hash, country, capital, temptoken)
                    newUser = addUser
                }

                await model.addAppUser(notification_token ? notification_token : "", newUser.user_id, app_key)

                const token = await new JWT({ id: newUser.user_id, name: newUser.user_name }).sign()
                await model.addTrackingUser(newUser.user_id, app_key)
                await model.updateTrackRegisterSuccess()

                return res.json({
                    status: 200,
                    message: "Success",
                    data: token
                })

            } else {
                return res.json({
                    status: 302,
                    message: "Found"
                })
            }

        } catch (err) {
            console.log(err)
            res.json({
                status: 500,
                message: "Internal Server Error",
            })
        }
    }
}