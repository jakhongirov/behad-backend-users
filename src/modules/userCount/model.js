const { fetch, fetchALL } = require("../../lib/postgres");

const USER_COUNTRY = `
    select 
        user_country, count(user_id) as users_count 
    from 
        users  
    group by 
        user_country;
`;

const USER_CITY_BY_COUNTRY = `
    select 
        user_capital, count(user_id) as users_count 
    from 
        users 
    where 
        user_country = $1 
    group by 
        user_capital;
`;

const USER_CITY_BY_COUNTRY_CITY = `
    select 
        *
    from 
        users 
    where 
        user_country = $1 and user_capital= $2
    order by
        user_id desc
    LIMIT 50;
`;

const USER_CITY_BY_COUNTRY_CITY_NEXT = `
    select 
        *
    from 
        users 
    where 
        user_id < $1 and user_country = $2 and user_capital= $3
    order by
        user_id desc
    LIMIT 50;
`;

const USER_CITY_BY_COUNTRY_CITY_PREV = `
    select 
        *
    from 
        users 
    where 
        user_id > $1 and user_country = $2 and user_capital= $3
    order by
        user_id desc
    LIMIT 50;
`;

const getUserCountry = () => fetchALL(USER_COUNTRY)
const getUserCityByCountry = (country) => fetchALL(USER_CITY_BY_COUNTRY, country)
const getUserByCountryCity = (country, city) => fetchALL(USER_CITY_BY_COUNTRY_CITY, country, city)
const getUserByCountryCityLimitNext = (id, country, city) => fetchALL(USER_CITY_BY_COUNTRY_CITY_NEXT, id, country, city)
const getUserByCountryCityLimitPrev = (id, country, city) => fetchALL(USER_CITY_BY_COUNTRY_CITY_PREV, id, country, city)

module.exports = {
    getUserCountry,
    getUserCityByCountry,
    getUserByCountryCity,
    getUserByCountryCityLimitNext,
    getUserByCountryCityLimitPrev
}