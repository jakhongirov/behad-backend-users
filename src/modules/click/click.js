const model = require('./model')

module.exports = {
    POST: async (req, res) => {
        const { click_trans_id, merchant_trans_id, error, error_note } = req.body

        console.log(click_trans_id, merchant_trans_id, error, error_note);

        res.json({
            merchant_prepare_id: 5,
            merchant_trans_id: merchant_trans_id,
            click_trans_id: click_trans_id,
            error: error,
            error_note: error_note
        })
    },

    POST_2: async (req, res) => {
        const  {click_trans_id, merchant_trans_id, error, error_note } = req.body

        res.json({
            merchant_prepare_id: 5,
            merchant_trans_id: merchant_trans_id,
            click_trans_id: click_trans_id,
            merchant_confirm_id: null,
            error: error,
            error_note: error_note
        })
    }
}