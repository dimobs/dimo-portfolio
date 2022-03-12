// module.exports = {
//     createPay(req, res) {
//         res.render('createPay', {title: "CreatePay"})
//     }
// }

const {mapError} = require('../service/util')

module.exports = {
    get(req, res) {
        res.render('createPay', { title: "CreatePay" })
    },

    async post(req, res) {
        const pay = {
            nameSender: req.body.nameSender,
            nameResiver: req.body.nameResiver,
            price: Number(req.body.price),
            description: req.body.description,
            imageUrl: req.body.imageUrl,
        };

        try {
            await req.storage.createPay(pay);

            res.redirect('/');
        }catch(err) {
            console.log('Error createing record');
            res.locals.error = mapError(err);
            res.render('createPay', {title: "Create Listing", pay});
        }
    }
};

