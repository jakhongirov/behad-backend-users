const { fetch, fetchALL } = require("../../lib/postgres");

const All_USERS = `
    SELECT
        *, to_char(user_create_date, 'HH24:MM/MM.DD.YYYY')
    FROM
        users
    ORDER BY
        user_id DESC;
`;

const BY_ID = `
    SELECT
        *, to_char(user_create_date, 'HH24:MM/MM.DD.YYYY')
    FROM
        users
    WHERE
        user_id = $1
    ORDER BY
        user_id DESC;
`;

const BY_TOKEN = `
    SELECT
        *, to_char(user_create_date, 'HH24:MM/MM.DD.YYYY')
    FROM
        users
    WHERE
         $1 = ANY (user_device_id)
    ORDER BY
        user_id DESC;
`;

const BY_PHONE = `
    SELECT
        *, to_char(user_create_date, 'HH24:MM/MM.DD.YYYY')
    FROM
        users
    WHERE
        user_phone LIKE $1
    ORDER BY
        user_id DESC;
`;

const BY_NAME = `
    SELECT
        *, to_char(user_create_date, 'HH24:MM/MM.DD.YYYY')
    FROM
        users
    WHERE
        user_name LIKE $1
    ORDER BY
        user_id DESC;
`;

const BY_SURNAME = `
    SELECT
        *, to_char(user_create_date, 'HH24:MM/MM.DD.YYYY')
    FROM
        users
    WHERE
        user_surname LIKE $1
    ORDER BY
        user_id DESC;
`;

const BY_AGE = `
    SELECT
        *, to_char(user_create_date, 'HH24:MM/MM.DD.YYYY')
    FROM
        users
    WHERE
        user_age = $1
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
        user_who = $5,
        user_phone = $6,
        user_password = $7,
        user_location = $8
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

const getallUsers = () => fetchALL(All_USERS);
const getfoundbyIdUser = (id) => fetch(BY_ID, id);
const getfoundbyTokenUser = (token) => fetch(BY_TOKEN, token)
const getfoundbyPhoneUser = (phone) => fetchALL(BY_PHONE, phone);
const getfoundbyNameUser = (name) => fetchALL(BY_NAME, name);
const getfoundbySurnameUser = (surname) => fetchALL(BY_SURNAME, surname);
const getfoundbyAgeUser = (age) => fetchALL(BY_AGE, age);
const putUser = (id, name, surname, age, who, phone, pass_hash, location,) => fetch(UPDATE_USER, id, name, surname, age, who, phone, pass_hash, location);
const deleteUser = (id) => fetch(DELETE_USER, id);
const addComment = (id, comment) => fetch(ADD_COMMENT_ADMIN, id, comment)
const updateComment = (id, comment) => fetch(ADD_COMMENT, id, comment)

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
    updateComment
};