const express = require('express');
const hbs = require('express-handlebars');

const {home} = require('./controllers/home');
const login = require('./controllers/auth');
const register = require('./controllers/auth');
const {about} = require('./controllers/about');
const {notFound} = require('./controllers/notFound');

start();

function start() {

    const app = express();
    app.engine('hbs', hbs.create({
        extname: '.hbs'
    }).engine);
    app.set('view engine', 'hbs');

    app.use(express.urlencoded({ extended: true })); //парсва бодито при POST заявки
    app.use('/static', express.static('static')); //сервирва статични файлове

    app.get('/', home);
    app.get('/about', about);
    app.get('/login', login);
    app.get('/register', register);
    app.all('*', notFound);

    app.listen(3000, () => console.log(' Server is running at: http://localhost:3000'));   
}
