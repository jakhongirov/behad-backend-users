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
            const { country } = req.query

            if (country) {
                const userCityByCountry = await model.getUserCityByCountry(country)

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

    GET_USERS_ALL_COUNT: async (req, res) => {
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
    }
}