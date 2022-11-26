module.exports = () => (req, res, next) => {
    if (req.session.user) {
        //за да го вижда темплейта на сайта 
        res.locals.user = req.session.user;
        res.locals.hasUser = true;
    }
    
    next();
};

