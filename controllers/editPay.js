const { payModel } = require('../services/util');

module.exports = {
    async get(req, res) {
        const id = req.params.id;
        const pay = await req.storage.getById(id);

        // if (pay.owner != req.session.user.id) {
        //     console.log('User is not owner!');
        //     return res.redirect('/login');
        // }

        // if (pay) {
        //     res.render('editPay', { title: `Edit Listing - ${pay.sender}`, pay });
         
        // } else {
        //     res.redirect('404');
        // }

        if (req.session.user && req.session.user.id == car.owner) {
            car.isOwner = true;
        }

        if (car) {
            res.render('/', { title: `Carbicle - ${pay.sender}`, pay });
        } else {
            res.redirect('/404');
        }
    },

    async post(req, res) {
        const id = req.params.id;
        const pay = { payModel };

        try {
            if (await req.storage.updateById(id, car, req.session.user.id)) {
                res.redirect('/')
            } else {
                res.redirect('/login');
            }
        } catch (err) {
            console.log(err.message);
            res.redirect('/404')
        }
    }
};

