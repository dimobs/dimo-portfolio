const { Schema, model, Desical, Types: { ObjectId } } = require('mongoose');


const URL_PATTERN = /^https?:\/\/(.+)/;

const tripSchema = new Schema({
    start: { type: String, require: false},
    end: { type: String, require: false},
    date: { type: String, require: false},
    time: { type: String, require: false},
    BrandImg: { type: String, require: false},
    carBrand: { type: String, require: false},
    seats: { type: Number, require: false},
    price: { type: Number, require: false},
    description: { type: String, require: false},
    owner: { type: ObjectId, ref: 'User', require: false},
    buddies: {type: [ObjectId], ref: 'User', default: []},
   
});

const Trip = model('Trip', tripSchema);

module.exports = Trip;