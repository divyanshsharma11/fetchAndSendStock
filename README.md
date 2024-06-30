# Fetch and Send Stock Data

**Repository**: [fetchAndSendStock](https://github.com/divyanshsharma11/fetchAndSendStock)

## Description

This project demonstrates a Node.js application that fetches real-time stock data for a given stock symbol from the [Finnhub API](https://finnhub.io/) and emails the data as an attachment using the Nodemailer package. The application is structured to handle API requests through an Express server, allowing users to trigger the stock data fetching and email sending processes via HTTP requests.

## Features

- **Real-Time Stock Data Fetching**: Retrieves the latest stock prices and related data from the Finnhub API.
- **Data Storage**: Saves fetched stock data into a JSON file on the local filesystem.
- **Email Notification**: Sends an email with the stock data file attached using Gmail's SMTP server.
- **Modular Structure**: Separates concerns with a clear directory structure and modular code.
- **Environment Variables**: Utilizes environment variables for configuration to enhance security and flexibility.

## Directory Structure

- **`app/app.js`**: The main entry point for the application. Initializes the server and sets up routes.
- **`routes/routes.js`**: Defines API endpoints for fetching stock data and sending emails.
- **`utils/fetchStockData.js`**: Contains utility functions for fetching stock data 
- **`utils/fetchHistoricalStockData.js`**: Contains utility functions for fetching historical stock data
- **`utils/stockData.json`**: A sample file where stock data is saved after fetching.
- **`config/.env`**: Contains the configuration.
- **`fetchedData`**: Contains all the JSON/CSV files after fetching either real time or historical Data.

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/divyanshsharma11/fetchAndSendStock.git
   cd fetchAndSendStock

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Install nodemon as Dev Dependency (if not already installed)**:
    ```bash
    npm install nodemon --save-dev
    ```

4. **Setup Environment Variables**:
  - Create a .env file in the root directory.
  - Add the following variables with your configuration:
    ```makefile
    FINNHUB_API_KEY=your_finnhub_api_key
    FINNHUB_SECRET_HEADER=your_secret_header
    EMAIL_USER=your_gmail_address
    EMAIL_PASS=your_app_password
    EMAIL_TO=recipient_email_address
    EMAIL_SEND_PORT=465 # or 587 for STARTTLS
    PORT=3000 # The port your Express server will listen on
    ```
5. **Setup Environment Variables**:
  - Start the server with nodemon to automatically restart on file changes:
    ```bash
    nodemon app.js
    ```
7. **Run the Application Using Node**
- If you prefer not to use nodemon, you can start the server with Node.js:
    ```bash
    node ./app.js
    ```
8. **Testing**:
-  Use Postman or any API client to test the endpoints.
- **ENDPOINTS**
    - Fetch Stock Data:
        - Method: POST
        - URL: `http://localhost:3000/api/fetchStockData`
        - Body: JSON `{ "symbol": "AAPL" }`
        - Description: Fetches the stock data for the given symbol and stores it in `stockData.json`.
    - Send Email with Stock Data:
        - Method: POST
        - URL: `http://localhost:3000/api/sendEmail`
        - Body: JSON `{ "recipientEmail": "recipient@example.com","symbol":"stock_symbol","flag":"json/csv" }`
        - Description: Sends an email with the stock data file stockData.json as an attachment.

## DEPENDENCIES

- **axios**: Promise based HTTP client for the browser and Node.js.
- **body-parser**: Node.js body parsing middleware.
- **dotenv**: Module to load environment variables from a .env file into process.env.
- **express**: Fast, unopinionated, minimalist web framework for Node.js.
- **nodemailer**: Easy to use module to send emails.
- **nodemon**: Tool that helps develop node.js based applications by automatically restarting the node application when file changes are detected.

## Contributing
If you'd like to contribute, please fork the repository and make changes as you'd like. Pull requests are warmly welcome.

## License
This project is open-source and available under the MIT License.
