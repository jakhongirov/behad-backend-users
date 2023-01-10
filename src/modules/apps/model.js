const { fetch, fetchALL } = require("../../lib/postgres");

const All_APPS = `
    SELECT
        *, to_char(app_create_date, 'HH24:MM/MM.DD.YYYY')
    FROM
        apps
    ORDER BY
        app_id DESC;
`;

const BY_ID = `
    SELECT
        *, to_char(app_create_date, 'HH24:MM/MM.DD.YYYY')
    FROM
        apps
    WHERE
        app_id = $1
    ORDER BY
        app_id DESC;
`;

const BY_NAME = `
    SELECT
        *, to_char(app_create_date, 'HH24:MM/MM.DD.YYYY')
    FROM
        apps
    WHERE
        app_name LIKE $1
    ORDER BY
        app_id DESC;
`;

const BY_KEY = `
    SELECT
        *, to_char(app_create_date, 'HH24:MM/MM.DD.YYYY')
    FROM
        apps
    WHERE
        app_key LIKE $1
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
            app_price
        )
    VALUES
        (
            $1,
            $2,
            $3,
            $4,
            $5
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
        app_price = $6
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

const getAllApps = () => fetchALL(All_APPS);
const getAppbyId = (id) => fetchALL(BY_ID, id);
const getAppbyName = (name) => fetchALL(BY_NAME, name)
const getAppbyKey = (app_key) => fetchALL(BY_KEY, app_key)
const addApp = (name, current_vs, min_vs, key, price) => fetch(ADD_APP, name, current_vs, min_vs, key, price)
const putApp = (id, name, current_vs, min_vs, key, price) => fetch(UPADATE_APP, id, name, current_vs, min_vs, key, price)
const deleteApp = (id) => fetch(DELETE_APP, id)

module.exports = {
    getAllApps,
    getAppbyId,
    getAppbyName,
    getAppbyKey,
    addApp,
    putApp,
    deleteApp
}
