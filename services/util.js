const bcrypt = require('bcrypt');

function accessoryViewModel(accessory) {
    // return {
    //     id: accessory._id,
    //     name: accessory.name,
    //     description: accessory.description,
    //     imageUrl: accessory.imageUrl,
    //     price: accessory.price,
    //     owner: accessory.owner
    // };
}

function payModel(pay) {
    const model = {
        id: pay._id,
        sender: pay.sender,
        resiver: pay.resiver,
        imageUrl: pay.imageUrl,
        amount: pay.amount,
        description: pay.description,
        date: pay.date,
        owner: pay.owner,
        votes: pay.votes.map(voterViewModel),
        rating: pay.rating,
    };

    // if (model.accessories.length > 0 && model.accessories[0].name) {
    //     model.accessories = model.accessories.map(accessoryViewModel);
    // }
 
    return model;
}

async function hashPassword(password) {
    return bcrypt.hash(password, 10);
}

async function comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
}

function mapError(error) {
    if (Array.isArray(error)) {
        return error;
    } else if (error.name == 'MongoServerError') {
        if (error.code == 11000) {
            return [{
                msg: 'Username already exists'
            }];
        } else {
            return [{
                msg: 'Request error'
            }];
        }
    } else if (error.name == 'ValidationError') {
        return Object.values(error.errors).map(e => ({ msg: e.message }));
    } else if (typeof error.message == 'string') {
        return [{
            msg: error.message
        }];
    } else {
        return [{
            msg: 'Request error'
        }];
    }
}

function voterViewModel(user) {
 
    return {
        id: user._id,
        email: user.email,
        // username: user.username
    }

}

module.exports = {
    accessoryViewModel,
    payModel,
    hashPassword,
    comparePassword,
    mapError
};