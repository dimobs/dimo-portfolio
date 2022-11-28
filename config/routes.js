const authController = require('../controllers/auth');
const homeController = require('../controllers/home');
// const postService = require('../services/post');

module.exports = (app) => {
    app.use(authController);
    app.use(homeController);


    app.get('*', (req, res) => {
        res.render('404', {title: 'Page Not Found'})
    });
    // app.use(postService);
    // app.use(tripController);
}