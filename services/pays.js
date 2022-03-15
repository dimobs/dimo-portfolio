const Pay = require('../models/Pay');
 const {payModel} = require('./util')

async function getById(id) {
const pay = await Pay.findById(id).where({isDeleted: false});
return (pay);
}

async function getAll(query) {
    const options = {
        isDeleted: false
    };

    // const pays = await Pay.find({}).lean(); //Лийм изпраща всички данни
    //    return pays;
    const pays = await Pay.find({}); //View Model копира само инфото, която да пратим
    return pays.map(payModel);
}

async function createPay(pay) {
    const result = new Pay(pay);
    await result.save();
}

module.exports = () => (req, res, next) => {
    req.storage = {
        createPay,
        getAll,
        getById
    };
    next();
};
