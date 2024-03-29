const model = require('./model');
const bcryptjs = require('bcryptjs')
const path = require('path')
const FS = require('../../lib/fs')


module.exports = {
    GET_USERS: async (req, res) => {
        try {
            const { id, phone, name, surname, age, token, key, notification, offset, sort } = req.query;

            if (id || phone || name || surname || age || token || key || notification || sort || offset) {

                if (token && key && notification) {
                    const foundbyTokenUser = await model.getfoundbyTokenUser(token)
                    console.log(token);

                    if (foundbyTokenUser) {
                        console.log(foundbyTokenUser);

                        if (notification) {
                            await model.updateUserNotification(foundbyTokenUser.user_id, key, notification)
                        }

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
                } else if (offset && sort) {
                    const usersByLimitPaginationBySort = await model.getusersByLimitPaginationBySort(offset, sort)
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: usersByLimitPaginationBySort
                    });
                } else if (id) {
                    const foundbyIdUser = await model.getfoundbyIdUser(id);
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: foundbyIdUser
                    });
                } else if (token) {
                    const foundbyTokenUser = await model.getfoundbyTokenUser(token)

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
                } else if (offset && phone) {
                    const foundbyPhoneUser = await model.getfoundbyPhoneUser(offset, `%${phone}%`);
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: foundbyPhoneUser
                    });
                } else if (offset && name) {
                    const foundbyNameUser = await model.getfoundbyNameUser(offset, `%${name}%`);
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: foundbyNameUser
                    });
                } else if (offset && surname) {
                    const foundbySurnameUser = await model.getfoundbySurnameUser(offset, `%${surname}%`);
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: foundbySurnameUser
                    });
                } else if (offset && age) {
                    const foundbyAgeUser = await model.getfoundbyAgeUser(offset, Number(age));
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: foundbyAgeUser
                    });
                } else if (offset) {
                    const usersByLimitPagination = await model.getusersByLimitPagination(offset)
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: usersByLimitPagination
                    });
                } else {
                    const allUsers = await model.getallUsers();
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: allUsers
                    });
                }
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
            const { id, name, surname, age, date, phone, password, who } = req.body

            if (password) {
                const pass_hash = await bcryptjs.hash(password, 10)
                const updatedUser = await model.putUser(id, name, surname, age, date, who, phone, pass_hash,);
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
    },

    PUT_USER_PHONE_INFO: async (req, res) => {
        try {
            const { id, phone_model, phone_brand, phone_lang, phone_android_v, app_key, app_version } = req.body
            const checkAndroidVersion = await model.checkAndroidVersion(id, phone_android_v)

            if (app_key && app_version) {
                await model.putAppUserAppVersion(id, app_key, app_version)
            }

            if (checkAndroidVersion) {
                const putUserPhoneInfoWithoutAndroidVersion = await model.putUserPhoneInfoWithoutAndroidVersion(id, phone_model, phone_brand, phone_lang)

                if (putUserPhoneInfoWithoutAndroidVersion) {
                    return res.json({
                        status: 200,
                        message: "Success"
                    })
                } else {
                    return res.json({
                        status: 400,
                        message: "Bad request",
                    })
                }
            } else {
                const putUserPhoneInfo = await model.putUserPhoneInfo(id, phone_model, phone_brand, phone_lang, phone_android_v)

                if (putUserPhoneInfo) {
                    return res.json({
                        status: 200,
                        message: "Success"
                    })
                } else {
                    return res.json({
                        status: 400,
                        message: "Bad request",
                    })
                }
            }

        } catch (error) {
            console.log(error);
            res.json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    },

    PUT_USER_INTEREST: async (req, res) => {
        try {
            const { id, text } = req.body
            const foundbyIdUser = await model.getfoundbyIdUser(id);

            if (foundbyIdUser) {
                const addUserInterest = await model.addUserInterest(id, text)

                if (addUserInterest) {
                    return res.json({
                        status: 200,
                        message: "Success"
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

    PUT_USER_INTEREST_BY_APP_KEY: async (req, res) => {
        try {
            const { app_key, text } = req.body
            const addUserInterestByAppKey = await model.addUserInterestByAppKey(app_key, text)

            if (addUserInterestByAppKey) {
                return res.json({
                    status: 200,
                    message: "Success"
                })
            } else {
                return res.json({
                    status: 400,
                    message: "Bad request",
                })
            }

        } catch (error) {
            console.log(error);
            res.json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    },

    ADD_AVATAR: async (req, res) => {
        try {
            const { user_id } = req.body
            const uploadPhoto = req.file;
            const foundbyIdUser = await model.getfoundbyIdUser(user_id);

            const image_name = uploadPhoto.filename;
            const image_url = `https://users.behad.uz/public/images/${uploadPhoto.filename}`;

            if (foundbyIdUser[0]?.user_image_name) {
                const deleteOldLogo = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${foundbyIdUser[0]?.user_image_name}`))
                deleteOldLogo.delete()
            }

            const addImgUser = await model.addImgUser(user_id, image_url, image_name)

            if (addImgUser) {
                return res.json({
                    status: 200,
                    message: "Success"
                })
            } else {
                return res.json({
                    status: 404,
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