const payServices = require('../services/post');
// function preload(populate) {
//     return async function (req, res, next){
//         const id = req.params.id;
//         const pay = await payServices.getById(id, dataBase);
//         res.locals.pay = pay;

//         next();
//     };
// }

function preload(populate) {
    return async function (req, res, next){
        const id = req.params.id;
      
        if(populate) {
           const pay = await req.storage.getAllPaysAndUsers(id);
           res.locals.pay = pay;
           res.render('editPay', { title: `Edit Listing - ${pay.owner.username}`, pay });
        } else {
            const pay = await req.storage.getById(id);
           res.locals.pay = pay;
            // res.render('editPay', { title: `Edit Listing - ${pay.sender}`, pay });
        }

        next();
    };
}

module.exports = {
    preload
};