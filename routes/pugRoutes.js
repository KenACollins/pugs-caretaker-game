
module.exports = app => {
    app.get('/proxy/random', (req, res, next) => {
        //res.send('Thanks!');
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        //res.send();
        console.log('res', res);
        next();
    });
}