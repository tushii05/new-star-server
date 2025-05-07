const nodemailer = require('nodemailer');
const db = require('../config/config');

async function getSMTPConfig() {
    try {
        const settings = await db.general_settings.findOne();
        if (!settings) {
            throw new Error('SMTP settings not found in the database.');
        }

        return {
            host: settings.mail_host,
            user: settings.mail_username,
            pass: settings.mail_password,
            replyTo: settings.mail_reply_to || settings.mail_username,
        };
    } catch (error) {
        console.error('Error fetching SMTP settings:', error);
        throw error;
    }
}

async function sendEmail(to, subject, html) {
    try {
        const smtpConfig = await getSMTPConfig();

        const transporter = nodemailer.createTransport({
            host: smtpConfig.host,
            secure: false,
            requireTLS: true,
            auth: {
                user: smtpConfig.user,
                pass: smtpConfig.pass,
            },
        });

        return new Promise((resolve, reject) => {
            const mailOptions = {
                from: `"Start-Samachar" <${smtpConfig.user}>`,
                to,
                subject,
                html,
                replyTo: smtpConfig.replyTo
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(error);
                    reject('Error sending email to ' + to);
                } else {
                    console.log('Email sent: ' + info.response + ' to ' + to);
                    resolve('Email sent successfully');
                }
            });
        });
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}
module.exports = { sendEmail };
