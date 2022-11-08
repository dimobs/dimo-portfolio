// const router = require('express').Router();

// router.get('/', (req, res) =>{
//     res.render('home');
// })



module.exports = {
    async home(req, res) {

        res.render('index', { title: "Home Page", })
    }
};