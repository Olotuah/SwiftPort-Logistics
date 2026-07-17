import express from "express";
import { Resend } from "resend";

const router = express.Router();

const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {

    // Email to SwiftPort
    await resend.emails.send({
      from: "SwiftPort Logistics <support@swiftportlogistics.org>",
      to: "support@swiftportlogistics.org",
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

      <div style="background:#f5f5f5;padding:20px;border-radius:8px;">
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

    // Auto reply
    await resend.emails.send({
      from: "SwiftPort Logistics <support@swiftportlogistics.org>",
      to: email,
      subject: "We've received your message",
      html: `
      <div style="font-family:Arial;padding:40px">

      <h2>Hello ${name},</h2>

      <p>
      Thank you for contacting
      <strong>SwiftPort Logistics.</strong>
      </p>

      <p>
      Your enquiry has been received successfully.
      </p>

      <p>
      One of our customer support specialists will
      get back to you shortly.
      </p>

      <hr>

      <p><strong>Subject:</strong> ${subject}</p>

      <br>

      <p>

      Regards,

      <br><br>

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

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
});

export default router;