require('dotenv').config();
const { sendOtpEmail } = require('./src/utils/emailService');

console.log('Testing Email Service...');
console.log('User:', process.env.EMAIL_USER ? 'Set' : 'Not Set');
console.log('Pass:', process.env.EMAIL_PASS ? 'Set' : 'Not Set');

async function test() {
    try {
        console.log('Attempting to send test email...');
        await sendOtpEmail('nileshsingh7651@gmail.com', '123456');
        console.log('Test Email Sent Successfully!');
    } catch (error) {
        console.error('Test Failed:', error.message);
    }
}

test();
