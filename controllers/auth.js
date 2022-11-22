const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const { mapError } = require('../services/util');
const { isGuest, isLoggedIn } = require('../middlewares/guards')
const {vote} = require('../services/post')

const router = Router();

router.get('/register', isGuest(), (req, res) => {
    res.render('register', { title: 'Register' });
});

router.post('/register', isGuest(),
    body('username').trim(),
    body('password').trim(),
    body('repeatPassword').trim(),
    body('email').trim(),
    body('username')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
        .isAlphanumeric().withMessage('Username may contain only alphanumeric characters'),
    body('password')
        .isLength({ min: 3 }).withMessage('Password must be at least 3 characters long')
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
            await req.auth.register(req.body.username, req.body.password, req.body.email, req.body.gender,);
            res.redirect('/');
        } catch (err) {
            const isMale = req.body.gender == "male";
            res.locals.errors = mapError(err);
            res.render('register', {
                title: 'Register', data: {
                    isMale,
                    username: req.body.username,
                    password: req.body.password,
                    repeatPassword: req.body.repeatPassword,
                    email: req.body.email
                }
            });
        }
    });

router.get('/login', isGuest(), (req, res) => {
    res.render('login', { title: 'Login' });
});

router.post('/login', isGuest(), async (req, res) => {
    try {
        // const user = await (req.body.username, req.body.password);
        // req.session.user = user;
        await req.auth.login(req.body.username, req.body.password);
        res.redirect('/paymentHistory');
        // res.redirect('/');
    } catch (err) {
        const reLogin = req.body.username;
        console.error(err.message);
        const errors = mapError(err);
        res.locals.errors = [{ msg: err.message }];
        res.render('login', { title: 'Login', reLogin });
    }
});

router.get('/logout', isLoggedIn(), (req, res) => {
    req.auth.logout();
    res.redirect('/');
});

router.get('/vote/:id/:type', isLoggedIn(), async (req, res) => {
    const id = req.params.id;
    const value = req.params.type == 'approve' ? 1 : -1;

    try {
      await req.storage.vote(id, req.session.user.id, value)
      
        res.redirect('/paymentHistory');
    } catch (err) {
        console.error(err.message);
        const errors = mapError(err);
        res.locals.errors = [{ msg: err.message }];
        res.render('paymentHistory', { title: 'History', errors });
    }
})

module.exports = router;