module.exports = {
    async paymentHistory(req, res) {
        const tablePays = await req.storage.getAll({});

        if (req.session.user.username == "admin") {
            tablePays.map(pay => {
                pay.isOwner = true;
            });

        } else {
            tablePays.map(pay => {
                if (req.session.user && req.session.user.id == pay.owner) {
                    pay.isOwner = true;
                }
            });
        }
        res.render('paymentHistory', { tablePays, title: 'Payment History' });
    }
}

