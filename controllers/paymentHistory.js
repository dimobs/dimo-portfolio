const { payModel } = require('../services/util');
const  {getPayById}  = require('../services/pays');

module.exports = {
    async paymentHistory(req, res) {
   
        // const tablePays = await req.storage.getAll({});
        // const id = req.session.user.id; //req.params.id
        // const post = payModel(await getPayById(id));
        // console.log(post);
        
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
        res.render('paymentHistory', { tablePays});
      }
}
