const authController = require('../controllers/auth');
const homeController = require('../controllers/home');
const  administrator  = require('../controllers/administrator');

// const tripController = require('../controllers/trip');
// const postService = require('../services/post');

module.exports = (app) => {
    app.use(authController);
    app.use(homeController);
    app.use(administrator)
    // app.use(postService);
    // app.use(tripController);
}