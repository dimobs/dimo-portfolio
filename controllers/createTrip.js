const { mapError } = require('../services/util')

module.exports = {
    get(req, res) {
        res.render('createTrip', { title: "CreateTrip Listing" })
    },

    async post(req, res) {
        const pay = {
            sender: req.body.sender,
            resiver: req.body.resiver,
            amount: Number(req.body.amount),
            description: req.body.description || 'No Description',
            imageUrl: req.body.imageUrl,
            date: req.body.date,
            owner: req.session.user.id,
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