const { fetch, fetchALL } = require("../../lib/postgres");

const NEWS = `
    SELECT
        *, to_char(new_create_date at time zone 'Asia/Tashkent', 'HH24:MI/DD.MM.YYYY')
    FROM
        news
    ORDER BY
        new_id DESC
    LIMIT 110;
`;

const NEW_BY_ID = `
    SELECT
        *, to_char(new_create_date at time zone 'Asia/Tashkent', 'HH24:MI/DD.MM.YYYY')
    FROM
        news
    WHERE
        new_id = $1
    ORDER BY
        new_id DESC;
`;

const NEWS_BY_TITLE = `
    SELECT
        *, to_char(new_create_date at time zone 'Asia/Tashkent', 'HH24:MI/DD.MM.YYYY')
    FROM
        news
    WHERE
        new_title LIKE $1
    ORDER BY
        new_id DESC;
`;

const ADD_NEW = `
    INSERT INTO
        news (
            new_title,
            new_description,
            new_img,
            new_img_name,
            app_key
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

const UPADATE_NEW = `
    UPDATE
        news
    SET
        new_title = $2,
        new_description = $3,
        new_img = $4,
        new_img_name= $5,
        app_key = $6
    WHERE
        new_id = $1 RETURNING * ;
`;

const DELETE_NEW = `
    DELETE FROM
        news
    WHERE
        new_id = $1
    RETURNING *;
`

const UPDATE_LIKE_COUNT = `
    UPDATE
        news
    SET
        likes_count = $2
    WHERE
        new_id = $1 RETURNING * ;
`;

const UPDATE_DISLIKE_COUNT = `
    UPDATE
        news
    SET
        dislike_count = $2
    WHERE
        new_id = $1 RETURNING * ;
`;

const UPDATE_VIEW_COUNT = `
    UPDATE
        news
    SET
        views_count = $2
    WHERE
        new_id = $1 RETURNING * ;
`;

const NEW_BY_ID_LIMIT_NEXT = `
    SELECT
        *, to_char(new_create_date at time zone 'Asia/Tashkent', 'HH24:MI/DD.MM.YYYY')
    FROM
        news
    WHERE
        new_id < $1
    ORDER BY
        new_id DESC
    LIMIT 100;
`;

const NEW_BY_ID_LIMIT_PREV = `
    SELECT
        *, to_char(new_create_date at time zone 'Asia/Tashkent', 'HH24:MI/DD.MM.YYYY')
    FROM
        news
    WHERE
        new_id > $1
    ORDER BY
        new_id DESC
    LIMIT 100;
`;

const getnewsById = (id) => fetch(NEW_BY_ID, id)
const getnewsByTitle = (title) => fetchALL(NEWS_BY_TITLE, title)
const getAllNews = () => fetchALL(NEWS)
const addNews = (name, desc, image_url, image_name, app_key) => fetch(ADD_NEW, name, desc, image_url, image_name, app_key)
const updateNew = (id, name, desc, image_url, image_name, app_key) => fetch(UPADATE_NEW, id, name, desc, image_url, image_name, app_key)
const deleteNew = (id) => fetch(DELETE_NEW, id)
const updateLike = (id, count) => fetch(UPDATE_LIKE_COUNT, id, count)
const updateDisike = (id, count) => fetch(UPDATE_DISLIKE_COUNT, id, count)
const updateView = (id, count) => fetch(UPDATE_VIEW_COUNT, id, count)
const newsByIdLimitNext = (id) => fetchALL(NEW_BY_ID_LIMIT_NEXT, id)
const getusersByLimitPrev = (id) => fetchALL(NEW_BY_ID_LIMIT_PREV, id)

module.exports = {
    getnewsById,
    getnewsByTitle,
    getAllNews,
    addNews,
    updateNew,
    deleteNew,
    updateLike,
    updateDisike,
    updateView,
    newsByIdLimitNext,
    getusersByLimitPrev
}
