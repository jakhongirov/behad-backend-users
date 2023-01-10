const model = require('./model')

module.exports = {
    POST: async (req, res) => {
        try {
            const { click_trans_id, amount, param2, param3, merchant_trans_id, error, error_note } = req.body
            let code = '';

            console.log(req.body);

            const makeCode = (length) => {
                let characters = '0123456789';
                let charactersLength = characters.length;
                for (let i = 0; i < length; i++) {
                    code += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
            }

            if (error_note === 'Success') {
                const updateUserBalance = await model.updateUserBalance(param3, param2)
                const addProVersion = await model.addProVersion(param3, amount)
            }

            makeCode(4)
            res.json({
                merchant_prepare_id: code,
                merchant_trans_id: merchant_trans_id,
                click_trans_id: click_trans_id,
                error: error,
                error_note: error_note
            })

        } catch (error) {
            console.log(err)
            res.json({
                status: 500,
                message: "Internal Server Error",
            })
        }
    },

    POST_2: async (req, res) => {
        try {
            const { click_trans_id, merchant_trans_id, error, error_note } = req.body

            console.log(req.body);


            res.json({
                merchant_prepare_id: 5,
                merchant_trans_id: merchant_trans_id,
                click_trans_id: click_trans_id,
                merchant_confirm_id: null,
                error: error,
                error_note: error_note
            })
        } catch (error) {
            console.log(err)
            res.json({
                status: 500,
                message: "Internal Server Error",
            })
        }
    }
}