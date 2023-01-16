const express = require("express");
const cors = require("cors");
const path = require('path')
const app = express();
const { PORT } = require("./src/config");
const router = require("./src/modules");

app.use(express.urlencoded({ extended: true }));
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}));
app.use(express.json());
app.use('/public', express.static(path.resolve(__dirname, "..", 'public')))
app.use(function (req, res, next) {
    req.header('Access-Control-Allow-Origin', '*')
    req .header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
})
app.use("/api/v1", router);

app.listen(PORT, console.log(PORT));