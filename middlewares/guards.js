const { response } = require("express");

function isLoggedIn() {
    return function (req, res, next) {
        if (req.session.user) {
            next();
        } else {
            res.redirect('/login');
        }
    };
}

function isGuest() {
    return function (req, res, next) {
        if (req.session.user) {
            res.redirect('/');
        } else {
            next();
        }
    };
}

function isOwner() {
    return function (req, res, next) {
        const userId = req.session.user?.id;
        if(req.locals.pay.owner == userId ){
            next();
        }else {
            res.redirect('/login');
        }
    };
}

module.exports = {
    isLoggedIn,
    isGuest,
    isOwner
}