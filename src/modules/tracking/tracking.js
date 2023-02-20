const model = require('./model');

module.exports = {
    GET: async (req, res) => {
        try {
            const { id, position, userId, key } = req.query

            if (position == 'next' && id && userId && key) {
                const userTrackingLimitNext = await model.userTrackingLimitNext(userId, id, key)
                return res.json({
                    status: 200,
                    message: "Success",
                    data: userTrackingLimitNext
                });
            } else if (position == 'prev' && id && userId && key) {
                const userTrackingLimitPrev = await model.userTrackingLimitPrev(userId, id, key)
                return res.json({
                    status: 200,
                    message: "Success",
                    data: userTrackingLimitPrev
                });
            } else {
                const trackingUsers = await model.getTrackingUsers(userId, key)

                if (trackingUsers) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: trackingUsers
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

    GET_USER_TRACKING_FILTER: async (req, res) => {
        try {
            const { position, id, key, day } = req.query

            if (day == 7) {
                if (position == 'next' && id && key) {
                    const userTrackingFilterDay7LimitNextByKey = await model.userTrackingFilterDay7LimitNextByKey(id, key)

                    if (userTrackingFilterDay7LimitNextByKey) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: userTrackingFilterDay7LimitNextByKey
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }

                } else if (position == 'prev' && id && key) {
                    const userTrackingFilterDay7LimitPrevByKey = await model.userTrackingFilterDay7LimitPrevByKey(id, key)

                    if (userTrackingFilterDay7LimitPrevByKey) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: userTrackingFilterDay7LimitPrevByKey
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }
                } else if (position == 'next' && id) {
                    const userTrackingFilterDay7LimitNext = await model.userTrackingFilterDay7LimitNext(id)

                    if (userTrackingFilterDay7LimitNext) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: userTrackingFilterDay7LimitNext
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }
                } else if (position == 'next' && id) {
                    const userTrackingFilterDay7LimitPrev = await model.userTrackingFilterDay7LimitPrev(id)

                    if (userTrackingFilterDay7LimitPrev) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: userTrackingFilterDay7LimitPrev
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }
                } else if (key) {
                    const userTrackingFilterDay7ByKey = await model.userTrackingFilterDay7ByKey(key)

                    if (userTrackingFilterDay7ByKey) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: userTrackingFilterDay7ByKey
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }
                } else if (day) {
                    const userTrackingFilterDay7 = await model.userTrackingFilterDay7()

                    if (userTrackingFilterDay7) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: userTrackingFilterDay7
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }
                } else {
                    return res.json({
                        status: 400,
                        message: "Bad request"
                    })
                }
            } else if (day == 14) {
                if (position == 'next' && id && key) {
                    const userTrackingFilterDay14LimitNextByKey = await model.userTrackingFilterDay14LimitNextByKey(id, key)

                    if (userTrackingFilterDay14LimitNextByKey) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: userTrackingFilterDay14LimitNextByKey
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }

                } else if (position == 'prev' && id && key) {
                    const userTrackingFilterDay14LimitPrevByKey = await model.userTrackingFilterDay14LimitPrevByKey(id, key)

                    if (userTrackingFilterDay14LimitPrevByKey) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: userTrackingFilterDay14LimitPrevByKey
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }
                } else if (position == 'next' && id) {
                    const userTrackingFilterDay14LimitNext = await model.userTrackingFilterDay14LimitNext(id)

                    if (userTrackingFilterDay14LimitNext) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: userTrackingFilterDay14LimitNext
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }
                } else if (position == 'next' && id) {
                    const userTrackingFilterDay14LimitPrev = await model.userTrackingFilterDay14LimitPrev(id)

                    if (userTrackingFilterDay14LimitPrev) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: userTrackingFilterDay14LimitPrev
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }
                } else if (key) {
                    const userTrackingFilterDay14ByKey = await model.userTrackingFilterDay14ByKey(key)

                    if (userTrackingFilterDay14ByKey) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: userTrackingFilterDay14ByKey
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }
                } else if (day) {
                    const userTrackingFilterDay14 = await model.userTrackingFilterDay14()

                    if (userTrackingFilterDay14) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: userTrackingFilterDay14
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }
                } else {
                    return res.json({
                        status: 400,
                        message: "Bad request"
                    })
                }
            } else if (day == 10) {
                if (position == 'next' && id && key) {
                    const userTrackingFilterDay10LimitNextByKey = await model.userTrackingFilterDay10LimitNextByKey(id, key)

                    if (userTrackingFilterDay10LimitNextByKey) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: userTrackingFilterDay10LimitNextByKey
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }

                } else if (position == 'prev' && id && key) {
                    const userTrackingFilterDay10LimitPrevByKey = await model.userTrackingFilterDay10LimitPrevByKey(id, key)

                    if (userTrackingFilterDay10LimitPrevByKey) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: userTrackingFilterDay10LimitPrevByKey
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }
                } else if (position == 'next' && id) {
                    const userTrackingFilterDay10LimitNext = await model.userTrackingFilterDay10LimitNext(id)

                    if (userTrackingFilterDay10LimitNext) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: userTrackingFilterDay10LimitNext
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }
                } else if (position == 'next' && id) {
                    const userTrackingFilterDay10LimitPrev = await model.userTrackingFilterDay10LimitPrev(id)

                    if (userTrackingFilterDay10LimitPrev) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: userTrackingFilterDay10LimitPrev
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }
                } else if (key) {
                    const userTrackingFilterDay10ByKey = await model.userTrackingFilterDay10ByKey(key)

                    if (userTrackingFilterDay10ByKey) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: userTrackingFilterDay10ByKey
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }
                } else if (day) {
                    const userTrackingFilterDay10 = await model.userTrackingFilterDay10()

                    if (userTrackingFilterDay10) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: userTrackingFilterDay10
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }
                } else {
                    return res.json({
                        status: 400,
                        message: "Bad request"
                    })
                }
            } else if (day == 30) {
                if (position == 'next' && id && key) {
                    const userTrackingFilterDay30LimitNextByKey = await model.userTrackingFilterDay30LimitNextByKey(id, key)

                    if (userTrackingFilterDay30LimitNextByKey) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: userTrackingFilterDay30LimitNextByKey
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }

                } else if (position == 'prev' && id && key) {
                    const userTrackingFilterDay30LimitPrevByKey = await model.userTrackingFilterDay30LimitPrevByKey(id, key)

                    if (userTrackingFilterDay30LimitPrevByKey) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: userTrackingFilterDay30LimitPrevByKey
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }
                } else if (position == 'next' && id) {
                    const userTrackingFilterDay30LimitNext = await model.userTrackingFilterDay30LimitNext(id)

                    if (userTrackingFilterDay30LimitNext) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: userTrackingFilterDay30LimitNext
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }
                } else if (position == 'next' && id) {
                    const userTrackingFilterDay30LimitPrev = await model.userTrackingFilterDay30LimitPrev(id)

                    if (userTrackingFilterDay30LimitPrev) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: userTrackingFilterDay30LimitPrev
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }
                } else if (key) {
                    const userTrackingFilterDay30ByKey = await model.userTrackingFilterDay30ByKey(key)

                    if (userTrackingFilterDay30ByKey) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: userTrackingFilterDay30ByKey
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }
                } else if (day) {
                    const userTrackingFilterDay30 = await model.userTrackingFilterDay30()

                    if (userTrackingFilterDay30) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: userTrackingFilterDay30
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }
                } else {
                    return res.json({
                        status: 400,
                        message: "Bad request"
                    })
                }
            } else if (day == 60) {
                if (position == 'next' && id && key) {
                    const userTrackingFilterDay60LimitNextByKey = await model.userTrackingFilterDay60LimitNextByKey(id, key)

                    if (userTrackingFilterDay60LimitNextByKey) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: userTrackingFilterDay60LimitNextByKey
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }

                } else if (position == 'prev' && id && key) {
                    const userTrackingFilterDay60LimitPrevByKey = await model.userTrackingFilterDay60LimitPrevByKey(id, key)

                    if (userTrackingFilterDay60LimitPrevByKey) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: userTrackingFilterDay60LimitPrevByKey
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }
                } else if (position == 'next' && id) {
                    const userTrackingFilterDay60LimitNext = await model.userTrackingFilterDay60LimitNext(id)

                    if (userTrackingFilterDay60LimitNext) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: userTrackingFilterDay60LimitNext
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }
                } else if (position == 'next' && id) {
                    const userTrackingFilterDay60LimitPrev = await model.userTrackingFilterDay60LimitPrev(id)

                    if (userTrackingFilterDay60LimitPrev) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: userTrackingFilterDay60LimitPrev
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }
                } else if (key) {
                    const userTrackingFilterDay60ByKey = await model.userTrackingFilterDay60ByKey(key)

                    if (userTrackingFilterDay60ByKey) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: userTrackingFilterDay60ByKey
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }
                } else if (day) {
                    const userTrackingFilterDay60 = await model.userTrackingFilterDay60()

                    if (userTrackingFilterDay60) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: userTrackingFilterDay60
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }
                } else {
                    return res.json({
                        status: 400,
                        message: "Bad request"
                    })
                }
            } else if (day == 3) {
                if (position == 'next' && id && key) {
                    const userTrackingFilterDay3LimitNextByKey = await model.userTrackingFilterDay3LimitNextByKey(id, key)

                    if (userTrackingFilterDay3LimitNextByKey) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: userTrackingFilterDay3LimitNextByKey
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }

                } else if (position == 'prev' && id && key) {
                    const userTrackingFilterDay3LimitPrevByKey = await model.userTrackingFilterDay3LimitPrevByKey(id, key)

                    if (userTrackingFilterDay3LimitPrevByKey) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: userTrackingFilterDay3LimitPrevByKey
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }
                } else if (position == 'next' && id) {
                    const userTrackingFilterDay3LimitNext = await model.userTrackingFilterDay3LimitNext(id)

                    if (userTrackingFilterDay3LimitNext) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: userTrackingFilterDay3LimitNext
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }
                } else if (position == 'next' && id) {
                    const userTrackingFilterDay3LimitPrev = await model.userTrackingFilterDay3LimitPrev(id)

                    if (userTrackingFilterDay3LimitPrev) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: userTrackingFilterDay3LimitPrev
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }
                } else if (key) {
                    const userTrackingFilterDay3ByKey = await model.userTrackingFilterDay3ByKey(key)

                    if (userTrackingFilterDay3ByKey) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: userTrackingFilterDay3ByKey
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }
                } else if (day) {
                    const userTrackingFilterDay3 = await model.userTrackingFilterDay3()

                    if (userTrackingFilterDay3) {
                        return res.json({
                            status: 200,
                            message: "Success",
                            data: userTrackingFilterDay3
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }
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

    GET_USERS_TRACKING_COUNT: async (_, res) => {
        try {
            const usersTrackingCount = await model.usersTrackingCount()

            return res.json({
                status: 200,
                message: "Success",
                data: usersTrackingCount
            })

        } catch (error) {
            console.log(error);
            res.json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    }
}