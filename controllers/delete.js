module.exports = {
    async get(req, res) {
        const id = req.params.id;
console.log(id);
        try {
            if (await req.storage.deleteById(id, req.session.user.id)) {
                res.redirect('/paymentHistory');
            } else {
                return res.redirect('/login');
            }
        } catch (err) {
            console.log('Error deleting record');
            res.locals.errors = [{ msg: err.message }];

            console.log('Attempted to delete non-exsisted Id', id);
            res.redirect('/404');
        }
    }
}


