
module.exports = app => {
    app.get('/proxy/random', (req, res, next) => {
        console.log('Inside pugRoutes...');
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        console.log('res', res);
        //next();
        res.send('Thanks!');
        //res.send();
    });
}