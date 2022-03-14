const Pay = require('../models/Pay');
// const {payPreview} = require('./util')

async function getById(id) {

}

async function getAll (query) {
    const options = {
        isDeleted: false
    };

    const pays = await Pay.find({});
       return pays;
} 

async function createPay (pay) {
     const result = new Pay(pay);
    await result.save();
}

module.exports = () => (req, res, next) => {
    req.storage = {
        createPay,
        getAll
    };
    next();
};
