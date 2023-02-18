const { fetch, fetchALL } = require("../../lib/postgres");

// const USER_COUNTRY = `
//     select 
//         user_country, count(user_id) as users_count 
//     from 
//         users  
//     group by 
//         user_country;
// `;

// const USER_CITY_BY_COUNTRY = `
//     select 
//         user_capital, count(user_id) as users_count 
//     from 
//         users 
//     where 
//         user_country = $1 
//     group by 
//         user_capital;
// `;

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

const ALL_USERS_COUNT = `
    select 
        count(user_id) 
    from 
        users;
`;

const USERS_GENDER_COUNT = `
    select 
        user_who, count(user_id) 
    from 
        users 
    group by 
        user_who;
`

const USERS_COUNT_AGE_15 = `
    SELECT
        count(user_id) as counts
    FROM
        users
    WHERE
        user_age >= 0 and user_age <= 15;
`;

const USERS_COUNT_AGE_25 = `
    SELECT
        count(user_id)
    FROM
        users
    WHERE
        user_age >= 16 and user_age <= 25;
`;

const USERS_COUNT_AGE_40 = `
    SELECT
        count(user_id)
    FROM
        users
    WHERE
        user_age >= 26 and user_age <= 40;
`;

const USERS_COUNT_AGE_60 = `
    SELECT
        count(user_id)
    FROM
        users
    WHERE
        user_age >= 41 and user_age <= 60;
`;

const USERS_COUNT_AGE_80 = `
    SELECT
        count(user_id)
    FROM
        users
    WHERE
        user_age >= 61 and user_age <= 80;
`;

const USERS_COUNT_AGE= `
    SELECT
        count(user_id)
    FROM
        users
    WHERE
        user_age >= 80;
`;

const getUserCountry = (query) => fetchALL(query)
const getUserCityByCountry = (query) => fetchALL(query)
const getUserByCountryCity = (country, city) => fetchALL(USER_CITY_BY_COUNTRY_CITY, country, city)
const getUserByCountryCityLimitNext = (id, country, city) => fetchALL(USER_CITY_BY_COUNTRY_CITY_NEXT, id, country, city)
const getUserByCountryCityLimitPrev = (id, country, city) => fetchALL(USER_CITY_BY_COUNTRY_CITY_PREV, id, country, city)
const allUsersCount = () => fetch(ALL_USERS_COUNT)
const usersGenderCount = () => fetchALL(USERS_GENDER_COUNT)
const usersCountAge15 = () => fetch(USERS_COUNT_AGE_15)
const usersCountAge25 = () => fetch(USERS_COUNT_AGE_25)
const usersCountAge40 = () => fetch(USERS_COUNT_AGE_40)
const usersCountAge60 = () => fetch(USERS_COUNT_AGE_60)
const usersCountAge80 = () => fetch(USERS_COUNT_AGE_80)
const usersCountAge = () => fetch(USERS_COUNT_AGE)

module.exports = {
    getUserCountry,
    getUserCityByCountry,
    getUserByCountryCity,
    getUserByCountryCityLimitNext,
    getUserByCountryCityLimitPrev,
    allUsersCount,
    usersGenderCount,
    usersCountAge15,
    usersCountAge25,
    usersCountAge40,
    usersCountAge60,
    usersCountAge80,
    usersCountAge,
}