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
const Tracking = require("./tracking/tracking")
const UserCount = require('./userCount/userCount')

router
    .get('/users', AUTH, Users.GET_USERS)
    .post("/login/:temptoken/:app_key/:notification_token", Login.LOGIN)
    .post("/register/:temptoken/:app_key/:notification_token", Login.REGISTER)
    .put('/editUser', AUTH, Users.PUT_USER)
    .put('/adminAddcomment', AUTH, Users.PUT_COMMENT_USER_ADMIN)
    .put('/Addcomment', AUTH, Users.POST_COMMENT_USER)
    .delete('/deleteUser', AUTH, Users.DELETE_USER)

    .post('/admin', Admin.LOGIN)

    .get('/trackingUsers', AUTH, Tracking.GET)

    .get('/userCountry', AUTH, UserCount.GET_COUNTRY)
    .get('/userCity', AUTH, UserCount.GET_CITY)
    .get('/userCountry-City', AUTH, UserCount.GET_COUNTRY_CITY)

    .get('/apps', AUTH, App.GET_APP)
    .post('/addApp', AUTH, App.ADD_APP)
    .put('/updeteApp', AUTH, App.PUT_APP)
    .put('/updeteContentVersionApp', AUTH, App.PUT_VERSION)
    .delete('/deleteApp', AUTH, App.DELETE_APP)

    .get('/appUsers', AUTH, AppUser.GET_APP_USERS)
    .put('/editProVersion', AUTH, AppUser.PUT_PRO_VERSION)
    .get('/updateInterested', AUTH, AppUser.UPDATE_USER_INTERESTED)

    .post('/clickPrepare', Click.POST)
    .post('/clickComplete', Click.POST_2)

    .get('/news', AUTH, News.GET_NEWS)
    .post('/addnew', AUTH, FileUpload.single("photo"), News.POST_NEW)
    .put('/updatenew', AUTH, FileUpload.single("photo"), News.PUT_NEW)
    .put('/updateCount/:url', News.UPDATE_COUNT)
    .delete('/deletenew', AUTH, News.DELETE_NEW)

    .post('/forgetPassword/:url',    Forget.POST_PHONE);

module.exports = router