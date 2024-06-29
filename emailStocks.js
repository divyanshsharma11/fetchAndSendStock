// sendEmail.js
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

async function sendEmail(recipientEmail) {
    const email = process.env.EMAIL_USER;
    const appPassword = process.env.EMAIL_PASS;

    console.log('Setting up nodemailer transporter...');

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: process.env.EMAIL_SEND_PORT || 465, // default to 465 if not provided
        secure: true, // true for 465, false for other ports
        auth: {
            user: email,
            pass: appPassword, // Use the App Password here
        },
    });

    const attachmentFilePath = path.join(__dirname, 'stockData.json');

    const mailOptions = {
        from: email,
        to: recipientEmail,
        subject: 'Stock Data',
        text: 'Please find the attached stock data file.',
        attachments: [
            {
                filename: 'stockData.json', // The name of the attachment in the email
                path: attachmentFilePath // Path to the file on your local system
            }
        ]
    };

    console.log('Sending email with the following options:', mailOptions);

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully. Info:', info);
        return { success: true, info };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error };
    }
}

module.exports = sendEmail;
