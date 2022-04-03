const express = require('express');
const expressConfig = require('./config/express');
const initDB = require('./config/database')

const payService = require('./services/pays');
const authService = require('./services/auth');

const { home } = require('./controllers/home');
const { about } = require('./controllers/about');
const createPay = require('./controllers/createPay');
const { profile } = require('./controllers/profile');
const user = require('./controllers/user');
const editPay = require('./controllers/editPay');
const deletePay = require('./controllers/delete');
const authController = require('./controllers/auth');
const { administrator } = require('./controllers/administrator');
const { paymentHistory } = require('./controllers/paymentHistory');
const { notFound } = require('./controllers/notFound');
const { isLoggedIn } = require('./services/util');

start();

async function start() {
    await initDB();

    const app = express();
    expressConfig(app)

    app.use(payService());
    app.use(authService());

    function couting() {
        return function (req, res, next) {
            if (req.session.view) {
                req.session.view++;
            } else {
                req.session.view = 1;
            }
            next();
        };
    }

    app.get('/', home);
    app.get('/administrator', administrator);
    app.get('/paymentHistory', isLoggedIn(), couting(), paymentHistory);
    app.get('/about', about);

    app.route('/createPay')
        .get(isLoggedIn(), createPay.get)
        .post(isLoggedIn(), createPay.post);

    app.route('/user')
        .get(isLoggedIn(), user.get)
        .post(isLoggedIn(), user.post);

    app.get('/profile', isLoggedIn(), couting(), profile);
    ;

    app.route('/editPay/:id')
        .get(isLoggedIn(), editPay.get)
        .post(isLoggedIn(), editPay.post)

    app.route('/delete/:id')
        .get(isLoggedIn(), deletePay.get)

    app.use(authController);

    app.all('*', notFound);

    app.listen(3000, () => console.log(' Server is running at: http://localhost:3000'));
}
