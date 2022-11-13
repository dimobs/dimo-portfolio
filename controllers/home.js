// const router = require('express').Router();

// router.get('/', (req, res) =>{
//     res.render('home');
// })
// w

const greet = require("../static/js/greetings.js");
const time = greet();

module.exports = {
    async home(req, res) {

        res.render('index', { title: "Welcome", time })
    }
};