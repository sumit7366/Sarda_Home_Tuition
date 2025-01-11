// Script File
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

app.post('/send-email', (req, res) => {
    const { name, email, phone, message } = req.body;

    const mailOptions = {
        from: `Received From WEBSITE :<${name}> <${email}>`, // User's email appears in the display name
        to: process.env.EMAIL_USER, // Your email address
        replyTo: email, // Reply address
        subject: `Message from ${name}`,
        text: `You have a new message:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Failed to send email.');
        }
        res.status(200).send('Email sent successfully!');
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on https://sarda-home-tuition.onrender.com');
});


