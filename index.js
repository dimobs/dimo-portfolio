const express = require('express');
const hbs = require('express-handlebars');
const initDB = require('./models')

const { home } = require('./controllers/home');
const login = require('./controllers/auth');
const register = require('./controllers/auth');
const { about } = require('./controllers/about');
const { notFound } = require('./controllers/notFound');
const { administrator } = require('./controllers/administrator');
const  createPay = require('./controllers/createPay');

const {isLoggedIn} = require('./service/util');
start();

async function start() {
    await initDB();

    const app = express();
    app.engine('hbs', hbs.create({
        extname: '.hbs'
    }).engine);
    app.set('view engine', 'hbs');

    app.use(express.urlencoded({ extended: true })); //парсва бодито при POST заявки
    app.use('/static', express.static('static')); //сервирва статични файлове

    app.get('/', home);
    app.get('/administrator', administrator);
    app.get('/about', about);

    app.route('/createPay')
    .get(isLoggedIn(), createPay.get)
    .post(isLoggedIn(), createPay.post);

    // app.get('/createPay', createPay)

    app.get('/login', login);
    app.get('/register', register);
    app.all('*', notFound);

    app.listen(3000, () => console.log(' Server is running at: http://localhost:3000'));
}
