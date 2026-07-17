import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

router.post("/", async (req, res) => {

  const { name, email, subject, message } = req.body;

  try {

    // Email to SwiftPort

    await transporter.sendMail({

      from: `"SwiftPort Website" <${process.env.ZOHO_EMAIL}>`,

      to: process.env.ZOHO_EMAIL,

      subject: `📩 New Contact Form - ${subject}`,

      html: `

      <div style="font-family:Arial;padding:30px">

      <h2 style="color:#0F4C81">
      New Website Enquiry
      </h2>

      <hr>

      <p><strong>Name:</strong> ${name}</p>

      <p><strong>Email:</strong> ${email}</p>

      <p><strong>Subject:</strong> ${subject}</p>

      <p><strong>Message:</strong></p>

      <div style="background:#f4f4f4;padding:20px;border-radius:8px">

      ${message}

      </div>

      <br>

      <small>
      Submitted from
      https://www.swiftportlogistics.org
      </small>

      </div>

      `
    });

    // Auto Reply

    await transporter.sendMail({

      from: `"SwiftPort Logistics" <${process.env.ZOHO_EMAIL}>`,

      to: email,

      subject: "We've received your message",

      html: `

      <div style="font-family:Arial;padding:40px">

      <img
      src="https://www.swiftportlogistics.org/logo.png"
      width="150"
      />

      <h2>Hello ${name},</h2>

      <p>

      Thank you for contacting
      <strong>SwiftPort Logistics.</strong>

      </p>

      <p>

      We have successfully received your enquiry.

      One of our customer support specialists
      will respond shortly.

      </p>

      <br>

      <table cellpadding="8">

      <tr>

      <td><strong>Subject</strong></td>

      <td>${subject}</td>

      </tr>

      </table>

      <br>

      <p>

      Regards,

      <br>

      <strong>SwiftPort Logistics</strong>

      <br>

      Perth, Western Australia

      <br>

      support@swiftportlogistics.org

      </p>

      </div>

      `

    });

    res.json({

      success: true,

      message: "Message sent successfully."

    });

  }

  catch (err) {

    console.log(err);

    res.status(500).json({

      success: false,

      message: "Unable to send message."

    });

  }

});

export default router;