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

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // STARTTLS
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false,
                ciphers: "SSLv3",
            },
            // FORCE IPv4 to avoid Render IPv6 issues
            family: 4,
            // Increase timeouts
            connectionTimeout: 20000,
            socketTimeout: 20000,
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
