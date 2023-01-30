const { fetchALL } = require("../../lib/postgres");

const ALL_TRACKING_USERS = `
    select 
    *, to_char(new_tracking_user_create_date at time zone 'Asia/Tashkent', 'HH24:MI/DD.MM.YYYY')
    from
        tracking_users a
    inner join
        users b
    on 
        a.user_id = b.user_id
    inner join
        apps c
    on 
        a.app_key = c.app_key
    WHERE
        a.user_id = $1 and a.app_key = $2
    ORDER BY
        a.tracking_user_id DESC
    LIMIT 50;
`;

const TRACKING_USERS_LIMIT_NEXT = `
    select 
    *, to_char(new_tracking_user_create_date at time zone 'Asia/Tashkent', 'HH24:MI/DD.MM.YYYY')
    from
        tracking_users a
    inner join
        users b
    on 
        a.user_id = b.user_id
    inner join
        apps c
    on 
        a.app_key = c.app_key
    WHERE
        a.user_id = $1 and a.tracking_user_id < $2 and a.app_key = $3 
    ORDER BY
        a.tracking_user_id DESC
    LIMIT 50;
`;

const TRACKING_USERS_LIMIT_PREV = `
    select 
    *, to_char(new_tracking_user_create_date at time zone 'Asia/Tashkent', 'HH24:MI/DD.MM.YYYY')
    from
        tracking_users a
    inner join
        users b
    on 
        a.user_id = b.user_id
    inner join
        apps c
    on 
        a.app_key = c.app_key
    WHERE
        a.user_id = $1 and tracking_user_id > $2 and a.app_key = $3
    ORDER BY
        a.tracking_user_id DESC
    LIMIT 50;
`;


const getTrackingUsers = (userId, key) => fetchALL(ALL_TRACKING_USERS, userId, key)
const userTrackingLimitNext = (userId, id, key) => fetchALL(TRACKING_USERS_LIMIT_NEXT, userId, id, key)
const userTrackingLimitPrev = (userId, id, key) => fetchALL(TRACKING_USERS_LIMIT_PREV, userId, id, key)

module.exports = {
    getTrackingUsers,
    userTrackingLimitNext,
    userTrackingLimitPrev
}   