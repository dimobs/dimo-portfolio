const { Schema, model, Desical, Types: { ObjectId } } = require('mongoose');
const mongoose = require('mongoose');


const paySchema = new Schema({
    sender: { type: String, require: false, minlength: [3, 'Pay listing name must be at least 3 characters long'] },
    resiver: { type: String, require: false, minlength: [3, 'Pay listing name must be at least 3 characters long'] },
    imageUrl: { type: String },
    description: { type: String },
    date: { type: String, require: false},
    amount: { type: Number, require: true, min: 1 },
    isDeleted: { type: Boolean, default: false },
    owner: { type: ObjectId, ref: 'User' }
});

const Pay = model('Pay', paySchema);

module.exports = Pay;