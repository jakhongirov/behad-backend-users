const { fetchALL } = require("../../lib/postgres");

const USERS_TACKING_COUNT = `
    SELECT 
        user_id, count(user_id) 
    FROM 
        tracking_users 
    group by 
        user_id 
    order by 
        user_id desc;
`;

const getTrackingUsers = (userId, key, offset) => {
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
        OFFSET ${offset}
        LIMIT 50;
    `;

    return fetchALL(ALL_TRACKING_USERS, userId, key)
};
const usersTrackingFilter = (offset, day) => {
    const USER_TRACKING_FILTER_DAYS = `
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
            new_tracking_user_create_date > current_date - interval '${day} days'
        ORDER BY
            a.tracking_user_id DESC
        OFFSET ${offset}
        LIMIT 50;
    `;

    return fetchALL(USER_TRACKING_FILTER_DAYS)
}
const usersTrackingFilterBykey = (offset, day, key) => {
    const USER_TRACKING_FILTER_DAYS_BY_KEY = `
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
             a.app_key =$1  and new_tracking_user_create_date > current_date - interval '${day} days'
        ORDER BY
            a.tracking_user_id DESC
        OFFSET ${offset}
        LIMIT 50;
    `;

    return fetchALL(USER_TRACKING_FILTER_DAYS_BY_KEY, key)
}
const usersTrackingCount = () => fetchALL(USERS_TACKING_COUNT)

module.exports = {
    getTrackingUsers,
    usersTrackingFilter,
    usersTrackingFilterBykey,
    usersTrackingCount
}   