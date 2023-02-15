const { fetch } = require("../../lib/postgres");

const BY_PHONE = `
    SELECT
        *   
    FROM
        users
    WHERE
        user_phone LIKE $1
    ORDER BY
        user_id DESC;
`;

const UPADATE_USER = `
    UPDATE
        users
    SET
        user_password = $2
    WHERE
        user_id = $1 RETURNING * ;
`

const ADD_CODE = `
    INSERT INTO
        sms_users (
            user_phone,
            sms_users__code
        )
    VALUES
        (
            $1,
            $2
        ) RETURNING *;
`

const UPDATE_CODE_ACTIVE = `
    UPDATE
        sms_users
    SET
        sms_isActive = $2
    WHERE
        sms_users_id = $1 RETURNING * ;
`

const UPDATE_SMS_TOKEN = `
    UPDATE
        sms_token
    SET
        sms_token = $1
    WHERE
        sms_token_id = 1 RETURNING * ;
`

const GET_SMS_TOKEN = `
    SELECT
        *
    FROM
        sms_token ;
`

const GET_CODE = `  
    SELECT
        *
    FROM
        sms_users 
    Where
        user_phone = $1 and sms_users__code = $2;
`

const getUser = (phone) => fetch(BY_PHONE, phone)
const putUser = (id, pass_hash) => fetch(UPADATE_USER, id, pass_hash)
const postCode = (phone, code) => fetch(ADD_CODE, phone, code)
const updeteActive = (id, status) => fetch(UPDATE_CODE_ACTIVE, id, status)
const UpdateToken = (token) => fetch(UPDATE_SMS_TOKEN, token)
const getToken = () => fetch(GET_SMS_TOKEN)
const getCode = (phone, sms) => fetch(GET_CODE, phone, sms)

module.exports = {
    getUser,
    putUser,
    postCode,
    updeteActive,
    UpdateToken,
    getToken,
    getCode
}