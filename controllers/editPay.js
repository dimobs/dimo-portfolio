
module.exports = {
    async get(req, res) {
        const id = req.params.id;
        const pay = await req.storage.getById(id, "pay");

        if (pay.owner != req.session.user.id) {
            console.log('User is not owner!');
            return res.redirect('/login');
        }

        if (pay) {
            res.render('editPay', { title: `Edit Listing - ${pay.sender}`, pay });

        } else {
            res.redirect('404');
        }
    },
    async post(req, res) {
        const id = req.params.id;
        const pay = {
            sender: req.body.sender,
            resiver: req.body.resiver,
            description: req.body.description,
            date: req.body.date,
            imageUrl: req.body.imageUrl,
            amount: Number(req.body.amount)
        };

        try {
            if (await req.storage.updateById(id, pay, req.session.user.id)) {
                res.redirect('/paymentHistory')
            } else {
                res.redirect('/login');
            }
        } catch (err) {
            console.log(err.message);
            res.redirect('/404')
        }
    }
};

