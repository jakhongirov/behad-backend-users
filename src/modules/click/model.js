const { fetch } = require("../../lib/postgres");

const ADD_BALANCE_USER = `
    UPDATE
        users
    SET
        user_balance = user_balance + $2
    WHERE
        user_id = $1 RETURNING * ;
`;

const UPDATE_APP_USER_PRO = `
    UPDATE
        apps_user
    SET
        app_user_isPayed = true,
        click_id = $3        
    WHERE
        user_id = $1 and app_key = $2 
    RETURNING * ;
`;

const updateUserBalance = (id, amount) => fetch(ADD_BALANCE_USER, id, amount)
const addProVersion = (id, param2, click_trans_id) => fetch(UPDATE_APP_USER_PRO, id, param2, click_trans_id)

module.exports = {
    addProVersion,
    updateUserBalance
}