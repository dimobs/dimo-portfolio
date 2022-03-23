const Pay = require('../models/Pay');
const { payModel } = require('./util');

async function getById(id) {
       const pay = await Pay.findById(id).where({ isDeleted: false });
      
    if (pay) {
        return payModel(pay);
           } else {
        return undefined;
    }
}

async function getAll(query) {
    const options = {
        isDeleted: false
    };

    // const pays = await Pay.find({}).lean(); //Лийм изпраща всички данни
    //    return pays;
    const pays = await Pay.find(options); //View Model копира само инфото, която да пратим
    return pays.map(payModel);
}

async function createPay(pay) {
    const result = new Pay(pay);
    await result.save();
}

async function updateById(id, pay, ownerId) {
    const existing = await Pay.findById(id).where({ isDeleted: false });

    if (existing.owner != ownerId) {
        return false;
    }

    existing.sender = pay.sender;
    existing.resiver = pay.resiver;
    existing.description = pay.description || undefined;
    existing.imageUrl = pay.imageUrl || "No image";
    existing.amount = pay.amount;
    // existing.accessories = car.accessories;

    await existing.save();

    return true;
}

async function deleteById(id, ownerId) {
    console.log('level4');
    const existing = await Pay.findById(id).where({isDeleted: false});
console.log(existing);
    if(existing.owner !=ownerId) {
        console.log(existing.owner);
        console.log(ownerId);
        return false;
    }

    await Pay.findByIdAndUpdate(id, {isDeleted: true});
    return true;
}


module.exports = () => (req, res, next) => {
    req.storage = {
        createPay,
        getAll,
        getById,
        updateById,
        deleteById
    };
    next();
};
