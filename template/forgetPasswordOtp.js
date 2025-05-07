const { sendEmail } = require('../middlewares/email')

async function sendForgetEmail(email, OTP, username) {
    const html = `
    <html lang="en">
    <head>
        <title> Star Samachar</title>
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
                height: 95vh;
            }

            .box {
                text-align: center;
                width: 100%;
                max-width: 470px;
                height: 249px;
                padding: 15px 12px 90px 12px;
                border-radius: 10px;
                margin: 130px auto;
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

            a {
                color: #09e309;
                text-decoration: none;
            }

            .footer {
                border-top: 1px solid #008000;
                padding-top: 20px;
                margin-top: 22px;
                font-family: 'Poppins', sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: normal;
                color: #FFF;
            }
        </style>
    </head>

        <body style = "margin: 0; padding: 0; background-color: #000000; color: #FFF;">
        <div class="box-row">
            <div class="box">
                <div class="header">
                    <img src='${process.env.IMG}'
                        alt="Logo">
                </div>
                <h4>
                    Otp for forgot password!
                </h4>
                <p>
                    Hi <strong>${username}</strong>,
                </p>
                <ul>
                    <li>
                        Your OTP for password reset is <span style="color: #09e309;">${OTP}</span>.
                        <li> 
                        OTP expires in 15 minutes.
                        We will keep you posted here on the latest update and news about Star Samachar.
                        Use this one-time password to set your new password.
                        </li>
                    </li>
                </ul>
            </div>
        </div>
    </body>

    </html>
    ` ;

    const subject = "Otp for forgot password!";
    await sendEmail(email, subject, html);
}

module.exports = { sendForgetEmail }