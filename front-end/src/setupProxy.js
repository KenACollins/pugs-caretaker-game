// Applicable to full stack apps running Express server-side and create-react-app (CRA) version 2 or higher on the client.
// This file does not need to be imported anywhere. Just install http-proxy-middleware in the React client and place this file in src folder. CRA will find and load it.
const proxy = require('http-proxy-middleware');
 
module.exports = function(app) {
    // For the relative URI(s) specified in the array below, redirect to the same target.
    app.use(proxy(['/random'], { target: 'http://pugme.herokuapp.com' }));
};