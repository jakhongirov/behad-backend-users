const express = require("express")
const router = express.Router()
const { AUTH } = require('../middleware/auth')
const FileUpload = require('../middleware/multer')

const Login = require('./login/login')
const Users = require('./users/users')
const App = require('./apps/apps')
const Admin = require('./admin/admin')
const AppUser = require('./app-user/app-user')
const Forget = require('./forget/forget')
const News = require("./news/news")
const Click = require('./click/click')

router
    .get('/users', Users.GET_USERS)
    .post("/login/:temptoken/:app_key/:notification_token", Login.LOGIN)
    .post("/register/:temptoken/:app_key/:notification_token", Login.REGISTER)
    .put('/editUser', Users.PUT_USER)
    .put('/adminAddcommment', Users.PUT_COMMENT_USER_ADMIN)
    .put('/Addcommment', Users.POST_COMMENT_USER)
    .delete('/deleteUser', AUTH, Users.DELETE_USER)

    .post('/admin', Admin.LOGIN)

    .get('/apps', App.GET_APP)
    .post('/addApp', AUTH, App.ADD_APP)
    .put('/updeteApp', AUTH, App.PUT_APP)
    .delete('/deleteApp', AUTH, App.DELETE_APP)

    .get('/appUsers', AppUser.GET_APP_USERS)

    .post('/clickPrepare', Click.POST)
    .post('/clickComplete', Click.POST_2)



    .get('/news', News.GET_NEWS)
    .post('/addnew', AUTH, FileUpload.single("photo"), News.POST_NEW)
    .put('/updatenew', AUTH, FileUpload.single("photo"), News.PUT_NEW)
    .put('/updateCount/:url', News.UPDATE_COUNT)
    .delete('/deletenew', AUTH, News.DELETE_NEW)


    .post('/forgetPassword/:url', Forget.POST_PHONE);


module.exports = router