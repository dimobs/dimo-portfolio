const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const { mapError, isLoggedIn } = require('../services/util');

const router = Router();

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

router.post('/register',
    body('username').trim(),
    body('password').trim(),
    body('repeatPassword').trim(),
    body('username')
        .isLength({ min: 3 }).withMessage('Username must be at least 5 characters long')
        .isAlphanumeric().withMessage('Username may contain only alphanumeric characters'),
    body('password')
        .isLength({ min: 3 }).withMessage('Password must be at least 8 characters long')
        .isAlphanumeric().withMessage('Password may contain only alphanumeric characters'),
    body('repeatPassword')
        .custom((value, { req }) => value == req.body.password)
        .withMessage('Password don\'t match'),
    async (req, res) => {
        const { errors } = validationResult(req);

        try {
            if (errors.length > 0) {
                throw errors;
            }
            await req.auth.register(req.body.username, req.body.password);
            res.redirect('/');
        } catch (err) {
            res.locals.errors = mapError(err);
            res.render('register', { title: 'Register', data: { username: req.body.username, password: req.body.password } });
        }
    });

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

router.post('/login', async (req, res) => {
    try {
        await req.auth.login(req.body.username, req.body.password);

        res.redirect('/paymentHistory');
    } catch (err) {
        console.error(err.message);
        res.locals.errors = [{ msg: err.message }];
        res.render('login', { title: 'Login' });
    }
});

router.get('/logout', (req, res) => {
    req.auth.logout();
    res.redirect('/');
});


router.post('/#',
    body('username'),
    body('NewUsername').trim(),
    body('password').trim(),
    body('repeatPassword').trim(),
    body('NewUsername')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
        .isAlphanumeric().withMessage('Username may contain only alphanumeric characters'),
    body('password')
        .isLength({ min: 3 }).withMessage('Password must be at least 3 characters long')
        .isAlphanumeric().withMessage('Password may contain only alphanumeric characters'),
    body('repeatPassword')
        .custom((value, { req }) =>
            value == req.body.password)
        .withMessage('Password don\'t match'),
    async (req, res) => {
        const { errors } = validationResult(req);

        try {
            if (errors.length > 0) {
                throw errors;
            }
    await req.auth.userUpdate(req.body.username, req.body.NewUsername, req.body.password, req.body.repeatPassword);
            req.auth.logout();
            res.redirect('/login');
        } catch (err) {
            res.locals.errors = mapError(err);
            res.render('404', { title: 'User Info', data: { username: req.body.username } });
        }
    });

module.exports = router;