const router = require('express').Router();
const administrator = require('../controllers/administrator');
const { paymentHistory } = require('../controllers/paymentHistory');
const { isLoggedIn, isOwner } = require('../middlewares/guards');
const createPay = require('../controllers/createPay');
const user = require('../controllers/user');
const { profile } = require('../controllers/profile');
const editPay = require('../controllers/editPay');
const deletePay = require('../controllers/delete');
const { about } = require('../controllers/about');


const { greet } = require("../static/js/greetings.js");
const { preload } = require('../middlewares/preload');
const time = greet();

router.get('/', (req, res) => {
    res.render('index', { title: "Welcome", time })
});

// router.get('/', (req, res) => {
//     res.render('about', { title: "Welcome", time })
// });

router.get('/about', about);
router.get('/administrator', administrator);
router.get('/paymentHistory', isLoggedIn(), paymentHistory);
// router.get('/profile', isLoggedIn(), profile);
router.get('/profile', isLoggedIn(), async (req, res) => {
    const paysByUser = await req.storage.getPostByAuthor(res.locals.user.id);
    res.locals.user.payCount = paysByUser.length;
    res.locals.user.tablePays = paysByUser;
    res.locals.user.tablePays.map(x => {
        x.isOwner = true
    });
    console.log('rrrr', res.locals.user);
    res.render('profile', { title: 'Profile Page' })
});

router.get('/delete/:id', isLoggedIn(), deletePay.get);

router.get('/createPay', isLoggedIn(), createPay.get);
router.post('/createPay', isLoggedIn(), createPay.post);

router.get('/createPay', isLoggedIn(), createPay.get);
router.post('/createPay', isLoggedIn(), createPay.post);

router.get('/editPay/:id', isLoggedIn(), editPay.get);
// router.post('/editPay/:id', isLoggedIn(), editPay.post);
// router.get('/editPay/:id', isLoggedIn(), preload(true), (req, res) => {});
router.post('/editPay/:id', preload(), isOwner(), editPay.post);

module.exports = router;


// const {greet} = require("../static/js/greetings.js");
// const time = greet();

// module.exports = {
//     home(req, res) {

//         res.render('index', { title: "Welcome", time })
//     }
// };