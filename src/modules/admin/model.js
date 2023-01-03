const { fetch } = require("../../lib/postgres");

const ADMIN = `
    SELECT
        *
    FROM
        admin
    WHERE
        admin_name = $1 and
        admin_password = $2;
`;

const getAdmin = (name, password) => fetch(ADMIN, name, password)

module.exports = {
    getAdmin
}