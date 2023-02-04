const { fetch, fetchALL } = require("../../lib/postgres");

const ALL_APP_USER = `
    select 
        *, to_char(app_user_install_date at time zone 'Asia/Tashkent', 'HH24:MI/DD.MM.YYYY')
     from
            apps_user a
     inner join
            users b
    on 
        a.user_id = b.user_id
    inner join
            apps c
    on 
        a.app_key = c.app_key
    ORDER BY
        a.app_user_id DESC
    LIMIT 50;
`

const APP_USER_BY_NAME = `
    select
        *, to_char(app_user_install_date at time zone 'Asia/Tashkent', 'HH24:MI/DD.MM.YYYY')
    from
        apps_user a
    inner join
        users b
    on 
        a.user_id = b.user_id
    inner join
        apps c
    on 
        a.app_key = c.app_key
    where 
        b.user_name ilike $1
    ORDER BY
        a.app_user_id DESC;
`

const BY_ID = `
    select
        *, to_char(app_user_install_date at time zone 'Asia/Tashkent', 'HH24:MI/DD.MM.YYYY')
    from
        apps_user a
    inner join
        users b
    on 
        a.user_id = b.user_id
    inner join
        apps c
    on 
        a.app_key = c.app_key
    where 
        a.user_id = $1
    ORDER BY
        a.app_user_id DESC;
`;

const BY_KEY = `
    select
        *, to_char(app_user_install_date at time zone 'Asia/Tashkent', 'HH24:MI/DD.MM.YYYY')
    from
        apps_user a
    inner join
        users b
    on 
        a.user_id = b.user_id
    inner join
        apps c
    on 
        a.app_key = c.app_key
    where 
        a.app_key ilike $1
    ORDER BY
        a.app_user_id DESC;
`

const USER_ID_BY_KEY = `
    select
        *, to_char(app_user_install_date at time zone 'Asia/Tashkent', 'HH24:MI/DD.MM.YYYY')
    from
        apps_user   
    where
        user_id = $1 and app_key = $2
    ORDER BY
        app_user_id DESC;
`
const UPDATE_APP_USER_PRO = `
    UPDATE
        apps_user
    SET
        app_user_isPayed = $2    
    WHERE
        app_user_id = $1 
    RETURNING * ;
`;

const UPDATE_USER_INTERESTED = `
    UPDATE
        apps_user
    SET
        app_user_interested_to_buy = app_user_interested_to_buy + 1
    WHERE
        user_id = $2 and app_key = $1
    RETURNING * ;
`;

const APP_USER_LIMIT_NEXT_BY_ID = `
    select
        *, to_char(app_user_install_date at time zone 'Asia/Tashkent', 'HH24:MI/DD.MM.YYYY')
    from
        apps_user a
    inner join
        users b
    on 
        a.user_id = b.user_id
    inner join
        apps c
    on
        a.app_key = c.app_key
    where 
        a.app_user_id < $1
    ORDER BY
        a.app_user_id DESC
    LIMIT 50;
`

const APP_USER_LIMIT_PREV_BY_ID = `
    select
        *, to_char(app_user_install_date at time zone 'Asia/Tashkent', 'HH24:MI/DD.MM.YYYY')
    from
        apps_user a
    inner join
        users b
    on 
        a.user_id = b.user_id
    inner join
        apps c
    on
        a.app_key = c.app_key
    where 
        a.app_user_id > $1
    ORDER BY
        a.app_user_id DESC
    LIMIT 50;
`

const APP_USER_BY_APP_KEY_COUNT = `
    SELECT 
        app_key, count(app_user_id) 
    FROM 
        apps_user 
    GROUP BY 
        app_key;
`

const APP_USER_BY_APP_KEY_USERS = `
    select
        *, to_char(app_user_install_date at time zone 'Asia/Tashkent', 'HH24:MI/DD.MM.YYYY')
    from
        apps_user a
    inner join
        users b
    on 
        a.user_id = b.user_id
    inner join
        apps c
    on 
        a.app_key = c.app_key
    where 
        a.app_key = $1
    ORDER BY
        a.app_user_id DESC
    LIMIT 50;
`

const APP_USER_BY_APP_KEY_USERS_LIMIT_NEXT = `
    select
        *, to_char(app_user_install_date at time zone 'Asia/Tashkent', 'HH24:MI/DD.MM.YYYY')
    from
        apps_user a
    inner join
        users b
    on 
        a.user_id = b.user_id
    inner join
        apps c
    on
        a.app_key = c.app_key
    where 
        a.app_user_id < $1 and a.app_key = $2
    ORDER BY
        a.app_user_id DESC
    LIMIT 50;
`

const APP_USER_BY_APP_KEY_USERS_LIMIT_PREV = `
    select
        *, to_char(app_user_install_date at time zone 'Asia/Tashkent', 'HH24:MI/DD.MM.YYYY')
    from
        apps_user a
    inner join
        users b
    on 
        a.user_id = b.user_id
    inner join
        apps c
    on
        a.app_key = c.app_key
    where 
        a.app_user_id > $1 and a.app_key = $2
    ORDER BY
        a.app_user_id DESC
    LIMIT 50;
`

const getAllAppUser = () => fetchALL(ALL_APP_USER)
const getByName = (name) => fetchALL(APP_USER_BY_NAME, name)
const getById = (id) => fetchALL(BY_ID, id)
const getByKey = (key) => fetchALL(BY_KEY, key)
const getAppUserByUserIdKEy = (userId, key) => fetch(USER_ID_BY_KEY, userId, key)
const changeProVersion = (id, pro_v) => fetch(UPDATE_APP_USER_PRO, id, pro_v)
const updateUserInterested = (key, userId) => fetch(UPDATE_USER_INTERESTED, key, userId)
const getAppUserByLimitNext = (id) => fetchALL(APP_USER_LIMIT_NEXT_BY_ID, id)
const getAppUserByLimitPrev = (id) => fetchALL(APP_USER_LIMIT_PREV_BY_ID, id)
const appUserByAppKeyCount = () => fetchALL(APP_USER_BY_APP_KEY_COUNT)
const appUserByAppKeyUsers = (key) => fetchALL(APP_USER_BY_APP_KEY_USERS, key)
const appUserByAppKeyUsersLimitNext = (id, key) => fetchALL(APP_USER_BY_APP_KEY_USERS_LIMIT_NEXT, id, key)
const appUserByAppKeyUsersLimitPrev = (id, key) => fetchALL(APP_USER_BY_APP_KEY_USERS_LIMIT_PREV, id, key)

module.exports = {
    getAllAppUser,
    getByName,
    getById,
    getByKey,
    getAppUserByUserIdKEy,
    changeProVersion,
    updateUserInterested,
    getAppUserByLimitNext,
    getAppUserByLimitPrev,
    appUserByAppKeyCount,
    appUserByAppKeyUsers,
    appUserByAppKeyUsersLimitNext,
    appUserByAppKeyUsersLimitPrev
}

