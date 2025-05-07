const crypto = require('crypto');

function generateOTP() {
    const otpLength = 6;
    const digits = "123456789";
    let OTP = "";
    for (let i = 0; i < otpLength; i++) {
        OTP += digits[crypto.randomInt(0, digits.length)];
    }
    return OTP;
}

module.exports = { generateOTP }