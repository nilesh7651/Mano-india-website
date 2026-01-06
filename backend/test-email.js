require('dotenv').config();
const { sendOtpEmail } = require('./src/utils/emailService');

console.log('Testing Email Service with Manual DNS...');

async function runTest() {
    try {
        console.log('Sending test OTP...');
        await sendOtpEmail('nileshsingh7651@gmail.com', '999999');
        console.log('✅ Success! OTP email sent successfully.');
    } catch (error) {
        console.error('❌ Failed:', error.message);
        console.error(error);
    }
}

runTest();
