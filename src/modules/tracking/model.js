const { fetchALL } = require("../../lib/postgres");

const ALL_TRACKING_USERS = `
    select 
    *, to_char(new_tracking_user_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
    from
        tracking_users a
    inner join
        users b
    on a.user_id = b.user_id
    inner join
        apps c
    on a.app_key = c.app_key
    ORDER BY
        a.tracking_user_id DESC;
`;

const getTrackingUsers = () => fetchALL(ALL_TRACKING_USERS)

module.exports = {
    getTrackingUsers
}   