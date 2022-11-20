const { mapError } = require('../services/util');
const { dateBgFormat } = require("../static/js/greetings.js");
const dateBg = dateBgFormat();

module.exports = {
    async get(req, res) {
        res.render('createPay', { title: `CreatePay`, dateBg })
    },

    async post(req, res) {
        const pay = {
            sender: req.body.sender,
            resiver: req.body.resiver,
            amount: Number(req.body.amount),
            description: req.body.description || 'No Description',
            imageUrl: req.body.imageUrl,
            date: req.body.date || dateBg,
            owner: req.session.user.id,
        };

        try {
            await req.storage.createPay(pay);

            res.redirect('/paymentHistory');
        } catch (err) {
            console.log('Error createing record');
            res.locals.errors = [{ msg: err.message }];
            res.render('createPay', { title: `Create Listing - ${pay.sender}`, pay });
        }
    }
};