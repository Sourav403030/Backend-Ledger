import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});


// Function to send email
const sendEmail = async (to: string, subject: string, text: string, html: string) => {
  try {
    const info = await transporter.sendMail({
      from: `"Backend-Ledger" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default async function sendRegistrationEmail(userEmail: string, name: string){
    const subject = 'Welcome to Backend-Ledger!';
    const text = `Hello ${name},\n\nThank you for registering with Backend-Ledger! We're excited to have you on board.\n\nBest regards,\nBackend-Ledger Team`;
    const html = `<p>Hello ${name},</p><p>Thank you for registering with Backend-Ledger! We're excited to have you on board.</p><p>Best regards,<br>Backend-Ledger Team</p>`;

    await sendEmail(userEmail, subject, text, html);
}