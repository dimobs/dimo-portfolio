// const router = require('express').Router();
// const {greet} = require("../static/js/greetings.js");
// const time = greet();

// router.get('/', (req, res) =>{
//     res.render('login', { title: "Welcome", time })
// })


const {greet} = require("../static/js/greetings.js");
const time = greet();

module.exports = {
    async home(req, res) {

        res.render('index', { title: "Welcome", time })
    }
};