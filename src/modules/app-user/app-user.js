const model = require('./model')

module.exports = {
    GET_APP_USERS: async (req, res) => {
        try {
            const { name, key, userId, position, id, phone, sort, offset } = req.query

            if (name || key || userId || position || phone || sort || offset) {
                if (userId && key) {
                    const appUserByUserIdKEy = await model.getAppUserByUserIdKEy(userId, key)

                    return res.json({
                        status: 200,
                        message: "Success",
                        data: appUserByUserIdKEy
                    });

                } else if (offset && name) {
                    const appUserByName = await model.getByName(offset, `%${name}%`)

                    return res.json({
                        status: 200,
                        message: "Success",
                        data: appUserByName
                    });
                } else if (userId) {
                    const appUserById = await model.getById(userId)

                    return res.json({
                        status: 200,
                        message: "Success",
                        data: appUserById
                    });
                } else if (offset && phone) {
                    console.log(phone);
                    const getByPhone = await model.getByPhone(offset, `%${phone}%`)

                    return res.json({
                        status: 200,
                        message: "Success",
                        data: getByPhone
                    });
                } else if (offset && key) {
                    const appUserByKey = await model.getByKey(offset, `${key}%`)

                    return res.json({
                        status: 200,
                        message: "Success",
                        data: appUserByKey
                    });
                } else if (offset && sort) {
                    const AppUsersByLimitPaginationBySort = await model.getAppUsersByLimitPaginationBySort(offset, sort)
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: AppUsersByLimitPaginationBySort
                    });
                } else if (offset) {
                    const AppUsersByLimitPagination = await model.getAppUsersByLimitPagination(offset)
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: AppUsersByLimitPagination
                    });
                } else {
                    const allAppUser = await model.getAllAppUser()
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: allAppUser
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

    GET_USER_BY_APP_KEY_COUNT_GENDER: async (req, res) => {
        try {
            const { appKey } = req.query

            if (appKey) {
                const APP_USER_BY_APP_KEY_COUNT = `
                    select 
                        b.user_who, count(b.user_id)
                    from
                            apps_user a
                    inner join
                            users b
                    on 
                        a.user_id = b.user_id
                    where
                        a.app_key = '${appKey}'
                    group by 
                        b.user_who
                    order by
                        b.user_who desc
                `
                const appUserByAppKeyCount = await model.appUserByAppKeyCount(APP_USER_BY_APP_KEY_COUNT)

                if (appUserByAppKeyCount) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: appUserByAppKeyCount
                    });
                }
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
    },

    GET_USER_BY_APP_KEY_COUNT: async (req, res) => {
        try {
            const { sort } = req.query

            if (sort) {
                const APP_USER_BY_APP_KEY_COUNT_GENDER = `
                    SELECT 
                        app_key, count(app_user_id) 
                    FROM 
                        apps_user 
                    GROUP BY 
                        app_key 
                    ORDER BY
                        ${sort};
                `
                const appUserByAppKeyCountGender = await model.appUserByAppKeyCountGender(APP_USER_BY_APP_KEY_COUNT_GENDER)

                if (appUserByAppKeyCountGender) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: appUserByAppKeyCountGender
                    });
                }
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
    },

    GET_USER_BY_APP_KEY_USERS: async (req, res) => {
        try {
            const { position, id, key } = req.query

            if (position == 'next' && id && key) {
                const appUserByAppKeyUsersLimitNext = await model.appUserByAppKeyUsersLimitNext(id, key)

                if (appUserByAppKeyUsersLimitNext) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: appUserByAppKeyUsersLimitNext
                    });
                }
            } else if (position == 'prev' && id && key) {
                const appUserByAppKeyUsersLimitPrev = await model.appUserByAppKeyUsersLimitPrev(id, key)

                if (appUserByAppKeyUsersLimitPrev) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: appUserByAppKeyUsersLimitPrev
                    });
                }

            } else if (key) {
                const appUserByAppKeyUsers = await model.appUserByAppKeyUsers(key)

                if (appUserByAppKeyUsers) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: appUserByAppKeyUsers
                    });
                }
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
    },

    UPDATE_USER_INTERESTED: async (req, res) => {
        try {
            const { key, userId } = req.query

            if (key, userId) {
                const updateUserInterested = await model.updateUserInterested(key, userId)

                if (updateUserInterested) {
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
            }
        } catch (error) {
            console.log(error);
            res.json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    },

    GET_USERS_APPS_COUNT: async (req, res) => {
        try {
            const { offset, sort } = req.query
            const usersAppsCount = await model.usersAppsCount(offset, sort)

            if (usersAppsCount) {
                return res.json({
                    status: 200,
                    message: "Success",
                    data: usersAppsCount
                })
            } else {
                console.log(error);
                res.json({
                    status: 500,
                    message: "Internal Server Error"
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
