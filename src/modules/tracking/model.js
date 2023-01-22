const { fetchALL } = require("../../lib/postgres");

const ALL_TRACKING_USERS = `
    SELECT
        *,  to_char(new_tracking_user_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
    FROM
        tracking_users
    ORDER BY
        tracking_user_id DESC;
`;

const getTrackingUsers = () => fetchALL(ALL_TRACKING_USERS)

module.exports = {
    getTrackingUsers
}