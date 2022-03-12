const {Schema, model, Types:{ObjectId}} = require('mongoose');


const paySchema = new Schema({
    nameSender: {type: String, require: false, minlength: [3, 'Pay listing name must be at least 3 characters long']},
    nameResiver: {type: String, require: false, minlength: [3, 'Pay listing name must be at least 3 characters long']},
    imageUrl: {type: String},
    price: {type: Number, require: false, min: 0},
    
    // owner: {type: ObjectId, ref: "User"}
});

const Pay = model('Pay', paySchema);

module.exports = Pay;