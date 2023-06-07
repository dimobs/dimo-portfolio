// module.exports = {
//     async paymentHistory(req, res) {
//         const tablePays = await req.storage.getAll({});

//         if (req.session.user.username == "admin") {
//             tablePays.map(pay => {
//                 pay.isOwner = true;
//             });

//         } else {
//             tablePays.map(pay => {
//                 if (req.session.user && req.session.user.id == pay.owner) {
//                     pay.isOwner = true;
//                 }
//             });
//         }
//         res.render('paymentHistory', { tablePays, title: 'Payment History' });
//     }
// }
module.exports = {
    async profile(req, res) {
        const tablePays = await req.storage.getAll({});

        tablePays.counts = 0;

        if (req.session.user.username == "admin") {
            tablePays.map(pay => {
                pay.isOwner = true;
            });

        } else {
            tablePays.map(pay => {
                // pay.votesUsers = pay.votes.map(x => x.user).join(', ');
                if (req.session.user && req.session.user.id == pay.owner) {
                    pay.isOwner = true;
                    tablePays.counts++;
                }
            });
        }
console.log(tablePays);
        res.render('profile', { tablePays, title: 'User Profile' });
    }
}
