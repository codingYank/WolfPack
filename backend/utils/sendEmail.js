import nodemailer from "nodemailer"
import { google } from "googleapis"
import dotenv from "dotenv"
dotenv.config()
const OAuth2 = google.auth.OAuth2

const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
)

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
})

const accessToken = oauth2Client.getAccessToken()

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAUTH2",
    user: process.env.EMAIL_ADD,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    pass: process.env.EMAIL_PASS,
    accessToken,
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
