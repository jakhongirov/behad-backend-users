const model = require('./model');
const requestIp = require('request-ip')
const bcryptjs = require('bcryptjs')
const fetch = require('node-fetch')

module.exports = {
    GET_USERS: async (req, res) => {
        try {
            const { id, phone, name, surname, age, token, key, notification, city, region } = req.query;
            if (id || phone || name || surname || age || token || key || notification) {

                if (token && key && notification) {
                    const foundbyTokenUser = await model.getfoundbyTokenUser(token);
                    console.log(token, key, notification, city, region);
                    console.log(foundbyTokenUser);

                    // if (region != "not") {
                    //     const userRegion = await model.putUserRegion(foundbyTokenUser.user_id, region);
                    //     console.log(userRegion);
                    // }
                    // if (city != "not") {
                    //     const UserCity = await model.putUserCity(foundbyTokenUser.user_id, city);
                    //     console.log(UserCity);
                    // }

                    if (foundbyTokenUser) {

                        // fetch("https://ipinfo.io/json?token=0166032ebc35f8").then(
                        //     (res) => res.json()
                        // ).then(
                        //     async (data) => {
                        //         const UserCity = await model.putUserCity(foundbyTokenUser.user_id, data.region);
                        //         const userRegion = await model.putUserRegion(foundbyTokenUser.user_id, data.city);
                        //         console.log(UserCity, userRegion);
                        //     }
                        // )

                        const appUser = await model.getAppUser(foundbyTokenUser.user_id, key)
                        await model.addTrackingUser(foundbyTokenUser.user_id, key)
                        if (appUser) {
                            return res.json({
                                status: 200,
                                message: "Success",
                                data: foundbyTokenUser
                            });
                        } else {
                            const addAppUser = await model.addAppUser(notification, foundbyTokenUser.user_id, key)
                            if (addAppUser) {
                                return res.json({
                                    status: 200,
                                    message: "Success",
                                    data: foundbyTokenUser
                                });
                            }
                        }
                    } else {
                        return res.json({
                            status: 404,
                            message: "Not found",
                        })
                    }
                } else if (id) {
                    const foundbyIdUser = await model.getfoundbyIdUser(id);
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: foundbyIdUser
                    });
                } else if (token) {
                    const foundbyTokenUser = await model.getfoundbyTokenUser(token)

                     fetch("https://ipgeolocation.abstractapi.com/v1/?api_key=6b36fe128061468990f8f8d79177fd9f").then(
                            (res) => res.json()
                        ).then(
                             (data) => {
                                console.log(data);
                            }
                        )

                    if (foundbyTokenUser) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: foundbyTokenUser,
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

            if (password) {
                const pass_hash = await bcryptjs.hash(password, 10)
                const updatedUser = await model.putUser(id, name, surname, age, who, phone, pass_hash,);
                return res.json({
                    status: 200,
                    message: "Updated",
                    data: updatedUser
                });
            } else {
                const updatedUser = await model.putUserWithoutPass(id, name, surname, age, who, phone);
                return res.json({
                    status: 200,
                    message: "Updated",
                    data: updatedUser
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
                const addComment = await model.updateComment(id, foundbyIdUser.user_comment ? `${foundbyIdUser.user_comment} ${comment}` : comment)

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