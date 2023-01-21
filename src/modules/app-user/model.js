const { fetch, fetchALL } = require("../../lib/postgres");

const ALL_APP_USER = `
    select 
        *, to_char(app_user_install_date, 'HH24:MM/MM.DD.YYYY')
     from
            apps_user a
     inner join
            users b
    on a.user_id = b.user_id
    inner join
            apps c
    on a.app_key = c.app_key
    ORDER BY
        a.app_user_id DESC;
`

const APP_USER_BY_NAME = `
    select
        *, to_char(app_user_install_date, 'HH24:MM/MM.DD.YYYY')
    from
        apps_user a
    inner join
        users b
    on a.user_id = b.user_id
    inner join
        apps c
    on a.app_key = c.app_key
    where 
        b.user_name like $1
    ORDER BY
        a.app_user_id DESC;
`

const BY_ID = `
    select
        *, to_char(app_user_install_date, 'HH24:MM/MM.DD.YYYY')
    from
        apps_user a
    inner join
        users b
    on a.user_id = b.user_id
    inner join
        apps c
    on a.app_key = c.app_key
    where 
        b.user_id = $1
    ORDER BY
        a.app_user_id DESC;
`;

const BY_KEY = `
    select
        *, to_char(app_user_install_date, 'HH24:MM/MM.DD.YYYY')
    from
        apps_user a
    inner join
        users b
    on a.user_id = b.user_id
    inner join
        apps c
    on a.app_key = c.app_key
    where 
        c.app_key like $1
    ORDER BY
        a.app_user_id DESC;
`

const USER_ID_BY_KEY = `
    select
        *, to_char(app_user_install_date, 'HH24:MM/MM.DD.YYYY')
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

const getAllAppUser = () => fetchALL(ALL_APP_USER)
const getByName = (name) => fetchALL(APP_USER_BY_NAME, name)
const getById = (id) => fetchALL(BY_ID, id)
const getByKey = (key) => fetchALL(BY_KEY, key)
const getAppUserByUserIdKEy = (userId, key) => fetch(USER_ID_BY_KEY, userId, key)
const changeProVersion = (id, pro_v) => fetch(UPDATE_APP_USER_PRO, id, pro_v)

module.exports = {
    getAllAppUser,
    getByName,
    getById,
    getByKey,
    getAppUserByUserIdKEy,
    changeProVersion
}

