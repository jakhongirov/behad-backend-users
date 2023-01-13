const { fetch, fetchALL } = require("../../lib/postgres");

const foundUser = `
    SELECT
        *
    FROM
        users
    WHERE
        user_phone = $1;
`;

const ADD_USER = `
    INSERT INTO
        users (
            user_name,
            user_surname,
            user_age,
            user_who,
            user_phone,
            user_password,
            user_country,
            user_capital,
            user_device_id
        )
    VALUES
        (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            ARRAY [ $9 ]  
        ) RETURNING *;
`;

const ADD_TOKEN_USER = `
    Update 
        users 
    SET 
        user_device_id = array_append(user_device_id, $2)
    WHERE
        user_id = $1
    RETURNING *;
`;

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

const BY_PHONE = `
    SELECT
        *
    FROM
        users
    WHERE
        user_phone = $1
    ORDER BY
        user_id DESC;
`;

const GET_APP_USER = `
    SELECT
        *
    FROM
        apps_user
    WHERE
        user_id = $1 and  app_key =$2
    ORDER BY
        app_user_id DESC;
`

const DELETE_USER_DEVICE_ID = `
    SELECT 
        array_remove(user_device_id, $1) 
    FROM 
        users 
    WHERE
         $1 = any (user_device_id);
`

const getUser = (phone) => fetch(foundUser, phone);
const registerUser = (name, surname, age, who, phone, pass_hash, country, capital, temptoken) => fetch(ADD_USER, name, surname, age, who, phone, pass_hash, country, capital, temptoken)
const addTokenUser = (id, token) => fetch(ADD_TOKEN_USER, id, token)
const addAppUser = (notification_token, id, app_key) => fetch(ADD_APP_USER, notification_token, id, app_key)
const checkUser = (phone) => fetch(BY_PHONE, phone)
const getAppUser = (id, key) => fetch(GET_APP_USER, id, key)
const deleteUserDeviceId = (temptoken) => fetchALL(DELETE_USER_DEVICE_ID, temptoken)

module.exports = {
    getUser,
    registerUser,
    addTokenUser,
    addAppUser,
    checkUser,
    getAppUser,
    deleteUserDeviceId
}