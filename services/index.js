const express = require('express');
const expressConfig = require('./config/express');
const initDB = require('./config/database');
const routesConfig = require('./config/routes');

const recordService = require('./services/post');
const authService = require('./services/auth');

const { home } = require('./controllers/home');
const { trip } = require('./controllers/trip');
const { about } = require('./controllers/about');
const createPay = require('./controllers/createPay');
const createTrip = require('./controllers/createTrip');
const { profile } = require('./controllers/profile');
const user = require('./controllers/user');
const editPay = require('./controllers/editPay');
const deletePay = require('./controllers/delete');
const authController = require('./controllers/auth');
const { administrator } = require('./controllers/administrator');
const { paymentHistory } = require('./controllers/paymentHistory');
const { notFound } = require('./controllers/notFound');
const { isLoggedIn } = require('./middlewares/guards');


start();

async function start() {
    const app = express();

    expressConfig(app);
    await initDB(app);
    routesConfig(app);

    app.use(recordService());
    app.use(authService());

    // function couting() {
    //     return function (req, res, next) {
    //         if (req.session.view) {
    //             req.session.view++;
    //         } else {
    //             req.session.view = 1;
    //         }
    //         next();
    //     };
    // }

    app.get('/', home);
    app.get('/trip', trip);
    app.get('/administrator', administrator);
    app.get('/paymentHistory', isLoggedIn(), paymentHistory);
    app.get('/about', about);

    app.route('/createPay')
        .get(isLoggedIn(), createPay.get)
        .post(isLoggedIn(), createPay.post);

        app.route('/createTrip')
        .get(isLoggedIn(), createTrip.get)
        .post(isLoggedIn(), createTrip.post);

    app.route('/user')
        .get(isLoggedIn(), user.get)
        .post(isLoggedIn(), user.post);

    app.get('/profile', isLoggedIn(), profile);
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
