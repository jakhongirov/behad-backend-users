const model = require('./model');
const requestIP = require('request-ip')
const bcryptjs = require('bcryptjs')
const fetch = require('node-fetch')

module.exports = {
    GET_USERS: async (req, res) => {
        try {
            const { id, phone, name, surname, age, token } = req.query;
            if (id || phone || name || surname || age || token) {
                if (id) {

                    const foundbyIdUser = await model.getfoundbyIdUser(id);
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: foundbyIdUser
                    });
                } else if (token) {
                    const foundbyTokenUser = await model.getfoundbyTokenUser(token);

                    // // *-----
                    // const parseIp = (req) =>
                    //     req.headers['x-forwarded-for']?.split(',').shift()
                    //     || req.socket?.remoteAddress

                    // const ip = await parseIp(req)

                    // fetch(`https://ipapi.co/json`)
                    //     .then(res => res.json())
                    //     .then(data => console.log(data))
                    //     .catch(e => console.log(e))

                    // // *-------

                    if (foundbyTokenUser) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: foundbyTokenUser
                        });
                    } else {
                        return res.json({
                            status: 404,
                            message: "Not found",
                        });
                    }
                } else if (phone) {
                    const foundbyPhoneUser = await model.getfoundbyPhoneUser(`%${phone}%`);
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: foundbyPhoneUser
                    });
                } else if (name) {
                    const foundbyNameUser = await model.getfoundbyNameUser(`%${name}%`);
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: foundbyNameUser
                    });
                } else if (surname) {
                    const foundbySurnameUser = await model.getfoundbySurnameUser(`%${surname}%`);
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: foundbySurnameUser
                    });
                } else if (age) {
                    const foundbyAgeUser = await model.getfoundbyAgeUser(Number(age));
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: foundbyAgeUser
                    });
                }
            } else {
                const allUsers = await model.getallUsers();
                return res.json({
                    status: 200,
                    message: "Success",
                    data: allUsers
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

    PUT_USER: async (req, res) => {
        try {
            const { id, name, surname, age, phone, password, who } = req.body
            const pass_hash = await bcryptjs.hash(password, 10)
            let location;

            const parseIp = (req) =>
                req.headers['x-forwarded-for']?.split(',').shift()
                || req.socket?.remoteAddress

            const ip = await parseIp(req)

            fetch(`https://ipinfo.io/${ip}?token=0166032ebc35f8`)
                .then(res => res.json())
                .then(data => location = data)
                .catch(e => console.log(e))

            console.log(location);


            const updatedUser = await model.putUser(id, name, surname, age, who, phone, pass_hash,);
            return res.json({
                status: 200,
                message: "Updated",
                data: updatedUser
            });

        } catch (error) {
            console.log(error);
            res.json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    },

    DELETE_USER: async (req, res) => {
        try {
            const { id } = req.body
            const deleteUser = await model.deleteUser(id);
            return res.json({
                status: 200,
                message: "Deleted",
                data: deleteUser
            });
        } catch (error) {
            console.log(error);
            res.json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    },

    PUT_COMMENT_USER_ADMIN: async (req, res) => {
        try {
            const { id, comment } = req.body
            const foundbyIdUser = await model.getfoundbyIdUser(id);

            if (foundbyIdUser) {
                const addComment = await model.addComment(id, comment)

                if (addComment) {
                    return res.json({
                        status: 200,
                        message: "Added comment",
                        data: addComment
                    })
                } else {
                    return res.json({
                        status: 400,
                        message: "Bad request",
                    })
                }

            } else {
                return res.json({
                    status: 404,
                    message: "Not found",
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

    POST_COMMENT_USER: async (req, res) => {
        try {
            const { id, comment } = req.body
            const foundbyIdUser = await model.getfoundbyIdUser(id);

            if (foundbyIdUser) {
                const addComment = await model.updateComment(id, foundbyIdUser.user_comment ? `${foundbyIdUser.user_comment}, ${comment}` : comment)

                if (addComment) {
                    return res.json({
                        status: 200,
                        message: "Added comment",
                        data: addComment
                    })
                } else {
                    return res.json({
                        status: 400,
                        message: "Bad request",
                    })
                }

            } else {
                return res.json({
                    status: 404,
                    message: "Not found",
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