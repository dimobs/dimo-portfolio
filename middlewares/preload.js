const collectionService = {};

function preload(dataBase) {
    return async function (req, res, next){
        const id = req.params.id;
        const data = await collectionService.getById(id, dataBase);
        res.locals.data = data;

        next();
    };
}

module.exports = {
    preload
}