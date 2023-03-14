const { fetch } = require("../../lib/postgres");

const CREATE_TRACK_LOGIN = `
    INSERT INTO
        track_login (
            track_login_enter,
            track_login_phone,
            track_login_success
        ) 
    VALUES(
        0,
        0,
        0
    ) RETURNING *;
`;

const UPDATE_TRACK_LOGIN_ENTER = `
    UPDATE
        track_login
    SET
        track_login_enter = track_login_enter + 1
    WHERE 
        track_login_id IN(SELECT max(track_login_id) FROM track_login)
    RETURNING *;
`;

const UPDATE_TRACK_LOGIN_PHONE = `
    UPDATE
        track_login
    SET
        track_login_phone = track_login_phone + 1
    WHERE 
        track_login_id IN(SELECT max(track_login_id) FROM track_login)
    RETURNING *;
`;

const UPDATE_TRACK_LOGIN_FAIL = `
    UPDATE
        track_login
    SET
        track_login_fail = track_login_fail + 1
    WHERE 
        track_login_id IN(SELECT max(track_login_id) FROM track_login)
    RETURNING *;
`;

const createTrackLogin = () => fetch(CREATE_TRACK_LOGIN)
const updateTrackLoginEnter = () => fetch(UPDATE_TRACK_LOGIN_ENTER)
const updateTrackLoginPhone = () => fetch(UPDATE_TRACK_LOGIN_PHONE)
const updateTrackLoginFail = () => fetch(UPDATE_TRACK_LOGIN_FAIL)

module.exports = {
    createTrackLogin,
    updateTrackLoginEnter,
    updateTrackLoginPhone,
    updateTrackLoginFail
}