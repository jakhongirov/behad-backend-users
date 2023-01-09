const model = require('./model')

module.exports = {
    POST: async (req, res) => {
        const body = req.body
        console.log(body);
        console.log("clickPrepare");
        res.send("ok")
    },
    
    POST_2: async (req, res) => {
        const body = req.body
        console.log(body);
        console.log("clickComplete");
        res.send("ok")
    }
}