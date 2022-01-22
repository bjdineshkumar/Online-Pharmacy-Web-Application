const nodemailer = require('nodemailer');
const constants = require("../config/constants.config");

const sendEmail = async(fromEmail, toEmail, subject, body) => {
    console.log(body);
    try {
        let transporter = nodemailer.createTransport({
            service: constants.APP_MAIL_PROVIDER,
            auth: {
                user: constants.APP_MAIL_ID,
                pass: constants.APP_MAIL_PASSWORD
            }
        });
        let mailOptions = {
            from: fromEmail,
            to: toEmail,
            subject: subject,
            text: body
        };
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    sendEmail
}