const { fetch, fetchALL } = require("../../lib/postgres");

const All_USERS = `
    SELECT
        user_id, user_name, user_surname, user_age, user_phone, user_who, user_country, user_capital, to_char(user_create_date at time zone 'Asia/Tashkent', 'HH24:MI/DD.MM.YYYY')
    FROM
        users
    ORDER BY
        user_id DESC
    LIMIT 50;
`;

const BY_ID = `
    SELECT
        *, to_char(user_create_date at time zone 'Asia/Tashkent', 'HH24:MI/DD.MM.YYYY')
    FROM
        users
    WHERE
        user_id = $1
    ORDER BY
        user_id DESC;
`;

const BY_TOKEN = `
    SELECT
        *, to_char(user_create_date at time zone 'Asia/Tashkent', 'HH24:MI/DD.MM.YYYY')
    FROM
        users
    WHERE
         $1 = ANY (user_device_id)
    ORDER BY
        user_id DESC; 
`;

const UPDATE_USER = `
    UPDATE
        users
    SET
        user_name = $2,
        user_surname = $3,
        user_age = $4,
        user_birthday = $5,
        user_who = $6,
        user_phone = $7,
        user_password = $8
    WHERE
        user_id = $1 RETURNING * ;
`;

const UPDATE_USER_WITHOUT_PASS = `
    UPDATE
        users
    SET
        user_name = $2,
        user_surname = $3,
        user_age = $4,
        user_who = $5,
        user_phone = $6
    WHERE
        user_id = $1 RETURNING * ;
`;

const DELETE_USER = `
    DELETE FROM
        users
    WHERE
        user_id = $1
    RETURNING *;
`

const ADD_COMMENT_ADMIN = `
    UPDATE
        users
    SET
        user_comment = $2
    WHERE
        user_id = $1 RETURNING * ;
`

const ADD_COMMENT = `
    UPDATE
        users
    SET
        user_comment = $2
    WHERE
        user_id = $1 RETURNING * ;
`

const BY_KEY_USER_ID = `
    select
        *, to_char(app_user_install_date, 'HH24:MI/DD.MM.YYYY')
    from
        apps_user a
    inner join
        users b
    on a.user_id = b.user_id
    inner join
        apps c
    on a.app_key = c.app_key
    where 
        a.user_id = $1 and a.app_key = $2
    ORDER BY
        a.app_user_id DESC;
`

const ADD_APP_USER = `
    INSERT INTO
        apps_user (
            app_user_notification_token,
            user_id,
            app_key
    )
    VALUES
    (
        $1,
        $2,
        $3
    ) RETURNING *;
`

const ADD_TRACKING_USER = `
    INSERT INTO
        tracking_users (
            user_id,
            app_key
    )
    VALUES
    (
        $1,
        $2
    ) RETURNING *;
`

const UPDATE_USER_CITY = `
    UPDATE
        users
    SET
        user_capital = $2
    WHERE
        user_id = $1 RETURNING * ;
`

const UPDATE_USER_REGION = `
    UPDATE
        users
    SET
        user_region = $2
    WHERE
        user_id = $1 RETURNING * ;
`

const UPDATE_USER_NOTIFICATION = `
    UPDATE
        apps_user
    SET
        app_user_notification_token = $3
    WHERE
        user_id = $1 and app_key = $2 RETURNING * ;
`

const CHECK_USER_ANDROID_VERSION = `
    SELECT
        *, to_char(user_create_date at time zone 'Asia/Tashkent', 'HH24:MI/DD.MM.YYYY')
    FROM
        users
    WHERE
        user_id = $1 and $2 = ANY (user_phone_android_version)
    ORDER BY
        user_id DESC; 
`

const PUT_USER_PHONE_INFO_WITHOUT_ANDROID_V = `
    UPDATE
        users
    SET
        user_phone_model = $2,
        user_phone_brand = $3,
        user_phone_lang = $4
    WHERE
        user_id = $1 RETURNING * ;
`;

const PUT_USER_PHONE_INFO = `
    UPDATE
        users
    SET
        user_phone_model = $2,
        user_phone_brand = $3,
        user_phone_lang = $4,
        user_phone_android_version =  array_append(user_phone_android_version, $5)
    WHERE
        user_id = $1 RETURNING * ;
`;

const ADD_USER_INTEREST = `
    Update 
        users 
    SET 
        user_interest = array_append(user_interest, $2)
    WHERE
        user_id = $1
    RETURNING *;
`;

const UPDATE_APP_USER_APP_VERSION = `
    Update 
        apps_user  
    SET 
        app_user_current_version = $3
    WHERE
        user_id = $1 and app_key = $2
    RETURNING *;
`;

const ADD_IMAGE_USER = `
    UPDATE
        users
    SET
        user_image_url = $2,
        user_image_name = $3
    WHERE
        user_id =  $1
    RETURNING *;
`;

const ADD_USER_INTEREST_BY_APP_KEY = `
    UPDATE 
        users a
    SET 
        a.user_interest = array_append(a.user_interest, $2)
    FROM 
        apps_user b
    WHERE 
        a.user_id = b.user_id and b.app_key = $1
    RETURNING a.user_id;
`;

const getallUsers = () => fetchALL(All_USERS);
const getfoundbyIdUser = (id) => fetchALL(BY_ID, id);
const getfoundbyTokenUser = (token) => fetch(BY_TOKEN, token)
const putUser = (id, name, surname, age, date, who, phone, pass_hash,) => fetch(UPDATE_USER, id, name, surname, age, date, who, phone, pass_hash);
const putUserWithoutPass = (id, name, surname, age, who, phone) => fetch(UPDATE_USER_WITHOUT_PASS, id, name, surname, age, who, phone);
const deleteUser = (id) => fetch(DELETE_USER, id);
const addComment = (id, comment) => fetch(ADD_COMMENT_ADMIN, id, comment)
const updateComment = (id, comment) => fetch(ADD_COMMENT, id, comment)
const getAppUser = (id, key) => fetch(BY_KEY_USER_ID, id, key)
const addAppUser = (notification, id, key) => fetch(ADD_APP_USER, notification, id, key)
const addTrackingUser = (id, key) => fetch(ADD_TRACKING_USER, id, key)
const putUserCity = (id, city) => fetch(UPDATE_USER_CITY, id, city)
const putUserRegion = (id, region) => fetch(UPDATE_USER_REGION, id, region)
const updateUserNotification = (id, key, notification) => fetch(UPDATE_USER_NOTIFICATION, id, key, notification)
const checkAndroidVersion = (id, phone_android_v) => fetch(CHECK_USER_ANDROID_VERSION, id, phone_android_v)
const putUserPhoneInfoWithoutAndroidVersion = (id, phone_model, phone_brand, phone_lang) => fetch(PUT_USER_PHONE_INFO_WITHOUT_ANDROID_V, id, phone_model, phone_brand, phone_lang)
const putUserPhoneInfo = (id, phone_model, phone_brand, phone_lang, phone_android_v) => fetch(PUT_USER_PHONE_INFO, id, phone_model, phone_brand, phone_lang, phone_android_v)
const addUserInterest = (id, text) => fetch(ADD_USER_INTEREST, id, text)
const putAppUserAppVersion = (id, app_key, app_version) => fetch(UPDATE_APP_USER_APP_VERSION, id, app_key, app_version)
const getusersByLimitPagination = (offset) => {
    const USER_LIMIT_PAGINATION = `
        SELECT
            user_id, user_name, user_surname, user_age, user_phone, user_who, user_country, user_capital, to_char(user_create_date at time zone 'Asia/Tashkent', 'HH24:MI/DD.MM.YYYY')
        FROM
            users
        ORDER BY
            user_id DESC
        OFFSET ${offset}
        LIMIT 50;
    `;

    return fetchALL(USER_LIMIT_PAGINATION)
}

const getusersByLimitPaginationBySort = (offset, sort) => {
    const USER_LIMIT_PAGINATION = `
        SELECT
            user_id, user_name, user_surname, user_age, user_phone, user_who, user_country, user_capital, to_char(user_create_date at time zone 'Asia/Tashkent', 'HH24:MI/DD.MM.YYYY')
        FROM
            users
        ORDER BY
            ${sort}
        OFFSET ${offset}
        LIMIT 50;
    `;

    return fetchALL(USER_LIMIT_PAGINATION)
}

const getfoundbyPhoneUser = (offset, phone) => {
    const BY_PHONE = `
        SELECT
            user_id, user_name, user_surname, user_age, user_phone, user_who, user_country, user_capital, to_char(user_create_date at time zone 'Asia/Tashkent', 'HH24:MI/DD.MM.YYYY')
        FROM
            users
        WHERE
            user_phone ILIKE '${phone}'
        ORDER BY
            user_id DESC
        OFFSET ${offset}
        LIMIT 50;
    `;

    return fetchALL(BY_PHONE)
}

const getfoundbyNameUser = (offset, name) => {
    const BY_NAME = `
        SELECT
            user_id, user_name, user_surname, user_age, user_phone, user_who, user_country, user_capital, to_char(user_create_date at time zone 'Asia/Tashkent', 'HH24:MI/DD.MM.YYYY')
        FROM
            users
        WHERE
            user_name ILIKE '${name}'
        ORDER BY
            user_id DESC
        OFFSET ${offset}
        LIMIT 50;
    `;

    return fetchALL(BY_NAME)
}

const getfoundbySurnameUser = (offset, surname) => {
    const BY_SURNAME = `
        SELECT
            user_id, user_name, user_surname, user_age, user_phone, user_who, user_country, user_capital, to_char(user_create_date at time zone 'Asia/Tashkent', 'HH24:MI/DD.MM.YYYY')
        FROM
            users
        WHERE
            user_surname ILIKE '${surname}'
        ORDER BY
            user_id DESC
        OFFSET ${offset}
        LIMIT 50;
    `;

    return fetchALL(BY_SURNAME)
}

const getfoundbyAgeUser = (offset, age) => {
    const BY_AGE = `
        SELECT
            user_id, user_name, user_surname, user_age, user_phone, user_who, user_country, user_capital, to_char(user_create_date at time zone 'Asia/Tashkent', 'HH24:MI/DD.MM.YYYY')
        FROM
            users
        WHERE
            user_age = ${age}
        ORDER BY
            user_id DESC
        OFFSET ${offset}
        LIMIT 50;
    `;

    return fetchALL(BY_AGE)
}
const addImgUser = (user_id, image_url, image_name) => fetch(ADD_IMAGE_USER, user_id, image_url, image_name)
const addUserInterestByAppKey = (app_key, text) => fetch(ADD_USER_INTEREST_BY_APP_KEY, app_key, text)

module.exports = {
    getallUsers,
    getfoundbyIdUser,
    getfoundbyTokenUser,
    getfoundbyPhoneUser,
    getfoundbyNameUser,
    getfoundbySurnameUser,
    getfoundbyAgeUser,
    putUser,
    deleteUser,
    addComment,
    updateComment,
    getAppUser,
    addAppUser,
    putUserWithoutPass,
    addTrackingUser,
    putUserCity,
    putUserRegion,
    updateUserNotification,
    getusersByLimitPagination,
    getusersByLimitPaginationBySort,
    checkAndroidVersion,
    putUserPhoneInfoWithoutAndroidVersion,
    putUserPhoneInfo,
    addUserInterest,
    putAppUserAppVersion,
    addImgUser,
    addUserInterestByAppKey
};