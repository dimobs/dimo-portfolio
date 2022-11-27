const router = require('express').Router();
// const  administrator  = require('../controllers/administrator');


const { greet } = require("../static/js/greetings.js");
const time = greet();

router.get('/', (req, res) => {
    res.render('index', { title: "Welcome", time })
});

router.get('/about',(req, res) => {
    res.render('about', { title: "Welcome", time })
});
// router.get('/administrator', (req, res) => {
//     res.render('administrator', {title: "Admin Pannel"});
// });

module.exports = router;


// const {greet} = require("../static/js/greetings.js");
// const time = greet();

// module.exports = {
//     home(req, res) {

//         res.render('index', { title: "Welcome", time })
//     }
// };