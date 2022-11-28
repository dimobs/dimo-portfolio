const router = require('express').Router();
const  administrator  = require('../controllers/administrator');
const { paymentHistory } = require('../controllers/paymentHistory');
const { isLoggedIn } = require('../middlewares/guards');
const createPay = require('../controllers/createPay');

const { greet } = require("../static/js/greetings.js");
const time = greet();

router.get('/', (req, res) => {
    res.render('index', { title: "Welcome", time })
});

router.get('/about',(req, res) => {
    res.render('about', { title: "Welcome", time })
});

router.get('/administrator', administrator);
router.get('/paymentHistory', isLoggedIn(), paymentHistory);

router.get('/createPay', isLoggedIn, createPay.get);
router.post('/createPay', isLoggedIn, createPay.post);
// app.route('/createPay')
// .get(isLoggedIn(), createPay.get)
// .post(isLoggedIn(), createPay.post);

module.exports = router;


// const {greet} = require("../static/js/greetings.js");
// const time = greet();

// module.exports = {
//     home(req, res) {

//         res.render('index', { title: "Welcome", time })
//     }
// };