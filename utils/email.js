const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, html) => {
    try{
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject,
            html
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    }
    catch(error){
        console.log("Email sending failed", error);
    }
}

module.exports = sendEmail;