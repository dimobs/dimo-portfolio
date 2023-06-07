module.exports = {
    async get(req, res) {
        res.render('user', { title: 'User Listing' });
    },

    async post(req, res) {
        const data = (
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
                .withMessage('Password don\'t match')
        )

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
    }
}

// async post('/#',
//     body('username'),
//     body('NewUsername').trim(),
//     body('password').trim(),
//     body('repeatPassword').trim(),
//     body('NewUsername')
//         .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
//         .isAlphanumeric().withMessage('Username may contain only alphanumeric characters'),
//     body('password')
//         .isLength({ min: 3 }).withMessage('Password must be at least 3 characters long')
//         .isAlphanumeric().withMessage('Password may contain only alphanumeric characters'),
//     body('repeatPassword')
//         .custom((value, { req }) =>
//             value == req.body.password)
//         .withMessage('Password don\'t match'),
//     async (req, res) => {
//         const { errors } = validationResult(req);

//         try {
//             if (errors.length > 0) {
//                 throw errors;
//             }
//     await req.auth.userUpdate(req.body.username, req.body.NewUsername, req.body.password, req.body.repeatPassword);
//             req.auth.logout();
//             res.redirect('/login');
//         } catch (err) {
//             res.locals.errors = mapError(err);
//             res.render('404', { title: 'User Info', data: { username: req.body.username } });
//         }
//     });