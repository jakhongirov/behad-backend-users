const model = require('./model')
const path = require('path')
const FS = require('../../lib/fs')

module.exports = {
    GET_NEWS: async (req, res) => {
        try {
            const { id, title } = req.query

            if (id) {
                const newsById = await model.getnewsById(id)

                if (newsById) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: newsById
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found"
                    })
                }
            } else if (title) {
                const newsByTitle = await model.getnewsByTitle(`%${title}$`)

                if (newsByTitle) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: newsByTitle
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found"
                    })
                }

            } else {
                const allNews = await model.getAllNews()

                if (allNews) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: allNews
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found"
                    })
                }
            }

        } catch (error) {
            console.log(error);
            res.json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    },

    POST_NEW: async (req, res) => {
        try {
            const uploadPhoto = req.file;
            const { name, desc } = req.body

            const image_name = uploadPhoto.filename;
            const image_url = `http://localhost:8001/${uploadPhoto.filename}`;

            const addNews = await model.addNews(name, desc, image_url, image_name)

            if (addNews) {
                return res.json({
                    status: 200,
                    message: "Success",
                    data: addNews
                })
            } else {
                return res.json({
                    status: 400,
                    message: "Bad request"
                })
            }

        } catch (error) {
            console.log(error);
            res.json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    },

    PUT_NEW: async (req, res) => {
        try {
            const uploadPhoto = req.file;
            const { id, name, desc } = req.body
            const newsById = await model.getnewsById(id)

            let image_name = "";
            let image_url = "";

            if (newsById) {
                const deleteOldLogo = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${newsById?.new_img_name}`))

                if (uploadPhoto) {
                    deleteOldLogo.delete()
                    image_name = uploadPhoto.filename
                    image_url = `http://localhost:8001/${uploadPhoto.filename}`
                } else {
                    image_url = newsById?.new_img
                    image_name = newsById?.new_img_name
                }

                const updateNew = await model.updateNew(id, name, desc, image_url, image_name)

                if (updateNew) {
                    return res.json({
                        status: 200,
                        message: "Success"
                    })
                } else {
                    return res.json({
                        status: 400,
                        message: "Bad request"
                    })
                }
            }

        } catch (error) {
            console.log(error);
            res.json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    },

    DELETE_NEW: async (req, res) => {
        try {
            const { id } = req.body
            const deleteNew = await model.deleteNew(id)

            if (deleteNew) {
                return res.json({
                    status: 200,
                    message: "Success"
                })
            } else {
                return res.json({
                    status: 400,
                    message: "Bad request"
                })
            }

        } catch (error) {
            console.log(error);
            res.json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    },

    UPDATE_COUNT: async (req, res) => {
        try {
            const { url } = req.params

            if (url == "like") {
                const { id } = req.body
                const newsById = await model.getnewsById(id)

                if (newsById) {
                    let count = ++newsById.likes_count
                    const updateLike = await model.updateLike(id, count)

                    if (updateLike) {
                        res.json({
                            status: 200,
                            message: "Success"
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found"
                    })
                }
            } else if (url == "dislike") {
                const { id } = req.body
                const newsById = await model.getnewsById(id)

                if (newsById) {
                    let count = ++newsById.dislike_count
                    const updateDisike = await model.updateDisike(id, count)

                    if (updateDisike) {
                        res.json({
                            status: 200,
                            message: "Success"
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found"
                    })
                }

            } else if (url == "view") {
                const { id } = req.body
                const newsById = await model.getnewsById(id)

                if (newsById) {
                    let count = ++newsById.views_count
                    const updateView = await model.updateView(id, count)

                    if (updateView) {
                        res.json({
                            status: 200,
                            message: "Success"
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found"
                    })
                }
            } else {
                return res.json({
                    status: 400,
                    message: "Bad request"
                })
            }

        } catch (error) {
            console.log(error);
            res.json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    }
}