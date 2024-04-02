// utils/otp.js

// Function to generate a random OTP
function generateOTP() {
    const length = 6; // Length of the OTP
    const charset = '0123456789'; // Character set for the OTP

    let otp = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        otp += charset[randomIndex];
    }

    return otp;
}

module.exports = { generateOTP };
