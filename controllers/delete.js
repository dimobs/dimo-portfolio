module.exports = {
    async get(req, res) {
        const id = req.params.id;
         
        try {
            if (await req.storage.deleteById(id, req.session.user.id)) {
                res.redirect('/paymentHistory');
            } else{
                return res.redirect('/login');
            }
        }catch (err) {
            console.log('Attempted to delete non-exsisted Id', id);
            res.redirect('/404');
        }
    }
}