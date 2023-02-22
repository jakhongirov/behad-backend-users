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

const getAllAppUser = () => fetchALL(ALL_APP_USER)
const getById = (id) => fetchALL(BY_ID, id)
const getAppUserByUserIdKEy = (userId, key) => fetch(USER_ID_BY_KEY, userId, key)
const changeProVersion = (id, pro_v) => fetch(UPDATE_APP_USER_PRO, id, pro_v)
const updateUserInterested = (key, userId) => fetch(UPDATE_USER_INTERESTED, key, userId)
const getAppUserByLimitNext = (id) => fetchALL(APP_USER_LIMIT_NEXT_BY_ID, id)
const getAppUserByLimitPrev = (id) => fetchALL(APP_USER_LIMIT_PREV_BY_ID, id)
const appUserByAppKeyCount = (query) => fetchALL(query)
const appUserByAppKeyCountGender = (query) => fetchALL(query)
const appUserByAppKeyUsers = (key) => fetchALL(APP_USER_BY_APP_KEY_USERS, key)

const getByName = (offset, name) => {
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
            b.user_name ilike '${name}'
        ORDER BY
            a.app_user_id DESC
        OFFSET
            ${offset}
        LIMIT 50;
    `

    return fetchALL(APP_USER_BY_NAME)
};

const getByPhone = (offset, phone) => {
    const BY_PHONE = `
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
        b.user_phone like '${phone}'
    ORDER BY
        a.app_user_id DESC
    OFFSET
        ${offset}
    LIMIT 50;
    `;

    return fetchALL(BY_PHONE)
};

const getByKey = (offset, key) => {

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
        a.app_key ilike '${key}'
    ORDER BY
        a.app_user_id DESC
    OFFSET
        ${offset}
    LIMIT 50;
    `

    return fetchALL(BY_KEY)
}

const getAppUsersByLimitPagination = (offset) => {

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
        OFFSET
            ${offset}
        LIMIT 50;
    `;

    return fetchALL(ALL_APP_USER)
}

const getAppUsersByLimitPaginationBySort = (offset, sort) => {

    const ALL_APP_USER_BY_SORT = `
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
            ${sort}
        OFFSET
            ${offset}
        LIMIT 50;
    `;

    return fetchALL(ALL_APP_USER_BY_SORT)
}

const usersAppsCount = () => {
    const USERS_APPS_COUNT = `
        select 
            user_id, count(app_key) 
        from 
            apps_user 
        group by 
            user_id 
        order by 
            user_id desc;
    `;

    return fetchALL(USERS_APPS_COUNT)
}

module.exports = {
    getAllAppUser,
    getAppUsersByLimitPagination,
    getAppUsersByLimitPaginationBySort,
    getByName,
    getById,
    getByPhone,
    getByKey,
    getAppUserByUserIdKEy,
    changeProVersion,
    updateUserInterested,
    getAppUserByLimitNext,
    getAppUserByLimitPrev,
    appUserByAppKeyCount,
    appUserByAppKeyUsers,
    appUserByAppKeyCountGender,
    usersAppsCount
}

