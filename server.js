const express = require("express");
const cors = require("cors");
const path = require('path')
const app = express();
const { PORT } = require("./src/config");
const router = require("./src/modules");


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.urlencoded({ extended: true }));
app.use(cors({
    "Access-Control-Allow-Origin":  "*",
    origin: "*"
}))
app.use(express.json());
app.use('/public', express.static(path.resolve(__dirname, "..", 'public')))
app.use("/api/v1", router);

app.listen(PORT, console.log(cors()));