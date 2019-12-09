// keys.js - Figure out which set of credentials to return based on environment (dev or prod).
console.log('****************** FRONT-END RUNNING IN: ' + process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
    // We are in production, return prod set of keys.
    module.exports = require('./prod');
}
else {
    // We are in development, return dev set of keys.
    module.exports = require('./dev');
}