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

const USER_TRACKING_FILTER_DAYS_7 = `
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
        new_tracking_user_create_date > current_date - interval '7 days'
    ORDER BY
        a.tracking_user_id DESC
    LIMIT 50;
`;

const USER_TRACKING_FILTER_DAYS_7_BY_KEY = `
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
        a.app_key = $1 and new_tracking_user_create_date > current_date - interval '7 days'
    ORDER BY
        a.tracking_user_id DESC
    LIMIT 50;
`;

const USER_TRACKING_FILTER_DAYS_7_LIMIT_NEXT = `
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
        a.tracking_user_id < $1 and new_tracking_user_create_date > current_date - interval '7 days'
    ORDER BY
        a.tracking_user_id DESC
    LIMIT 50;
`;

const USER_TRACKING_FILTER_DAYS_7_LIMIT_PREV = `
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
        a.tracking_user_id > $1 and new_tracking_user_create_date > current_date - interval '7 days'
    ORDER BY
        a.tracking_user_id DESC
    LIMIT 50;
`;

const USER_TRACKING_FILTER_DAYS_7_BY_KEY_LIMIT_NEXT = `
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
        a.tracking_user_id < $1 and a.app_key = $2 and new_tracking_user_create_date > current_date - interval '7 days'
    ORDER BY
        a.tracking_user_id DESC
    LIMIT 50;
`;

const USER_TRACKING_FILTER_DAYS_7_BY_KEY_LIMIT_PREV = `
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
        a.tracking_user_id > $1 and a.app_key = $2 and new_tracking_user_create_date > current_date - interval '7 days'
    ORDER BY
        a.tracking_user_id DESC
    LIMIT 50;
`;

const USER_TRACKING_FILTER_DAYS_14 = `
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
        new_tracking_user_create_date > current_date - interval '14 days'
    ORDER BY
        a.tracking_user_id DESC
    LIMIT 50;
`;

const USER_TRACKING_FILTER_DAYS_14_BY_KEY = `
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
        a.app_key = $1 and new_tracking_user_create_date > current_date - interval '14 days'
    ORDER BY
        a.tracking_user_id DESC
    LIMIT 50;
`;

const USER_TRACKING_FILTER_DAYS_14_LIMIT_NEXT = `
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
        a.tracking_user_id < $1 and new_tracking_user_create_date > current_date - interval '14 days'
    ORDER BY
        a.tracking_user_id DESC
    LIMIT 50;
`;

const USER_TRACKING_FILTER_DAYS_14_LIMIT_PREV = `
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
        a.tracking_user_id > $1 and new_tracking_user_create_date > current_date - interval '14 days'
    ORDER BY
        a.tracking_user_id DESC
    LIMIT 50;
`;

const USER_TRACKING_FILTER_DAYS_14_BY_KEY_LIMIT_NEXT = `
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
        a.tracking_user_id < $1 and a.app_key = $2 and new_tracking_user_create_date > current_date - interval '14 days'
    ORDER BY
        a.tracking_user_id DESC
    LIMIT 50;
`;

const USER_TRACKING_FILTER_DAYS_14_BY_KEY_LIMIT_PREV = `
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
        a.tracking_user_id > $1 and a.app_key = $2 and new_tracking_user_create_date > current_date - interval '14 days'
    ORDER BY
        a.tracking_user_id DESC
    LIMIT 50;
`;

const USER_TRACKING_FILTER_DAYS_10 = `
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
        new_tracking_user_create_date > current_date - interval '10 days'
    ORDER BY
        a.tracking_user_id DESC
    LIMIT 50;
`;

const USER_TRACKING_FILTER_DAYS_10_BY_KEY = `
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
        a.app_key = $1 and new_tracking_user_create_date > current_date - interval '10 days'
    ORDER BY
        a.tracking_user_id DESC
    LIMIT 50;
`;

const USER_TRACKING_FILTER_DAYS_10_LIMIT_NEXT = `
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
        a.tracking_user_id < $1 and new_tracking_user_create_date > current_date - interval '10 days'
    ORDER BY
        a.tracking_user_id DESC
    LIMIT 50;
`;

const USER_TRACKING_FILTER_DAYS_10_LIMIT_PREV = `
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
        a.tracking_user_id > $1 and new_tracking_user_create_date > current_date - interval '10 days'
    ORDER BY
        a.tracking_user_id DESC
    LIMIT 50;
`;

const USER_TRACKING_FILTER_DAYS_10_BY_KEY_LIMIT_NEXT = `
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
        a.tracking_user_id < $1 and a.app_key = $2 and new_tracking_user_create_date > current_date - interval '10 days'
    ORDER BY
        a.tracking_user_id DESC
    LIMIT 50;
`;

const USER_TRACKING_FILTER_DAYS_10_BY_KEY_LIMIT_PREV = `
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
        a.tracking_user_id > $1 and a.app_key = $2 and new_tracking_user_create_date > current_date - interval '10 days'
    ORDER BY
        a.tracking_user_id DESC
    LIMIT 50;
`;

const USER_TRACKING_FILTER_DAYS_30 = `
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
        new_tracking_user_create_date > current_date - interval '30 days'
    ORDER BY
        a.tracking_user_id DESC
    LIMIT 50;
`;

const USER_TRACKING_FILTER_DAYS_30_BY_KEY = `
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
        a.app_key = $1 and new_tracking_user_create_date > current_date - interval '30 days'
    ORDER BY
        a.tracking_user_id DESC
    LIMIT 50;
`;

const USER_TRACKING_FILTER_DAYS_30_LIMIT_NEXT = `
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
        a.tracking_user_id < $1 and new_tracking_user_create_date > current_date - interval '30 days'
    ORDER BY
        a.tracking_user_id DESC
    LIMIT 50;
`;

const USER_TRACKING_FILTER_DAYS_30_LIMIT_PREV = `
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
        a.tracking_user_id > $1 and new_tracking_user_create_date > current_date - interval '30 days'
    ORDER BY
        a.tracking_user_id DESC
    LIMIT 50;
`;

const USER_TRACKING_FILTER_DAYS_30_BY_KEY_LIMIT_NEXT = `
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
        a.tracking_user_id < $1 and a.app_key = $2 and new_tracking_user_create_date > current_date - interval '30 days'
    ORDER BY
        a.tracking_user_id DESC
    LIMIT 50;
`;

const USER_TRACKING_FILTER_DAYS_30_BY_KEY_LIMIT_PREV = `
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
        a.tracking_user_id > $1 and a.app_key = $2 and new_tracking_user_create_date > current_date - interval '30 days'
    ORDER BY
        a.tracking_user_id DESC
    LIMIT 50;
`;

const USER_TRACKING_FILTER_DAYS_60 = `
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
        new_tracking_user_create_date > current_date - interval '60 days'
    ORDER BY
        a.tracking_user_id DESC
    LIMIT 50;
`;

const USER_TRACKING_FILTER_DAYS_60_BY_KEY = `
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
        a.app_key = $1 and new_tracking_user_create_date > current_date - interval '60 days'
    ORDER BY
        a.tracking_user_id DESC
    LIMIT 50;
`;

const USER_TRACKING_FILTER_DAYS_60_LIMIT_NEXT = `
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
        a.tracking_user_id < $1 and new_tracking_user_create_date > current_date - interval '60 days'
    ORDER BY
        a.tracking_user_id DESC
    LIMIT 50;
`;

const USER_TRACKING_FILTER_DAYS_60_LIMIT_PREV = `
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
        a.tracking_user_id > $1 and new_tracking_user_create_date > current_date - interval '60 days'
    ORDER BY
        a.tracking_user_id DESC
    LIMIT 50;
`;

const USER_TRACKING_FILTER_DAYS_60_BY_KEY_LIMIT_NEXT = `
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
        a.tracking_user_id < $1 and a.app_key = $2 and new_tracking_user_create_date > current_date - interval '60 days'
    ORDER BY
        a.tracking_user_id DESC
    LIMIT 50;
`;

const USER_TRACKING_FILTER_DAYS_60_BY_KEY_LIMIT_PREV = `
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
        a.tracking_user_id > $1 and a.app_key = $2 and new_tracking_user_create_date > current_date - interval '60 days'
    ORDER BY
        a.tracking_user_id DESC
    LIMIT 50;
`;

const USER_TRACKING_FILTER_DAYS_3 = `
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
        new_tracking_user_create_date > current_date - interval '3 days'
    ORDER BY
        a.tracking_user_id DESC
    LIMIT 50;
`;

const USER_TRACKING_FILTER_DAYS_3_BY_KEY = `
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
        a.app_key = $1 and new_tracking_user_create_date > current_date - interval '3 days'
    ORDER BY
        a.tracking_user_id DESC
    LIMIT 50;
`;

const USER_TRACKING_FILTER_DAYS_3_LIMIT_NEXT = `
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
        a.tracking_user_id < $1 and new_tracking_user_create_date > current_date - interval '3 days'
    ORDER BY
        a.tracking_user_id DESC
    LIMIT 50;
`;

const USER_TRACKING_FILTER_DAYS_3_LIMIT_PREV = `
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
        a.tracking_user_id > $1 and new_tracking_user_create_date > current_date - interval '3 days'
    ORDER BY
        a.tracking_user_id DESC
    LIMIT 50;
`;

const USER_TRACKING_FILTER_DAYS_3_BY_KEY_LIMIT_NEXT = `
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
        a.tracking_user_id < $1 and a.app_key = $2 and new_tracking_user_create_date > current_date - interval '3 days'
    ORDER BY
        a.tracking_user_id DESC
    LIMIT 50;
`;

const USER_TRACKING_FILTER_DAYS_3_BY_KEY_LIMIT_PREV = `
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
        a.tracking_user_id > $1 and a.app_key = $2 and new_tracking_user_create_date > current_date - interval '3 days'
    ORDER BY
        a.tracking_user_id DESC
    LIMIT 50;
`;

const getTrackingUsers = (userId, key) => fetchALL(ALL_TRACKING_USERS, userId, key)
const userTrackingLimitNext = (userId, id, key) => fetchALL(TRACKING_USERS_LIMIT_NEXT, userId, id, key)
const userTrackingLimitPrev = (userId, id, key) => fetchALL(TRACKING_USERS_LIMIT_PREV, userId, id, key)
const userTrackingFilterDay7 = () => fetchALL(USER_TRACKING_FILTER_DAYS_7)
const userTrackingFilterDay7ByKey = (key) => fetchALL(USER_TRACKING_FILTER_DAYS_7_BY_KEY, key)
const userTrackingFilterDay7LimitNext = (id) => fetchALL(USER_TRACKING_FILTER_DAYS_7_LIMIT_NEXT, id)
const userTrackingFilterDay7LimitPrev = (id) => fetchALL(USER_TRACKING_FILTER_DAYS_7_LIMIT_PREV, id)
const userTrackingFilterDay7LimitNextByKey = (id, key) => fetchALL(USER_TRACKING_FILTER_DAYS_7_BY_KEY_LIMIT_NEXT, id, key)
const userTrackingFilterDay7LimitPrevByKey = (id, key) => fetchALL(USER_TRACKING_FILTER_DAYS_7_BY_KEY_LIMIT_PREV, id, key)

const userTrackingFilterDay14 = () => fetchALL(USER_TRACKING_FILTER_DAYS_14)
const userTrackingFilterDay14ByKey = (key) => fetchALL(USER_TRACKING_FILTER_DAYS_14_BY_KEY, key)
const userTrackingFilterDay14LimitNext = (id) => fetchALL(USER_TRACKING_FILTER_DAYS_14_LIMIT_NEXT, id)
const userTrackingFilterDay14LimitPrev = (id) => fetchALL(USER_TRACKING_FILTER_DAYS_14_LIMIT_PREV, id)
const userTrackingFilterDay14LimitNextByKey = (id, key) => fetchALL(USER_TRACKING_FILTER_DAYS_14_BY_KEY_LIMIT_NEXT, id, key)
const userTrackingFilterDay14LimitPrevByKey = (id, key) => fetchALL(USER_TRACKING_FILTER_DAYS_14_BY_KEY_LIMIT_PREV, id, key)

const userTrackingFilterDay10 = () => fetchALL(USER_TRACKING_FILTER_DAYS_10)
const userTrackingFilterDay10ByKey = (key) => fetchALL(USER_TRACKING_FILTER_DAYS_10_BY_KEY, key)
const userTrackingFilterDay10LimitNext = (id) => fetchALL(USER_TRACKING_FILTER_DAYS_10_LIMIT_NEXT, id)
const userTrackingFilterDay10LimitPrev = (id) => fetchALL(USER_TRACKING_FILTER_DAYS_10_LIMIT_PREV, id)
const userTrackingFilterDay10LimitNextByKey = (id, key) => fetchALL(USER_TRACKING_FILTER_DAYS_10_BY_KEY_LIMIT_NEXT, id, key)
const userTrackingFilterDay10LimitPrevByKey = (id, key) => fetchALL(USER_TRACKING_FILTER_DAYS_10_BY_KEY_LIMIT_PREV, id, key)

const userTrackingFilterDay30 = () => fetchALL(USER_TRACKING_FILTER_DAYS_30)
const userTrackingFilterDay30ByKey = (key) => fetchALL(USER_TRACKING_FILTER_DAYS_30_BY_KEY, key)
const userTrackingFilterDay30LimitNext = (id) => fetchALL(USER_TRACKING_FILTER_DAYS_30_LIMIT_NEXT, id)
const userTrackingFilterDay30LimitPrev = (id) => fetchALL(USER_TRACKING_FILTER_DAYS_30_LIMIT_PREV, id)
const userTrackingFilterDay30LimitNextByKey = (id, key) => fetchALL(USER_TRACKING_FILTER_DAYS_30_BY_KEY_LIMIT_NEXT, id, key)
const userTrackingFilterDay30LimitPrevByKey = (id, key) => fetchALL(USER_TRACKING_FILTER_DAYS_30_BY_KEY_LIMIT_PREV, id, key)

const userTrackingFilterDay60 = () => fetchALL(USER_TRACKING_FILTER_DAYS_60)
const userTrackingFilterDay60ByKey = (key) => fetchALL(USER_TRACKING_FILTER_DAYS_60_BY_KEY, key)
const userTrackingFilterDay60LimitNext = (id) => fetchALL(USER_TRACKING_FILTER_DAYS_60_LIMIT_NEXT, id)
const userTrackingFilterDay60LimitPrev = (id) => fetchALL(USER_TRACKING_FILTER_DAYS_60_LIMIT_PREV, id)
const userTrackingFilterDay60LimitNextByKey = (id, key) => fetchALL(USER_TRACKING_FILTER_DAYS_60_BY_KEY_LIMIT_NEXT, id, key)
const userTrackingFilterDay60LimitPrevByKey = (id, key) => fetchALL(USER_TRACKING_FILTER_DAYS_60_BY_KEY_LIMIT_PREV, id, key)

const userTrackingFilterDay3 = () => fetchALL(USER_TRACKING_FILTER_DAYS_3)
const userTrackingFilterDay3ByKey = (key) => fetchALL(USER_TRACKING_FILTER_DAYS_3_BY_KEY, key)
const userTrackingFilterDay3LimitNext = (id) => fetchALL(USER_TRACKING_FILTER_DAYS_3_LIMIT_NEXT, id)
const userTrackingFilterDay3LimitPrev = (id) => fetchALL(USER_TRACKING_FILTER_DAYS_3_LIMIT_PREV, id)
const userTrackingFilterDay3LimitNextByKey = (id, key) => fetchALL(USER_TRACKING_FILTER_DAYS_3_BY_KEY_LIMIT_NEXT, id, key)
const userTrackingFilterDay3LimitPrevByKey = (id, key) => fetchALL(USER_TRACKING_FILTER_DAYS_3_BY_KEY_LIMIT_PREV, id, key)

module.exports = {
    getTrackingUsers,
    userTrackingLimitNext,
    userTrackingLimitPrev,
    userTrackingFilterDay7,
    userTrackingFilterDay7ByKey,
    userTrackingFilterDay7LimitNext,
    userTrackingFilterDay7LimitPrev,
    userTrackingFilterDay7LimitNextByKey,
    userTrackingFilterDay7LimitPrevByKey,
    userTrackingFilterDay14,
    userTrackingFilterDay14ByKey,
    userTrackingFilterDay14LimitNext,
    userTrackingFilterDay14LimitPrev,
    userTrackingFilterDay14LimitNextByKey,
    userTrackingFilterDay14LimitPrevByKey,
    userTrackingFilterDay10,
    userTrackingFilterDay10ByKey,
    userTrackingFilterDay10LimitNext,
    userTrackingFilterDay10LimitPrev,
    userTrackingFilterDay10LimitNextByKey,
    userTrackingFilterDay10LimitPrevByKey,
    userTrackingFilterDay30,
    userTrackingFilterDay30ByKey,
    userTrackingFilterDay30LimitNext,
    userTrackingFilterDay30LimitPrev,
    userTrackingFilterDay30LimitNextByKey,
    userTrackingFilterDay30LimitPrevByKey,
    userTrackingFilterDay60,
    userTrackingFilterDay60ByKey,
    userTrackingFilterDay60LimitNext,
    userTrackingFilterDay60LimitPrev,
    userTrackingFilterDay60LimitNextByKey,
    userTrackingFilterDay60LimitPrevByKey,
    userTrackingFilterDay3,
    userTrackingFilterDay3ByKey,
    userTrackingFilterDay3LimitNext,
    userTrackingFilterDay3LimitPrev,
    userTrackingFilterDay3LimitNextByKey,
    userTrackingFilterDay3LimitPrevByKey,
}   