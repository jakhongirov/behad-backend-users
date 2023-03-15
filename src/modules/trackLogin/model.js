const { fetch } = require("../../lib/postgres");

const CREATE_TRACK_LOGIN = `
    INSERT INTO
        track_register (
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
        track_register
    SET
        track_login_enter = track_login_enter + 1
    WHERE 
        track_login_id IN(SELECT max(track_login_id) FROM track_register)
    RETURNING *;
`;

const UPDATE_TRACK_LOGIN_PHONE = `
    UPDATE
        track_register
    SET
        track_login_phone = track_login_phone + 1
    WHERE 
        track_login_id IN(SELECT max(track_login_id) FROM track_register)
    RETURNING *;
`;

const UPDATE_TRACK_REGISTER_PHONE = `
    UPDATE
        track_register
    SET
        track_register_phone = track_register_phone + 1
    WHERE 
        track_login_id IN(SELECT max(track_login_id) FROM track_register)
    RETURNING *;
`;

const UPDATE_TRACK_LOGIN_FAIL = `
    UPDATE
        track_register
    SET
        track_login_fail = track_login_fail + 1
    WHERE 
        track_login_id IN(SELECT max(track_login_id) FROM track_register)
    RETURNING *;
`;

const UPDATE_TRACK_REGISTER_FAIL = `
    UPDATE
        track_register
    SET
        track_register_fail = track_register_fail + 1
    WHERE 
        track_login_id IN(SELECT max(track_login_id) FROM track_register)
    RETURNING *;
`;

const UPDATE_TRACK_LOGIN_PASSWORD = `
    UPDATE
        track_register
    SET
        track_login_password = track_login_password + 1
    WHERE 
        track_login_id IN(SELECT max(track_login_id) FROM track_register)
    RETURNING *;
`;

const UPDATE_TRACK_REGISTER_PASSWORD = `
    UPDATE
        track_register
    SET
        track_register_password = track_register_password + 1
    WHERE 
        track_login_id IN(SELECT max(track_login_id) FROM track_register)
    RETURNING *;
`;

const createTrackLogin = () => fetch(CREATE_TRACK_LOGIN)
const updateTrackLoginEnter = () => fetch(UPDATE_TRACK_LOGIN_ENTER)
const updateTrackLoginPhone = () => fetch(UPDATE_TRACK_LOGIN_PHONE)
const updateTrackLoginFail = () => fetch(UPDATE_TRACK_LOGIN_FAIL)
const updateTrackLoginPass = () => fetch(UPDATE_TRACK_LOGIN_PASSWORD)
const updateTrackRegisterPhone = () => fetch(UPDATE_TRACK_REGISTER_PHONE)
const updateTrackRegisterPass = () => fetch(UPDATE_TRACK_REGISTER_PASSWORD)
const updateTrackRegisterFail = () => fetch(UPDATE_TRACK_REGISTER_FAIL)

module.exports = {
    createTrackLogin,
    updateTrackLoginEnter,
    updateTrackLoginPhone,
    updateTrackLoginFail,
    updateTrackLoginPass,
    updateTrackRegisterPhone,
    updateTrackRegisterPass,
    updateTrackRegisterFail
}