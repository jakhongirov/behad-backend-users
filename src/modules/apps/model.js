const { fetch, fetchALL } = require("../../lib/postgres");

const All_APPS = `
    SELECT
        *, to_char(app_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
    FROM
        apps
    ORDER BY
        app_id DESC
    LIMIT 50;
`;

const BY_ID = `
    SELECT
        *, to_char(app_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
    FROM
        apps
    WHERE
        app_id = $1
    ORDER BY
        app_id DESC;
`;

const BY_NAME = `
    SELECT
        *, to_char(app_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
    FROM
        apps
    WHERE
        app_name ILIKE $1
    ORDER BY
        app_id DESC;
`;

const BY_KEY = `
    SELECT
        *, to_char(app_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
    FROM
        apps
    WHERE
        app_key ILIKE $1
    ORDER BY
        app_id DESC;
`;

const BY_KEY_2 = `
    SELECT
        *, to_char(app_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
    FROM
        apps
    WHERE
        app_key = $1
    ORDER BY
        app_id DESC;
`;

const ADD_APP = `
    INSERT INTO
        apps (
            app_name,
            app_current_version,
            app_min_version,
            app_key,
            app_price,
            app_price_six_monthly,
            app_price_yearly,
            app_payment,
            app_token,
            app_post
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
            $9,
            $10
        ) RETURNING *;
`

const UPADATE_APP = `
    UPDATE
        apps
    SET
        app_name = $2,
        app_current_version = $3,
        app_min_version = $4,
        app_key = $5,
        app_price = $6,
        app_price_six_monthly = $7,
        app_price_yearly = $8,
        app_payment = $9,
        app_token = $10,
        app_post = $11
    WHERE
        app_id = $1 RETURNING * ;
`;

const DELETE_APP = `
    DELETE FROM
        apps
    WHERE
        app_id = $1
    RETURNING *;
`

const BY_ID_LIMIT_NEXT = `
    SELECT
        *, to_char(app_create_date at time zone 'Asia/Tashkent', 'DD.MM.YYYY')
    FROM
        apps
    WHERE
        app_id < $1
    ORDER BY
        app_id DESC
    LIMIT 50;
`;

const BY_ID_LIMIT_PREV = `
    SELECT
        *, to_char(app_create_date at time zone 'Asia/Tashkent', 'DD.MM.YYYY')
    FROM
        apps
    WHERE
        app_id > $1
    ORDER BY
        app_id DESC
    LIMIT 50;
`;

const UPDATE_CONTENT_VERSION = `
    UPDATE
        apps
    SET
        content_version = content_version + 1
    WHERE
        app_key = $1 RETURNING * ;
`

const getAllApps = () => fetchALL(All_APPS);
const getAppbyId = (id) => fetchALL(BY_ID, id);
const getAppbyName = (name) => fetchALL(BY_NAME, name)
const getAppbyKey = (app_key) => fetchALL(BY_KEY, app_key)
const getAppbyKeyApp = (key) => fetchALL(BY_KEY_2, key)
const addApp = (name, current_vs, min_vs, key, price, six_monthly, yearly, payment, app_token, app_post) => fetch(ADD_APP, name, current_vs, min_vs, key, price, six_monthly, yearly, payment, app_token, app_post)
const putApp = (id, name, current_vs, min_vs, key, price, six_monthly, yearly, payment, app_token, app_post) => fetch(UPADATE_APP, id, name, current_vs, min_vs, key, price, six_monthly, yearly, payment, app_token, app_post)
const deleteApp = (id) => fetch(DELETE_APP, id)
const appLimitByIdNext = (id) => fetchALL(BY_ID_LIMIT_NEXT, id)
const appLimitByIdPrev = (id) => fetchALL(BY_ID_LIMIT_PREV, id)
const getAppbyKeyAppAuth = (key) => fetch(BY_KEY_2, key)
const updateContentVersionApp = (key) => fetch(UPDATE_CONTENT_VERSION, key)

module.exports = {
    getAllApps,
    getAppbyId,
    getAppbyName,
    getAppbyKey,
    getAppbyKeyApp,
    addApp,
    putApp,
    deleteApp,
    appLimitByIdNext,
    appLimitByIdPrev,
    getAppbyKeyAppAuth,
    updateContentVersionApp
}
