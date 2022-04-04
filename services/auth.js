const User = require('../models/Users');
const {userSession} = require('../middlewares/userSession');

async function register(session, username, password) {
    const existing = await getUserByUsername(username);

    if (existing) {
        throw new Error('Username is taken')
    }
    const user = new User({
        username,
        hashedPassword: password
    });
    await user.save();

    session.user = {
        id: user._id,
        username: user.username
    };
};

//TODO vertity user uniq
async function getUserByUsername(username) {
    const user = await User.findOne({ username: new RegExp(`^${username}$`, 'i') });
    return user;
}

async function login(session, username, password) { //req.session, ...params
    const user = await User.findOne({ username });
// const user = await getUserByUsername(username)
// if(!user){
//     throw new Error(`User doesn\'t exist`);
// }
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


async function userUpdate(session, username, newUser, password) {
            const user = await User.findOne({ username });
    if (newUser) {
        username = newUser;
        user.username = username;
    }
    if (password) {
        console.log('new pass');
        user.hashedPassword = password;
    }
    await user.save();
    return true;
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



// module.exports = () => (req, res, next) => {
//     if (req.session.user) {
//         res.locals.user = req.session.user;
//         res.locals.hasUser = true;
//     }

//     req.auth = {
//         register: (...params) => register(req.session, ...params),
//         login: (...params) => login(req.session, ...params),
//         userUpdate: (...params) => userUpdate(req.session, ...params),
//         logout: () => logout(req.session)
//     };

//     next();
// }
