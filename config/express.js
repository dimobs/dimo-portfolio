const express = require('express');
const hbs = require('express-handlebars');
const session = require('express-session');
const userSession = require('../middlewares/userSession');

module.exports = (app) => {
    app.engine('hbs', hbs.create({
        extname: '.hbs'
    }).engine);
    app.set('view engine', 'hbs');

    app.use(session({
        secret: 'my super duper secret',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: 'auto' }
    }));
    app.use(express.urlencoded({ extended: true })); //парсва бодито при POST заявки
    app.use(userSession())
    app.use('/static', express.static('static')); //сервирва статични файлове
}