// routes.js
const express = require('express');
const { fetchStockData } = require('../Stock-NodemailSender/utils');
const { sendEmail } = require('../Stock-NodemailSender/emailStocks');

const router = express.Router();

// Route to handle stock data fetching
router.post('/fetchStockData', async (req, res) => {
    const symbol = req.body.symbol || 'AAPL'; // Default to 'AAPL' if no symbol is provided
    console.log(`Received request to fetch stock data for: ${symbol}`);

    try {
        const stockData = await fetchStockData(symbol);
        if (stockData) {
            res.json({ success: true, data: stockData });
        } else {
            res.status(500).json({ success: false, message: 'Failed to fetch stock data' });
        }
    } catch (error) {
        console.error(`Error processing request: ${error.message}`);
        res.status(500).json({ success: false, message: error.message });
    }
});
// Route to handle sending emails
router.post('/sendEmail', async (req, res) => {
    const recipientEmail = req.body.email;

    if (!recipientEmail) {
        return res.status(400).json({ success: false, message: 'Recipient email is required' });
    }

    console.log(`Received request to send email to: ${recipientEmail}`);

    try {
        const result = await sendEmail(recipientEmail);
        if (result.success) {
            res.json({ success: true, message: 'Email sent successfully', info: result.info });
        } else {
            res.status(500).json({ success: false, message: 'Failed to send email', error: result.error });
        }
    } catch (error) {
        console.error(`Error sending email: ${error.message}`);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
