const model = require('./model');

module.exports = {
    GET_COUNTRY: async (_, res) => {
        try {
            const userCountry = await model.getUserCountry()

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
            const { postion, id, country, city } = req.query

            if (postion === 'next' && id && country && city) {
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

            } else if (postion === 'prev' && id && country && city) {
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
    }
}