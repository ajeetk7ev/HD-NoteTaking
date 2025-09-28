import nodemailer from "nodemailer";
import otpTemplate from "../mail/templates/emailVerification";

interface SendEmailOptions {
  to: string;
  subject: string;
  html: any;
}

export const mailSender = async ({ to, subject, html }: SendEmailOptions) => {
  try {
    const transporter = nodemailer.createTransport({
      port: 587,
      host: process.env.MAIL_HOST!,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: 'HD | Note Taking App',
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};


// Define a function to send emails
export const sendVerificationEmail = async (email:string, otp:string) => {
    try {
        const mailResponse = await mailSender(
            {
                to: email,
                subject: "Verification Email",
                html: otpTemplate(otp)
            }
        );
        return mailResponse;
    } catch (error) {
        console.log("Error occurred while sending email: ", error);
    }
}