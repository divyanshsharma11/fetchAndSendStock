/**
 * @author - Divyansh Sharma
 * @description - Webscraping Project--- Getting Real Time Stock Using FINNHUB Free API key and Node.js
 */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('../Stock-NodemailSender/route');

const app = express();
app.use(bodyParser.json());

// Use the routes defined in routes.js
app.use('/api', routes);

const PORT = process.env.PORT || 3000; // Use a more common port like 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
