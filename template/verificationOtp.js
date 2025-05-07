const { sendEmail } = require('../middlewares/email')

async function sendVerificationEmail(email, otp, username) {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <title> Start Samachar</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    background-color: #000000;
                    color: #FFF;
                }
                .box-row {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 80vh;
                }
                .box {
                    text-align: center;
                    width: 100%;
                    max-width: 470px;
                    height: 249px;
                    padding: 15px 12px 90px 12px;
                    border-radius: 10px;
                    margin: 80px auto;
                    background-color: #000000;
                    border: 0.695px solid #35F542;
                }
                .header {
                    text-align: center;
                    border-bottom: 1px solid green;
                    padding-bottom: 5px;
                    margin-bottom: 15px;
                }
                img {
                    height: 40px;
                }
                h4 {
                    font-family: 'Poppins', sans-serif;
                    font-size: 18px;
                    font-weight: 500;
                    margin: 0;
                    color: #FFF;
                }
                p {
                    font-family: 'Poppins', sans-serif;
                    font-size: 16px;
                    font-weight: 400;
                    text-align: left;
                    padding-left: 22.5px;
                    margin-top: 35px;
                    color: #FFF;
                }
                ul {
                    list-style: none;
                    padding: 0;
                }
                li {
                    text-align: left;
                    font-family: 'Poppins', sans-serif;
                    font-size: 13px;
                    font-weight: 500;
                    line-height: 24px;
                    color: #FFF;
                }
            
                .footer {
                    border-top: 1px solid #008000;
                    padding-top: 20px;
                    margin-top: 32px;
                    font-family: 'Poppins', sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: normal;
                    color: #FFF;
                }
            </style>
        </head>
            <body style="margin: 0; padding: 0; background-color: #000000; color: #FFF;">
                <div class="box-row">
                    <div class="box">
                        <div class="header">
                            <img src="${process.env.IMG}" alt="Logo">
                        </div>
                        <h4>
                            Please Verify your email.
                        </h4>
                        <p>
                            Hi <strong>${username} </strong>,
                        </p>
                        <ul>
                            <li>
                                We're happy you signed up for Start Samachar. To start exploring with your account, please verify your email address by entering the following OTP:
                                <br>
                                <strong style="font-size: 14px; color: #1AAA1A;">${otp}</strong>
                            </li>
                        </ul>
                        <p>
                            If you did not sign up for this account, you can safely ignore this email.
                        </p>
                    </div>
                </div>
            </body>
    </html>
`;

    const subject = "Please Verify your email";
    await sendEmail(email, subject, html);
}

module.exports = { sendVerificationEmail }