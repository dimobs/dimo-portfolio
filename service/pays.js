const Pay = require('../models/pay');

async function getById(id) {

}

async function createPay (pay) {
    const result = new Pay(pay);
    await result.save();
}

module.exports = () => (req, res, next) => {
    req.storage = {
        create
    };
    console.log(req.storage);
    next();
};
