const { Schema, model, Types: {ObjectId} } = require('mongoose');
const { comparePassword, hashPassword } = require('../services/util');

const userSchema = new Schema({
    username: { type: String, required: true, minlength: 3, unique: true },
    email: { type: String, required: false },
    gender: { type: String, required: false, enum: ['male','female']},
    hashedPassword: { type: String, required: true },
    // pays: {type: [ObjectId], ref: 'Pay', default: []},
    // trips: {type: [ObjectId], ref: 'Trip', default: []}
});

userSchema.index({ username: 1 }, { //login with?
    unique: true,
    collation: {
        //keys insensitive
        locale: 'en',
        strength: 2
    }
});

userSchema.methods.comparePassword = async function (password) {
    return await comparePassword(password, this.hashedPassword);
};

userSchema.pre('save', async function (next) {
    if (this.isModified('hashedPassword')) {
        this.hashedPassword = await hashPassword(this.hashedPassword);
    }

    next();
});

const User = model('User', userSchema);

module.exports = User;