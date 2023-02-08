const { fetchALL } = require("../../lib/postgres");

const USER_TRACKKING_COUNT_60 = `
    SELECT 
        b.user_id, b.user_name, count(a.tracking_user_id)::int >= 50 as check, count(a.tracking_user_id)::int >= 50 as check_1, count(a.tracking_user_id)::int
    FROM 
        tracking_users a
    INNER JOIN 
        users b
    ON 
        a.user_id = b.user_id
    GROUP BY 
        b.user_id, b.user_name
    order by 
        count desc
    LIMIT 50;
`;

const USER_TRACKKING_COUNT_50 = `
    SELECT 
        b.user_id, b.user_name, count(a.tracking_user_id)::int >= 30 as check, count(a.tracking_user_id)::int <= 50 as check_1, count(a.tracking_user_id)::int
    FROM 
        tracking_users a
    INNER JOIN 
        users b
    ON 
        a.user_id = b.user_id
    GROUP BY 
        b.user_id, b.user_name
    order by 
        count desc
    LIMIT 50;
`;

const USER_TRACKKING_COUNT_30 = `
    SELECT 
        b.user_id, b.user_name, count(a.tracking_user_id)::int >= 10 as check, count(a.tracking_user_id)::int <= 30 as check_1, count(a.tracking_user_id)::int
    FROM 
        tracking_users a
    INNER JOIN 
        users b
    ON 
        a.user_id = b.user_id
    GROUP BY 
        b.user_id, b.user_name
    order by 
        count desc
    LIMIT 50;
`;

const USER_TRACKKING_COUNT_10 = `
    SELECT 
        b.user_id, b.user_name, count(a.tracking_user_id)::int <= 10 as check, count(a.tracking_user_id)::int <= 10 as check_1, count(a.tracking_user_id)::int
    FROM 
        tracking_users a
    INNER JOIN 
        users b
    ON 
        a.user_id = b.user_id
    GROUP BY 
        b.user_id, b.user_name
    order by 
        count desc
    LIMIT 50;
`;

const USER_TRACKKING_COUNT_60_BY_KEY = `
    SELECT 
        b.user_id, b.user_name, count(a.tracking_user_id)::int >= 50 as check, count(a.tracking_user_id)::int >= 50 as check_1, count(a.tracking_user_id)::int    
    FROM
        tracking_users a
    INNER JOIN 
        users b
    ON 
        a.user_id = b.user_id
    where 
        a.app_key = $1
    GROUP BY 
        b.user_id, b.user_name
    order by 
        count desc
    LIMIT 50;
`;

const USER_TRACKKING_COUNT_50_BY_KEY = `
    SELECT 
        b.user_id, b.user_name, count(a.tracking_user_id)::int >= 30 as check, count(a.tracking_user_id)::int <= 50 as check_1, count(a.tracking_user_id)::int
    FROM 
        tracking_users a
    INNER JOIN 
        users b
    ON 
        a.user_id = b.user_id
    where 
        a.app_key = $1
    GROUP BY 
        b.user_id, b.user_name
    order by 
        count desc
    LIMIT 50;
`;

const USER_TRACKKING_COUNT_30_BY_KEY = `
    SELECT 
        b.user_id, b.user_name, count(a.tracking_user_id)::int >= 10 as check, count(a.tracking_user_id)::int <= 30 as check_1, count(a.tracking_user_id)::int
    FROM 
        tracking_users a
    INNER JOIN 
        users b
    ON 
        a.user_id = b.user_id
    where 
        a.app_key = $1
    GROUP BY 
        b.user_id, b.user_name
    order by 
        count desc
    LIMIT 50;
`;

const USER_TRACKKING_COUNT_10_BY_KEY = `
    SELECT 
        b.user_id, b.user_name, count(a.tracking_user_id)::int <= 10 as check, count(a.tracking_user_id)::int <= 10 as check_1, count(a.tracking_user_id)::int
    FROM 
        tracking_users a
    INNER JOIN 
        users b
    ON 
        a.user_id = b.user_id
    where 
        a.app_key = $1
    GROUP BY 
        b.user_id, b.user_name
    order by 
        count desc
    LIMIT 50;
`;

const USER_TRACKKING_COUNT_60_BY_KEY_LIMIT_NEXT = `
    SELECT 
        b.user_id, b.user_name, count(a.tracking_user_id)::int >= 50 as check, count(a.tracking_user_id)::int >= 50 as check_1, count(a.tracking_user_id)::int
    FROM 
        tracking_users a
    INNER JOIN 
        users b
    ON 
        a.user_id = b.user_id
    where 
        a.app_key = $1 and tracking_user_id < $2
    GROUP BY 
        b.user_id, b.user_name
    order by 
        count desc
    LIMIT 50;
`;

const USER_TRACKKING_COUNT_50_BY_KEY_LIMIT_NEXT = `
    SELECT 
        b.user_id, b.user_name, count(a.tracking_user_id)::int >= 30 as check, count(a.tracking_user_id)::int <= 50 as check_1, count(a.tracking_user_id)::int
    FROM 
        tracking_users a
    INNER JOIN 
        users b
    ON 
        a.user_id = b.user_id
    where 
        a.app_key = $1 and tracking_user_id < $2
    GROUP BY 
        b.user_id, b.user_name
    order by 
        count desc
    LIMIT 50;
`;

const USER_TRACKKING_COUNT_30_BY_KEY_LIMIT_NEXT = `
    SELECT 
        b.user_id, b.user_name, count(a.tracking_user_id)::int >= 10 as check, count(a.tracking_user_id)::int <= 30 as check_1, count(a.tracking_user_id)::int
    FROM 
        tracking_users a
    INNER JOIN 
        users b
    ON 
        a.user_id = b.user_id
    where 
        a.app_key = $1 and tracking_user_id < $2
    GROUP BY 
        b.user_id, b.user_name
    order by 
        count desc
    LIMIT 50;
`;

const USER_TRACKKING_COUNT_10_BY_KEY_LIMIT_NEXT = `
    SELECT 
        b.user_id, b.user_name, count(a.tracking_user_id)::int <= 10 as check, count(a.tracking_user_id)::int <= 10 as check_1, count(a.tracking_user_id)::int 
    FROM 
        tracking_users a
    INNER JOIN 
        users b
    ON 
        a.user_id = b.user_id
    where 
        a.app_key = $1 and tracking_user_id < $2
    GROUP BY 
        b.user_id, b.user_name
    order by 
        count desc
    LIMIT 50;
`;

const USER_TRACKKING_COUNT_60_BY_KEY_LIMIT_PREV = `
    SELECT 
        b.user_id, b.user_name, count(a.tracking_user_id)::int >= 50 as check, count(a.tracking_user_id)::int >= 50 as check_1, count(a.tracking_user_id)::int
    FROM 
        tracking_users a
    INNER JOIN 
        users b
    ON 
        a.user_id = b.user_id
    where 
        a.app_key = $1 and tracking_user_id > $2
    GROUP BY 
        b.user_id, b.user_name
    order by 
        count desc
    LIMIT 50;
`;

const USER_TRACKKING_COUNT_50_BY_KEY_LIMIT_PREV = `
    SELECT 
        b.user_id, b.user_name, count(a.tracking_user_id)::int >= 30 as check, count(a.tracking_user_id)::int <= 50 as check_1, count(a.tracking_user_id)::int  
    FROM 
        tracking_users a
    INNER JOIN 
        users b
    ON 
        a.user_id = b.user_id
    where 
        a.app_key = $1 and tracking_user_id > $2
    GROUP BY 
        b.user_id, b.user_name
    order by 
        count desc
    LIMIT 50;
`;

const USER_TRACKKING_COUNT_30_BY_KEY_LIMIT_PREV = `
    SELECT 
        b.user_id, b.user_name, count(a.tracking_user_id)::int >= 10 as check, count(a.tracking_user_id)::int <= 30 as check_1, count(a.tracking_user_id)::int   
    FROM 
        tracking_users a
    INNER JOIN 
        users b
    ON 
        a.user_id = b.user_id
    where 
        a.app_key = $1 and tracking_user_id > $2
    GROUP BY 
        b.user_id, b.user_name
    order by 
        count desc
    LIMIT 50;
`;

const USER_TRACKKING_COUNT_10_BY_KEY_LIMIT_PREV = `
    SELECT 
        b.user_id, b.user_name, count(a.tracking_user_id)::int <= 10 as check, count(a.tracking_user_id)::int <= 10 as check_1, count(a.tracking_user_id)::int
    FROM 
        tracking_users a
    INNER JOIN 
        users b
    ON 
        a.user_id = b.user_id
    where 
        a.app_key = $1 and tracking_user_id > $2
    GROUP BY 
        b.user_id, b.user_name
    order by 
        count desc
    LIMIT 50;
`;

const USER_TRACKKING_COUNT_10_LIMIT_NEXT = `
    SELECT 
        b.user_id, b.user_name, count(a.tracking_user_id)::int <= 10 as check, count(a.tracking_user_id)::int <= 10 as check_1, count(a.tracking_user_id)::int  
    FROM 
        tracking_users a
    INNER JOIN 
        users b
    ON 
        a.user_id = b.user_id
    where 
        tracking_user_id < $1
    GROUP BY 
        b.user_id, b.user_name
    order by 
        count desc
    LIMIT 50;
`;

const USER_TRACKKING_COUNT_30_LIMIT_NEXT = `
    SELECT 
        b.user_id, b.user_name, count(a.tracking_user_id)::int >= 10 as check, count(a.tracking_user_id)::int <= 30 as check_1, count(a.tracking_user_id)::int
    FROM 
        tracking_users a
    INNER JOIN 
        users b
    ON 
        a.user_id = b.user_id
    where 
        tracking_user_id < $1
    GROUP BY 
        b.user_id, b.user_name
    order by 
        count desc
    LIMIT 50;
`;

const USER_TRACKKING_COUNT_50_LIMIT_NEXT = `
    SELECT 
        b.user_id, b.user_name, count(a.tracking_user_id)::int >= 30 as check, count(a.tracking_user_id)::int <= 50 as check_1, count(a.tracking_user_id)::int
    FROM 
        tracking_users a
    INNER JOIN 
        users b
    ON 
        a.user_id = b.user_id
    where 
        tracking_user_id < $1
    GROUP BY 
        b.user_id, b.user_name
    order by 
        count desc
    LIMIT 50;
`;

const USER_TRACKKING_COUNT_60_LIMIT_NEXT = `
    SELECT 
        b.user_id, b.user_name, count(a.tracking_user_id)::int >= 50 as check, count(a.tracking_user_id)::int >= 50 as check_1, count(a.tracking_user_id)::int
    FROM 
        tracking_users a
    INNER JOIN 
        users b
    ON 
        a.user_id = b.user_id
    where 
        tracking_user_id < $2
    GROUP BY 
        b.user_id, b.user_name
    order by 
        count desc
    LIMIT 50;
`;

const USER_TRACKKING_COUNT_10_LIMIT_PREV = `
    SELECT 
        b.user_id, b.user_name, count(a.tracking_user_id)::int <= 10 as check, count(a.tracking_user_id)::int <= 10 as check_1, count(a.tracking_user_id)::int
    FROM 
        tracking_users a
    INNER JOIN 
        users b
    ON 
        a.user_id = b.user_id
    where 
        tracking_user_id > $1
    GROUP BY 
        b.user_id, b.user_name
    order by 
        count desc
    LIMIT 50;
`;

const USER_TRACKKING_COUNT_30_LIMIT_PREV = `
    SELECT 
        b.user_id, b.user_name, count(a.tracking_user_id)::int >= 10 as check, count(a.tracking_user_id)::int <= 30 as check_1, count(a.tracking_user_id)::int
    FROM 
        tracking_users a
    INNER JOIN 
        users b
    ON 
        a.user_id = b.user_id
    where 
        tracking_user_id > $1
    GROUP BY 
        b.user_id, b.user_name
    order by 
        count desc
    LIMIT 50;
`;

const USER_TRACKKING_COUNT_50_LIMIT_PREV = `
    SELECT 
        b.user_id, b.user_name, count(a.tracking_user_id)::int >= 30 as check, count(a.tracking_user_id)::int <= 50 as check_1, count(a.tracking_user_id)::int
    FROM 
        tracking_users a
    INNER JOIN 
        users b
    ON 
        a.user_id = b.user_id
    where 
        tracking_user_id > $1
    GROUP BY 
        b.user_id, b.user_name
    order by 
        count desc
    LIMIT 50;
`;

const USER_TRACKKING_COUNT_60_LIMIT_PREV = `
    SELECT 
        b.user_id,   b.user_name, count(a.tracking_user_id)::int >= 50 as check, count(a.tracking_user_id)::int >= 50 as check_1, count(a.tracking_user_id)::int    
    FROM 
        tracking_users a
    INNER JOIN 
        users b
    ON 
        a.user_id = b.user_id
    where 
        tracking_user_id > $1
    GROUP BY 
    
        b.user_id, b.user_name
    order by 
        count desc
    LIMIT 50;
`;

const userTrackingCount60 = () => fetchALL(USER_TRACKKING_COUNT_60)
const userTrackingCount50 = () => fetchALL(USER_TRACKKING_COUNT_50)
const userTrackingCount30 = () => fetchALL(USER_TRACKKING_COUNT_30)
const userTrackingCount10 = () => fetchALL(USER_TRACKKING_COUNT_10)

const userTrackingCount60ByKey = (key) => fetchALL(USER_TRACKKING_COUNT_60_BY_KEY, key)
const userTrackingCount50ByKey = (key) => fetchALL(USER_TRACKKING_COUNT_50_BY_KEY, key)
const userTrackingCount30ByKey = (key) => fetchALL(USER_TRACKKING_COUNT_30_BY_KEY, key)
const userTrackingCount10ByKey = (key) => fetchALL(USER_TRACKKING_COUNT_10_BY_KEY, key)

const userTrackingCount60ByKeyLimitNext = (key, id) => fetchALL(USER_TRACKKING_COUNT_60_BY_KEY_LIMIT_NEXT, key, id)
const userTrackingCount50ByKeyLimitNext = (key, id) => fetchALL(USER_TRACKKING_COUNT_50_BY_KEY_LIMIT_NEXT, key, id)
const userTrackingCount30ByKeyLimitNext = (key, id) => fetchALL(USER_TRACKKING_COUNT_30_BY_KEY_LIMIT_NEXT, key, id)
const userTrackingCount10ByKeyLimitNext = (key, id) => fetchALL(USER_TRACKKING_COUNT_10_BY_KEY_LIMIT_NEXT, key, id)

const userTrackingCount60ByKeyLimitPrev = (key, id) => fetchALL(USER_TRACKKING_COUNT_60_BY_KEY_LIMIT_PREV, key, id)
const userTrackingCount50ByKeyLimitPrev = (key, id) => fetchALL(USER_TRACKKING_COUNT_50_BY_KEY_LIMIT_PREV, key, id)
const userTrackingCount30ByKeyLimitPrev = (key, id) => fetchALL(USER_TRACKKING_COUNT_30_BY_KEY_LIMIT_PREV, key, id)
const userTrackingCount10ByKeyLimitPrev = (key, id) => fetchALL(USER_TRACKKING_COUNT_10_BY_KEY_LIMIT_PREV, key, id)

const userTrackingCount10LimitNext = (id) => fetchALL(USER_TRACKKING_COUNT_10_LIMIT_NEXT, id)
const userTrackingCount30LimitNext = (id) => fetchALL(USER_TRACKKING_COUNT_30_LIMIT_NEXT, id)
const userTrackingCount50LimitNext = (id) => fetchALL(USER_TRACKKING_COUNT_50_LIMIT_NEXT, id)
const userTrackingCount60LimitNext = (id) => fetchALL(USER_TRACKKING_COUNT_60_LIMIT_NEXT, id)

const userTrackingCount10LimitPrev = (id) => fetchALL(USER_TRACKKING_COUNT_10_LIMIT_PREV, id)
const userTrackingCount30LimitPrev = (id) => fetchALL(USER_TRACKKING_COUNT_30_LIMIT_PREV, id)
const userTrackingCount50LimitPrev = (id) => fetchALL(USER_TRACKKING_COUNT_50_LIMIT_PREV, id)
const userTrackingCount60LimitPrev = (id) => fetchALL(USER_TRACKKING_COUNT_60_LIMIT_PREV, id)

module.exports = {
    userTrackingCount60,
    userTrackingCount50,
    userTrackingCount30,
    userTrackingCount10,
    userTrackingCount60ByKey,
    userTrackingCount50ByKey,
    userTrackingCount30ByKey,
    userTrackingCount10ByKey,
    userTrackingCount60ByKeyLimitNext,
    userTrackingCount50ByKeyLimitNext,
    userTrackingCount30ByKeyLimitNext,
    userTrackingCount10ByKeyLimitNext,
    userTrackingCount60ByKeyLimitPrev,
    userTrackingCount50ByKeyLimitPrev,
    userTrackingCount30ByKeyLimitPrev,
    userTrackingCount10ByKeyLimitPrev,
    userTrackingCount10LimitNext,
    userTrackingCount30LimitNext,
    userTrackingCount50LimitNext,
    userTrackingCount60LimitNext,
    userTrackingCount10LimitPrev,
    userTrackingCount30LimitPrev,
    userTrackingCount50LimitPrev,
    userTrackingCount60LimitPrev,
}