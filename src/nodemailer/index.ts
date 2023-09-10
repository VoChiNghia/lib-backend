import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'nghiakg11234@gmail.com',
    pass: 'timgbkwmcxzmqdpq'
  },
  logger: true
})
export default transporter
