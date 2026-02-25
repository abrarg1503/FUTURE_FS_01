
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const nodemailer = require('nodemailer')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)

const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
})

const Contact = mongoose.model('Contact', ContactSchema)

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body
  await Contact.create({ name, email, message })

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  await transporter.sendMail({
    from: email,
    to: process.env.EMAIL_USER,
    subject: "New Portfolio Contact Message",
    text: message
  })

  res.json({ success: true })
})

app.listen(5000, () => console.log("Server running on port 5000"))
