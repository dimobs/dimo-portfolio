const { Schema, model, Desical, Types: { ObjectId } } = require('mongoose');


const URL_PATTERN = /^https?:\/\/(.+)/;

const paySchema = new Schema({
    sender: { type: String, require: false, minlength: [3, 'Pay listing name must be at least 3 characters long'] },
    resiver: { type: String, require: false, minlength: [3, 'Pay listing name must be at least 3 characters long'] },
    imageUrl: { type: String, require: false,
    //     validate:{
    //         validator(value) {
    //             return URL_PATTERN.test(value);
    //         },
    //         message: 'Image must be a valid URL'
    //     }
    },
    description: { type: String },
    date: {
        type: String, require:false, 
        // minlength: [10, `Data must be 10 characters longn`],
        // maxlength: [10, 'Data must be 10 characters long']
    },
    amount: { type: Number, require: true },
    isDeleted: { type: Boolean, default: false },
    owner: { type: ObjectId, ref: 'User', require: true },
    // votes: {type: [ObjectId], ref:'User', default: []},
    // rating: { type: Number, default: 0}
});

const Pay = model('Pay', paySchema);

module.exports = Pay;