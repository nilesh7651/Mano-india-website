const nodemailer = require("nodemailer");

const sendOtpEmail = async (email, otp) => {
    try {
        // If no credentials are setup, log to console (Mock Mode)
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.log("==================================================");
            console.log(`[MOCK EMAIL] To: ${email} | OTP: ${otp}`);
            console.log("==================================================");
            return;
        }

        // Resolve smtp.gmail.com to an IPv4 address manually
        const dns = require('dns');
        const util = require('util');
        const resolve4 = util.promisify(dns.resolve4);

        let smtpHost = 'smtp.gmail.com';
        try {
            const addresses = await resolve4('smtp.gmail.com');
            if (addresses && addresses.length > 0) {
                smtpHost = addresses[0];
                console.log(`Resolved smtp.gmail.com to IPv4: ${smtpHost}`);
            }
        } catch (dnsErr) {
            console.error('DNS Resolution failed, falling back to hostname:', dnsErr);
        }

        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                servername: 'smtp.gmail.com', // Necessary when using IP address
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Mano India - Verify Your Email",
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #d97706;">Mano India Email Verification</h2>
          <p>Please use the verification code below to complete your signup:</p>
          <div style="font-size: 24px; font-weight: bold; margin: 20px 0; padding: 10px; background: #f3f4f6; display: inline-block; letter-spacing: 5px;">
            ${otp}
          </div>
          <p>This code will expire in 5 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send verification email");
    }
};

module.exports = { sendOtpEmail };
