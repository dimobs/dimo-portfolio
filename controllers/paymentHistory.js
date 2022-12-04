const { payModel } = require('../services/util');
const { getPayById } = require('../services/post');

module.exports = {
    async paymentHistory(req, res) {

        const tablePays = await req.storage.getAllWithUsers({});
        // const id = req.session.user.id; //req. params.id
        // const post = payModel(await getPayById(id));
        // console.log(post);
        if (req.session.user.username == "admin") {
            tablePays.map(pay => {
                pay.isOwner = true;
            });

        } else {
            tablePays.map(pay => {
               
                pay.isLoggedIn = true;
                if (req.session.user && req.session.user.id == pay.owner._id) {
                    pay.isOwner = true;
                } else {
                    pay.hasVoted = pay.votes.find(v => v.id == req.session.user.id) != undefined;
                    //   pay.hasVoted = pay.votes.includes(req.session.user.id)
                }
            });
        }

        res.render('paymentHistory', { title: "History", tablePays });
    }
}
