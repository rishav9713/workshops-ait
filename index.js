require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const app = express();
const port = process.env.PORT || 8000;

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(process.env.URl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    // Handle the error appropriately (e.g., retry, show a message, exit the application)
  }
}
// Serve static files
app.use(express.static("public"));

const userSchema = new Schema({
  name: { type: String, required: [true, "name is required"] },
  email: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
    required: [true, "Email is required"],
    unique: true,
  },
  contact: {
    type: Number,
    min: [10, "Number must be of 10 digits"],
    required: true,
  },
});

const User = new mongoose.model("User", userSchema);

app.post("/send", async (req, res) => {
  try {
    const { name, email, contact } = req.body;
    console.log(name, email, contact);
    let user = new User({
      name: name,
      email: email,
      contact: contact,
    });

    await user.save();

    // Create a transporter using your email service provider's SMTP settings
    const transporter = nodemailer.createTransport({
      host: "server79.dnsbootclub.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Setup email data
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: "Thank You for Registering",
      text: `Dear ${name},
      
Thank you for registering for the Online Cyber Security Workshop. We appreciate your commitment to enhancing your cyber security knowledge and skills. The workshop will be conducted virtually, providing you with the opportunity to learn from industry experts, engage in discussions, and gain practical insights from the comfort of your own home. We will be sharing the workshop schedule and instructions with you shortly. We look forward to providing you with an enriching online learning experience. Thank you for your dedication to making the digital world safer.

For Latest Update follow Us:
LinkedIN: https://www.linkedin.com/company/ansh-infotech1/mycompany/?viewAsMember=fase
Instagram: https://www.instagram.com/anshinfotech/
Facebook: https://www.facebook.com/anshinfotech1


Best regards,
Team AIT

      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    res.redirect("/success.html");
  } catch (error) {
    console.error(error);
    const errorMessage = encodeURIComponent(error.message); // Encode the error message for URL
    res.redirect(`/error.html?message=${errorMessage}`);
  }
});

app.listen(port, function () {
  console.log(`Server is running on ${port}`);
});
