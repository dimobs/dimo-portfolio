const Trip = require('../models/Trip');
const Pay = require('../models/Pay');
const { payModel } = require('./util');
const { post } = require('../controllers/editPay');

async function getById(id, dataBase) {
    if(dataBase == "pay"){
        const item = await Pay.findById(id).where({ isDeleted: false });
        if (item) {
            return payModel(item);
        } else {
            return undefined;
        }
    }else {
        const item = await Trip.findById(id);
        if (item) {
            return payModel(item);
        } else {
            return undefined;
        }
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

async function createTrip(trip) {
    const result = new Trip(trip);
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
    existing.date = pay.date || "22.22.2022";
    existing.amount = pay.amount;
    // existing.accessories = car.accessories;

    await existing.save();

    return true;
}

// async function deleteById(id, ownerId) {
//        const existing = await Pay.findById(id).where({ isDeleted: false });
//     if (existing.owner != ownerId) {
//         return false;
//     }

async function deleteById(id) {
return Pay.findByIdAndDelete(id);
};

async function vote(postId, userId, value) {
const post = await Pay.findById(postId);

if(post.votes.includes(userId)) {
    throw new Error('User has already voted')
}
post.votes.push(userId);
post.rating += value;

await post.save();
}

// async function getPayById(id) {
//    return Pay.findById(id).populate('owner', 'sender', 'resiver');
// }


module.exports = () => (req, res, next) => {
    req.storage = {
        createPay,
        getAll,
        getById,
        updateById,
        deleteById,
        createTrip,
        vote
        // getPayById
    };
    next();
};
