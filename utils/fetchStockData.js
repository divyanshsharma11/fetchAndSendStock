// utils.js
const axios = require('axios');
const fs = require('fs');
const path = require('path');


// Fetch stock data for a given symbol
async function fetchStockData(symbol) {
    const apiKey = process.env.FINNHUB_API_KEY;
    const secretHeader = process.env.FINNHUB_SECRET_HEADER;

    console.log(`Fetching stock data for symbol: ${symbol}...`);
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`;

    try {
        const response = await axios.get(url, {
            headers: {
                'X-Finnhub-Secret': secretHeader
            }
        });
        const data = response.data;

        if (data.c) {
            const latestData = {
                currentPrice: data.c,
                highPrice: data.h,
                lowPrice: data.l,
                openPrice: data.o,
                previousClose: data.pc
            };

            // Store the data in a JSON file
            // Directory to save fetched data
            const filePath = path.join(__dirname, `../fetchedData/${symbol}stockData.json`);
            console.log("filePath :: ", filePath)

            // Ensure the `fetchedData` directory exists
            // if (!fs.existsSync(filePath)) {
            //     fs.mkdirSync(filePath, { recursive: true });
            //     console.log(`Created directory: ${filePath}`);
            // }
            // const filePath = path.join(__dirname, 'stockData.json');
            fs.writeFileSync(filePath, JSON.stringify(latestData, null, 2));


            console.log(`Stock data for ${symbol} stored successfully.`);
            return latestData;
        } else {
            console.error('No valid data received from the API');
            return null;
        }
    } catch (error) {
        console.error(`Error fetching stock data: ${error.message}`);
        return null;
    }
}

module.exports = { fetchStockData };
