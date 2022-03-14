module.exports = {
    async paymentHistory(req, res){
        const tablePays = await req.storage.getAll(req.query);

        res.render('paymentHistory', {tablePays, title: 'Paysicly', query: req.query, errors: [
            {msg:'Text error'}] });

        }
    
}