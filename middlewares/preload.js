const payServices = require('../services/post');

function preload(populate) {
    return async function (req, res, next){
        const id = req.params.id;
        const pay = await payServices.getById(id, dataBase);
        res.locals.pay = pay;

        next();
    };
}

module.exports = {
    preload
};