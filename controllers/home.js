const router = require('express').Router();

const { greet } = require("../static/js/greetings.js");
const time = greet();

router.get('/', (req, res) => {
    res.render('index', { title: "Welcome", time })
});

module.exports = router;


// const {greet} = require("../static/js/greetings.js");
// const time = greet();

// module.exports = {
//     home(req, res) {

//         res.render('index', { title: "Welcome", time })
//     }
// };