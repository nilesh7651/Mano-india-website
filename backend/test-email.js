require('dotenv').config();
const { sendOtpEmail } = require('./src/utils/emailService');

console.log('Testing Email Service Locally...');
console.log('Email User:', process.env.EMAIL_USER ? 'Configured' : 'MISSING');

async function runTest() {
    try {
        console.log('Sending test OTP to nileshsingh7651@gmail.com...');
        await sendOtpEmail('nileshsingh7651@gmail.com', '123456');
        console.log('✅ Success! OTP email sent successfully.');
    } catch (error) {
        console.error('❌ Failed:', error.message);
        console.error(error);
    }
}

runTest();
