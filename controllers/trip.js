const router = require('express').Router();
const {isLoggedIn} = require('../middlewares/guards');

router.get('/createTrip', isLoggedIn(), (req, res) => {
res.render('create', { title: 'Create Trip Offer'})
});

router.post('/createTrip', isLoggedIn(), (req, res) => {
    console.log(req.body);
re.redirect('/trips');
});

module.exports = router;

// module.exports = {
//     async trip(req, res) {
           
//         res.render('trip',  { title: "Home Page",   })
//     }
//     };