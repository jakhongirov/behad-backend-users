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

    GET_USERS_GENDER_COUNT: async (req, res) => {
        try {
            const { country, city } = req.query

            if (country == 'all' && city == 'all') {
                const usersGenderCount = await model.usersGenderCount()

                if (usersGenderCount) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        count: usersGenderCount
                    })
                }
            } else if (country && city == 'all') {
                const usersGenderCountByCountry = await model.usersGenderCountByCountry(country)

                if (usersGenderCountByCountry) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        count: usersGenderCountByCountry
                    })
                }
            } else if (country && city) {
                const usersGenderCountByCountryByCountryCity = await model.usersGenderCountByCountryByCountryCity(country, city)

                if (usersGenderCountByCountryByCountryCity) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        count: usersGenderCountByCountryByCountryCity
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

    GET_USERS_AGE_COUNT_FILTER: async (req, res) => {
        try {
            const { country, city } = req.query

            if (country == 'all' && city == 'all') {
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
            } else if (country && city == 'all') {
                const usersCountAge15ByCountry = await model.usersCountAge15ByCountry(country)
                const usersCountAge25ByCountry = await model.usersCountAge25ByCountry(country)
                const usersCountAge40ByCountry = await model.usersCountAge40ByCountry(country)
                const usersCountAge60ByCountry = await model.usersCountAge60ByCountry(country)
                const usersCountAge80ByCountry = await model.usersCountAge80ByCountry(country)
                const usersCountAgeByCountry = await model.usersCountAgeByCountry(country)

                return res.json({
                    status: 200,
                    message: "Success",
                    data: {
                        "15": usersCountAge15ByCountry,
                        "25": usersCountAge25ByCountry,
                        "40": usersCountAge40ByCountry,
                        "60": usersCountAge60ByCountry,
                        "80": usersCountAge80ByCountry,
                        "unlimit": usersCountAgeByCountry
                    }
                })
            } if (country && city) {
                const usersCountAge15ByCountryCity = await model.usersCountAge15ByCountryCity(country, city)
                const usersCountAge25ByCountryCity = await model.usersCountAge25ByCountryCity(country, city)
                const usersCountAge40ByCountryCity = await model.usersCountAge40ByCountryCity(country, city)
                const usersCountAge60ByCountryCity = await model.usersCountAge60ByCountryCity(country, city)
                const usersCountAge80ByCountryCity = await model.usersCountAge80ByCountryCity(country, city)
                const usersCountAgeByCountryCity = await model.usersCountAgeByCountryCity(country, city)

                return res.json({
                    status: 200,
                    message: "Success",
                    data: {
                        "15": usersCountAge15ByCountryCity,
                        "25": usersCountAge25ByCountryCity,
                        "40": usersCountAge40ByCountryCity,
                        "60": usersCountAge60ByCountryCity,
                        "80": usersCountAge80ByCountryCity,
                        "unlimit": usersCountAgeByCountryCity
                    }
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