// module.exports = {
//     createPay(req, res) {
//         res.render('createPay', {title: "CreatePay"})
//     }
// }

const { mapError } = require('../services/util')

module.exports = {
    get(req, res) {
        res.render('createPay', { title: "CreatePay Listing" })
    },

    async post(req, res) {
        const pay = {
            sender: req.body.sender,
            resiver: req.body.resiver,
            amount: Number(req.body.amount),
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            date: req.body.date,
        };
        try {
            await req.storage.createPay(pay);

            res.redirect('/paymentHistory');
        } catch (err) {
            console.log('Error createing record');
            res.locals.error = mapError(err);
            res.render('createPay', { title: "Create Listing", pay });
        }
    }
};

