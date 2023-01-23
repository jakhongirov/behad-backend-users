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
                    const deleteUserDeviceId = await model.deleteUserDeviceId(temptoken)
                    const AddtokenUser = await model.addTokenUser(foundUser.user_id, temptoken)
                    const app_user = await model.getAppUser(foundUser.user_id, app_key)


                    if (!app_user) {
                        const addApp = await model.addAppUser(notification_token ? notification_token : "", foundUser.user_id, app_key)
                    }


                    return res.json({
                        status: 200,
                        message: "Success",
                        token, token
                    })

                } else {
                    res.json({
                        status: 401,
                        message: "Unauthorized"
                    })
                }

            } else {
                res.json({
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
            const { name, surname, age, who, phone, password, country, capital } = req.body

            let location;

            const parseIp = (req) =>
                req.headers['x-forwarded-for']?.split(',').shift()
                || req.socket?.remoteAddress

            const ip = await parseIp(req)

            fetch("https://ipinfo.io/${ip}?token=0166032ebc35f8")
                .then(res => res.json())
                .then(data => location = data)
                .catch(e => console.log(e))

            console.log(location);

            const checkUser = await model.checkUser(phone)

            if (!checkUser) {
                const pass_hash = await bcryptjs.hash(password, 10)
                const addUser = await model.registerUser(name, surname, age, who, phone, pass_hash, country, capital, temptoken)
                const addApp = await model.addAppUser(notification_token ? notification_token : "", addUser.user_id, app_key)

                const token = await new JWT({ id: addUser.user_id, name: addUser.user_name }).sign()

                res.json({
                    status: 200,
                    message: "Success",
                    data: token
                })
            } else {
                res.json({
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