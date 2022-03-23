module.exports = {
    async home(req, res) {
           
        res.render('index',  { title: "Home Page",   })
    }
    };