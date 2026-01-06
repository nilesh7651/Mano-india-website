const nodemailer = require("nodemailer");
const axios = require("axios");

const sendOtpEmail = async (email, otp) => {
    try {
        // If no credentials are setup, log to console (Mock Mode)
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.log("==================================================");
            console.log(`[MOCK EMAIL] To: ${email} | OTP: ${otp}`);
            console.log("==================================================");
            return;
        }

        const apiKey = process.env.BREVO_API_KEY || process.env.EMAIL_PASS;

        // Prefer Brevo HTTPS API to avoid SMTP port blocks on hosts like Render
        if (apiKey) {
            await axios.post(
                "https://api.brevo.com/v3/smtp/email",
                {
                    sender: {
                        email: process.env.EMAIL_USER,
                        name: "Mano India",
                    },
                    to: [{ email }],
                    subject: "Mano India - Verify Your Email",
                    htmlContent: `
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
                },
                {
                    headers: {
                        "api-key": apiKey,
                        "Content-Type": "application/json",
                    },
                    timeout: 15000,
                }
            );

            console.log("Email sent successfully via Brevo API");
            return;
        }

                // Fallback to SMTP if API key is missing (may be blocked on some hosts)
                const transporter = nodemailer.createTransport({
                        host: "smtp-relay.brevo.com",
                        port: 587,
                        secure: false,
                        auth: {
                                user: process.env.EMAIL_USER,
                                pass: process.env.EMAIL_PASS,
                        },
                        connectionTimeout: 15000,
                        greetingTimeout: 15000,
                        socketTimeout: 15000,
                });

                const mailOptions = {
                        from: `"Mano India" <${process.env.EMAIL_USER}>`,
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
                console.log("Email sent successfully via SMTP:", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send verification email");
    }
};

module.exports = { sendOtpEmail };
