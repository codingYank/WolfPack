import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAUTH2",
    user: process.env.EMAIL_ADD,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    pass: process.env.EMAIL_PASS,
  },
})

export const sendEmail = async (email, subject, message) => {
  const info = await transporter.sendMail({
    from: "wofpacksocial23@gmail.com",
    to: email,
    subject,
    text: message,
  })

  console.log("Message sent: %s", info.messageId)
}
