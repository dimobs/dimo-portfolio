module.exports = {
    async get(req, res) {
        const id = req.params.id;
         
        try {
            console.log('level 1');

            if (await req.storage.deleteById(id, req.session.user.id)) {

                console.log('level 2');
                res.redirect('/paymentHistory');
            }
        }catch (err) {
            console.log('Attempted to delete non-exsisted Id', id);
            res.redirect('/paymentHistory');
        }
    }
}