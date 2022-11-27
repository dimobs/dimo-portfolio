// module.exports = {
//     administrator(req, res) {
//         res.render('administrator', {title: "Admin Pannel"});
//     }
// };



const router = require('express').Router();

  router.get('/administrator', (req, res) => {
        res.render('administrator', {title: "Admin Pannel"});
    });

module.exports = router;