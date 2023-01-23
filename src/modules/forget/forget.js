const model = require('./model');
const bcryptjs = require('bcryptjs')
const fetch = require('node-fetch')
const FormData = require('form-data')
const cron = require('node-cron')

module.exports = {
    POST_PHONE: async (req, res) => {
        try {
            const { url } = req.params
            let code = '';

            const makeCode = (length) => {
                let characters = '0123456789';
                let charactersLength = characters.length;
                for (let i = 0; i < length; i++) {
                    code += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
            }

            if (url == "phone") {
                const { phone } = req.body
                const getUser = await model.getUser(`%${phone}`)


                cron.schedule('* * * */23 * *', () => {
                    const formData = new FormData() 
                    formData.append("email", "karimovhikmatillojon@gmail.com")
                    formData.append("password", "xqgVn6MzyjCxBGL9Jt5OoZHeubrUVsg55VGKpFAS")

                    fetch('https://notify.eskiz.uz/api/auth/login', {
                        method: "POST",
                        body: formData
                    })
                        .then(res => res.json())
                        .then(async (data) => await model.UpdateToken(data.data.token))
                        .catch((e) => console.log(e))
                });

                if (getUser) {
                    makeCode(4)
                    const smsCode = await model.postCode(phone, code)
                    const token = await model.getToken()

                    if (smsCode) {

                        const formData = new FormData()
                        formData.append("mobile_phone", phone)
                        formData.append("message", code)
                        formData.append("from", "4546")

                        fetch('https://notify.eskiz.uz/api/message/sms/send', {
                            method: "POST",
                            headers: {
                                "AUTHORIZATION": "Bearer " + token.sms_token
                            },
                            body: formData
                        })
                            .then(res => res.json())
                            .then(data => console.log(data))
                            .catch((e) => console.log(e))


                        setTimeout(async () => {
                            const disactive = await model.updeteActive(smsCode.sms_users_id, false)
                            console.log(disactive);
                        }, 120000);

                        return res.json({
                            status: 200,
                            message: "Success",
                            data: getUser
                        })
                    }

                } else {
                    res.json({
                        status: 404,
                        message: "Not found"
                    })
                }
            } else if (url == "sms") {
                const { phone, sms } = req.body

                console.log(sms);

                if (sms) {
                    const checkCode = await model.getCode(phone, sms.toString())
                    console.log(checkCode);

                    if (checkCode) {

                        if (checkCode.sms_isactive == true) {
                            return res.json({
                                status: 200,
                                message: "Success"
                            })
                        } else {
                            return res.json({
                                status: 404,
                                message: "Not found"
                            })
                        }
                    } else {
                        return res.json({
                            status: 404,
                            message: "Not found"
                        })
                    }

                } else {
                    return res.json({
                        status: 404,
                        message: "Not found"
                    })
                }
            } else if (url == "password") {
                const { phone, password } = req.body
                const pass_hash = await bcryptjs.hash(password, 10)
                const updatePass = await model.putUser(phone, pass_hash)

                if (updatePass) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: updatePass
                    })
                }
            }

        } catch (err) {
            console.log(err)
            res.json({
                status: 500,
                message: "Internal Server Error",
            })
        }
    },


}