// fetchYahooFinance2Data.js

const yahooFinance = require('yahoo-finance2').default;
const { createObjectCsvWriter } = require('csv-writer');

// Function to fetch historical data and write to a CSV file
async function fetchHistoricalData(symbol, from, to) {
    try {
        // Fetch historical data from Yahoo Finance using yahoo-finance2
        const result = await yahooFinance.historical(symbol, {
            period1: from, // Start date in 'YYYY-MM-DD' format
            period2: to,   // End date in 'YYYY-MM-DD' format
            interval: '1d' // Daily data
        });

        if (!result || result.length === 0) {
            throw new Error('No historical data found for the given symbol and date range.');
        }

        // Prepare the records for CSV writing
        const records = result.map(entry => ({
            Date: entry.date.toISOString().split('T')[0],
            Open: entry.open,
            High: entry.high,
            Low: entry.low,
            Close: entry.close,
            Volume: entry.volume,
        }));

        // Define the CSV writer configuration
        const csvWriter = createObjectCsvWriter({
            path: `${symbol}_historical_data.csv`,
            header: [
                { id: 'Date', title: 'Date' },
                { id: 'Open', title: 'Open' },
                { id: 'High', title: 'High' },
                { id: 'Low', title: 'Low' },
                { id: 'Close', title: 'Close' },
                { id: 'Volume', title: 'Volume' },
            ]
        });

        // Write records to CSV file
        await csvWriter.writeRecords(records);
        console.log(`Historical data for ${symbol} fetched and saved successfully.`);
        return true
    } catch (error) {
        console.error('Error fetching historical data from Yahoo Finance:', error);
        return false
    }
}

// Example usage
// const symbol = 'MSFT'; // Stock symbol, e.g., Apple Inc.
// const from = '2023-01-01'; // Start date in 'YYYY-MM-DD' format
// const to = '2023-12-31'; // End date in 'YYYY-MM-DD' format


module.exports= {fetchHistoricalData};