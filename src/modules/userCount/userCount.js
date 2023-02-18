const model = require('./model');

module.exports = {
    GET_COUNTRY: async (req, res) => {
        try {
            const { sort } = req.query

            const USER_COUNTRY = `
                select 
                    user_country, count(user_id) as users_count 
                from 
                    users  
                group by 
                    user_country 
                order by 
                    ${sort};
            `;

            const userCountry = await model.getUserCountry(USER_COUNTRY)

            if (userCountry) {
                return res.json({
                    status: 200,
                    message: "Success",
                    data: userCountry
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

    GET_CITY: async (req, res) => {
        try {
            const { sort, country } = req.query

            if (country) {

                const USER_CITY_BY_COUNTRY = `
                    select 
                        user_capital, count(user_id) as users_count 
                    from 
                        users 
                    where 
                        user_country = '${country}' 
                    group by 
                        user_capital
                    order by 
                        ${sort};
                `;

                const userCityByCountry = await model.getUserCityByCountry(USER_CITY_BY_COUNTRY)

                if (userCityByCountry) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: userCityByCountry
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

        } catch (error) {
            console.log(error);
            res.json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    },

    GET_COUNTRY_CITY: async (req, res) => {
        try {
            const { position, id, country, city } = req.query

            if (position === 'next' && id && country && city) {
                const userByCountryCityLimitNext = await model.getUserByCountryCityLimitNext(id, country, city)

                if (userByCountryCityLimitNext) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: userByCountryCityLimitNext
                    })
                } else {
                    return res.json({
                        status: 400,
                        message: "Bad request"
                    })
                }

            } else if (position === 'prev' && id && country && city) {
                const userByCountryCityLimitPrev = await model.getUserByCountryCityLimitPrev(id, country, city)

                if (userByCountryCityLimitPrev) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: userByCountryCityLimitPrev
                    })
                } else {
                    return res.json({
                        status: 400,
                        message: "Bad request"
                    })
                }
            } else if (country && city) {
                const userByCountryCity = await model.getUserByCountryCity(country, city)

                if (userByCountryCity) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: userByCountryCity
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

        } catch (error) {
            console.log(error);
            res.json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    },

    GET_USERS_ALL_COUNT: async (_, res) => {
        try {
            const allUsersCount = await model.allUsersCount()

            if (allUsersCount) {
                return res.json({
                    status: 200,
                    message: "Success",
                    count: allUsersCount.count
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

    GET_USERS_GENDER_COUNT: async (_, res) => {
        try {
            const usersGenderCount = await model.usersGenderCount()

            if (usersGenderCount) {
                return res.json({
                    status: 200,
                    message: "Success",
                    count: usersGenderCount
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

    GET_USERS_AGE_COUNT_FILTER: async (_, res) => {
        try {
            const usersCountAge15 = await model.usersCountAge15()
            const usersCountAge25 = await model.usersCountAge25()
            const usersCountAge40 = await model.usersCountAge40()
            const usersCountAge60 = await model.usersCountAge60()
            const usersCountAge80 = await model.usersCountAge80()
            const usersCountAge = await model.usersCountAge()

            return res.json({
                status: 200,
                message: "Success",
                data: {
                    "15": usersCountAge15,
                    "25": usersCountAge25,
                    "40": usersCountAge40,
                    "60": usersCountAge60,
                    "80": usersCountAge80,
                    "unlimit": usersCountAge
                }
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