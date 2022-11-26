const tripService = require('../services/post');

function preload(dataBase) {
    return async function (req, res, next){
        const id = req.params.id;

        const trip = await tripService.getById(id, dataBase);
        res.locals.trip = trip;

        next();
    };
}

module.exports = {
    preload
}