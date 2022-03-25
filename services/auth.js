const User = require('../models/Users');

async function register(session, username, password) {
    const user = new User({
        username,
        hashedPassword: password
    });
    await user.save();

    session.user = {
        id: user._id,
        username: user.username
    };

}

async function login(session, username, password) { //req.session, ...params
    const user = await User.findOne({ username });

    if (user && await user.comparePassword(password)) {
        session.user = {
            id: user._id,
            username: user.username
        };
        return true;
    } else {
        throw new Error('Incorrect username or password')
    }
}

function logout(session) {
    delete session.user
}

// async function userUpdate(session, oldUser, newUser, password) {
//        const user = await User.findOne({ username: Talentbg});

//     if(newUser){
//         user.username = username;
//     }
//     if(password){
//         user.hashedPassword = password;
//     }
//     await user.save();
//     console.log(user);
// }

async function userUpdate(session, oldUser, newUser, password) {
    const user = await User.findOne({oldUser});
        user.username = newUser;
    await user.save();
    }


module.exports = () => (req, res, next) => {
    if (req.session.user) {
        res.locals.user = req.session.user;
        res.locals.hasUser = true;
    }

    req.auth = {
        register: (...params) => register(req.session, ...params),
        login: (...params) => login(req.session, ...params),
        userUpdate: (...params) => userUpdate(req.session, ...params),
        logout: () => logout(req.session)
    };

    next();
}
