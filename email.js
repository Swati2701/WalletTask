/* eslint-disable*/
const nodemailer = require('nodemailer');
require('dotenv').config({ path: './config.env' });

async function sendEmail(email, token) {
    try{
        //const smtpEndPoint = 'smtp.sendgrid.net';
        //const port = 465;
        const senderAddress = 'test@gmail.com';
        let toAddress = email;
        const username = process.env.SENDGRID_USERNAME;
        const password = process.env.SENDGRID_PASSWORD;
        let subject = "verify your email";

        let html = `<!DOCTYPE>
        <html>
        <body>
        <p> your code is : </p> <b> ${token} </b>
        </body>
        </html>`;

        let transport = nodemailer.createTransport({
            service: 'SendGrid',
            auth:{
                user:username,
                pass: password
            }
        })

        let mailOptions ={
            from: senderAddress,
            to: toAddress,
            subject: subject,
            html: html
        };

        let info = await transport.sendMail(mailOptions);
        return { error: false };

    } catch (error){
        console.log("send email error");
        return{
            error: true,
            message: "cannot send email"
        }
    }
}

module.exports = { sendEmail };