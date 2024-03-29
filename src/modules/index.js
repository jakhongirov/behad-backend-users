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
const TrackLogin = require('./trackLogin/trackLogin')

router
    .post("/login/:temptoken/:app_key/:notification_token", Login.LOGIN)
    .post("/register/:temptoken/:app_key/:notification_token", Login.REGISTER)
    .post('/forgetPassword/:url', Forget.POST_PHONE)

    .put('/UpdateTrackLogin', TrackLogin.PUT)
    .get('/trackLogin', TrackLogin.USE_CRON)

    .get('/users', Users.GET_USERS)
    .put('/editUser', AUTH, Users.PUT_USER)
    .put('/adminAddcomment', AUTH, Users.PUT_COMMENT_USER_ADMIN)
    .put('/Addcomment', Users.POST_COMMENT_USER)
    .put('/putUserPhoneInfo', Users.PUT_USER_PHONE_INFO)
    .put('/putUserInterest', AUTH, Users.PUT_USER_INTEREST)
    .put('/putUsersInterestByAppKey', AUTH, Users.PUT_USER_INTEREST_BY_APP_KEY)
    .put('/addAvatar', AUTH, FileUpload.single("photo"), Users.ADD_AVATAR)
    .delete('/deleteUser', AUTH, Users.DELETE_USER)

    .post('/admin', Admin.LOGIN)

    .get('/trackingUsers', Tracking.GET)
    .get('/trackingUsersFilter/:url', AUTH, Tracking.GET_USER_TRACKING_FILTER)
    .get('/trackingUsersCount', AUTH, Tracking.GET_USERS_TRACKING_COUNT)

    .get('/userCountry', UserCount.GET_COUNTRY)
    .get('/userCity', AUTH, UserCount.GET_CITY)
    .get('/userCountry-City', AUTH, UserCount.GET_COUNTRY_CITY)
    .get('/userCount', AUTH, UserCount.GET_USERS_ALL_COUNT)
    .get('/userCountGender', AUTH, UserCount.GET_USERS_GENDER_COUNT)
    .get('/userCountAge', UserCount.GET_USERS_AGE_COUNT_FILTER)

    .get('/apps', App.GET_APP)
    .post('/addApp', AUTH, App.ADD_APP)
    .put('/updeteApp', AUTH, App.PUT_APP)
    .put('/updeteContentVersionApp', AUTH, App.PUT_VERSION)
    .delete('/deleteApp', AUTH, App.DELETE_APP)

    .get('/appUsers', AUTH, AppUser.GET_APP_USERS)
    .get('/appUsersCount', AUTH, AppUser.GET_USER_BY_APP_KEY_COUNT)
    .get('/usersAppsCount', AUTH, AppUser.GET_USERS_APPS_COUNT)
    .get('/appUsersCountGender', AUTH, AppUser.GET_USER_BY_APP_KEY_COUNT_GENDER)
    .get('/appUsersByKey', AUTH, AppUser.GET_USER_BY_APP_KEY_USERS)
    .put('/editProVersion', AUTH, AppUser.PUT_PRO_VERSION)
    .put('/sendNotification', AppUser.SEND_NOTIFICATION)
    .get('/updateInterested', AUTH, AppUser.UPDATE_USER_INTERESTED)

    .post('/clickPrepare', Click.POST)
    .post('/clickComplete', Click.POST_2)

    .get('/news', News.GET_NEWS)
    .post('/addnew', AUTH, FileUpload.single("photo"), News.POST_NEW)
    .put('/updatenew', AUTH, FileUpload.single("photo"), News.PUT_NEW)
    .put('/updateCount/:url', News.UPDATE_COUNT)
    .delete('/deletenew', AUTH, News.DELETE_NEW);

module.exports = router