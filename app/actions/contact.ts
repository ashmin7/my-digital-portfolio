"use server";

import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;
  const honeypot = formData.get("website") as string;

  // Spam check - honeypot field should be empty
  if (honeypot) {
    // Bot detected, silently fail
    return { success: true };
  }

  // Basic validation
  if (!name || !email || !subject || !message) {
    return { success: false, error: "All fields are required" };
  }

  if (message.length > 2000) {
    return { success: false, error: "Message is too long" };
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Invalid email address" };
  }

  // Send email notification
  if (!resend) {
    console.warn("RESEND_API_KEY not set; contact form submission logged but not emailed.");
    console.log("Contact form submission:", { name, email, subject, message });
    return { success: true };
  }

  const toAddress = process.env.EMAIL_TO || "ashminaryal111@gmail.com";
  const fromAddress = process.env.EMAIL_FROM || "Ashmin Cyber Lab <onboarding@resend.dev>";

  try {
    await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      replyTo: email,
      subject: `📬 Contact Form: ${subject}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; padding: 20px; max-width: 600px;">
  <h2 style="color: #0ea5e9; border-bottom: 2px solid #0ea5e9; padding-bottom: 10px;">
    📬 New Contact Form Message
  </h2>
  
  <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; width: 100px;">From:</td>
      <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${name}</td>
    </tr>
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Email:</td>
      <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">
        <a href="mailto:${email}" style="color: #0ea5e9;">${email}</a>
      </td>
    </tr>
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Subject:</td>
      <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${subject}</td>
    </tr>
  </table>
  
  <h3 style="margin-top: 20px;">Message:</h3>
  <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${message}</div>
  
  <p style="margin-top: 30px; color: #6b7280; font-size: 12px;">
    Sent from Ashmin Cyber Lab contact form at ${new Date().toISOString()}
  </p>
</body>
</html>
      `,
      text: `New contact form message\n\nFrom: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to send contact form email:", error);
    return { success: false, error: "Failed to send message. Please try again." };
  }
}
