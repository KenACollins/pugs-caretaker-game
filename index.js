// Import Express package and Body Parser Express middleware.
const express = require('express');
// const bodyParser = require('body-parser');

// Start Express server.
const app = express();

// Help Express in production locate routes in the front-end React client app when route handlers are not defined for them in the Express app.
if (process.env.NODE_ENV === 'production') {
    // If Express receives a route that precisely matches a file inside the front-end/build/ path such as static/js/main.js or static/css/main.css...
    app.use(express.static('front-end/build'));

    // Otherwise, Express will serve up front-end/build/index.html if it does not recognize the route.
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'front-end', 'build', 'index.html'));
    });
}

// Express tells Node what port to listen on.  We get it dynamically from Heroku if running in production.
const PORT = process.env.PORT || 5000;
app.listen(PORT);