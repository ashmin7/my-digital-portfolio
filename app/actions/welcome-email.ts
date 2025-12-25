"use server";

import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

/**
 * Sends a welcome email to new users who sign up
 */
export async function sendWelcomeEmail(email: string, name?: string | null) {
  if (!resend) {
    console.warn("RESEND_API_KEY is not set; skipping welcome email.");
    return { success: false, error: "Email service not configured" };
  }

  const fromAddress = process.env.EMAIL_FROM || "Ashmin Cyber Lab <onboarding@resend.dev>";

  try {
    await resend.emails.send({
      from: fromAddress,
      to: [email],
      subject: "🎉 Welcome to Ashmin Cyber Lab!",
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #0ea5e9; margin: 0;">🔐 Ashmin Cyber Lab</h1>
  </div>
  
  <h2 style="color: #1e293b;">Hi ${name || "there"}! 👋</h2>
  
  <p>Thank you for signing up to <strong>Ashmin Cyber Lab</strong>! I'm thrilled to have you here.</p>
  
  <p>Here's what you can explore:</p>
  
  <ul style="padding-left: 20px;">
    <li><strong>Security Journal</strong> – My hands-on learning notes and lab experiences</li>
    <li><strong>Projects</strong> – Cybersecurity projects I'm working on</li>
    <li><strong>Blog</strong> – Articles on security topics and best practices</li>
    <li><strong>Resources</strong> – Security tools, guides, and checklists</li>
  </ul>
  
  <p>I'm documenting my journey into cybersecurity and sharing everything I learn along the way. Feel free to explore and reach out if you have any questions!</p>
  
  <div style="margin-top: 30px; padding: 20px; background-color: #f1f5f9; border-radius: 8px;">
    <p style="margin: 0; font-size: 14px; color: #64748b;">
      <strong>Stay secure!</strong><br>
      – Ashmin Aryal
    </p>
  </div>
  
  <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;">
  
  <p style="font-size: 12px; color: #94a3b8; text-align: center;">
    You're receiving this because you signed up at 
    <a href="https://www.ashminaryal.info" style="color: #0ea5e9;">ashminaryal.info</a>
  </p>
</body>
</html>
      `,
      text: `Hi ${name || "there"}!

Thank you for signing up to Ashmin Cyber Lab! I'm thrilled to have you here.

Here's what you can explore:
- Security Journal – My hands-on learning notes and lab experiences
- Projects – Cybersecurity projects I'm working on
- Blog – Articles on security topics and best practices
- Resources – Security tools, guides, and checklists

I'm documenting my journey into cybersecurity and sharing everything I learn along the way. Feel free to explore and reach out if you have any questions!

Stay secure!
– Ashmin Aryal

---
You're receiving this because you signed up at ashminaryal.info
`,
    });

    console.log(`Welcome email sent to ${email}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    return { success: false, error: "Failed to send email" };
  }
}

/**
 * Notifies the owner when a new user signs up
 */
export async function notifyOwnerOfNewSignup(email: string, name?: string | null) {
  if (!resend) {
    console.warn("RESEND_API_KEY is not set; skipping owner notification.");
    return;
  }

  const toAddress = process.env.EMAIL_TO || "ashminaryal111@gmail.com";
  const fromAddress = process.env.EMAIL_FROM || "Ashmin Cyber Lab <onboarding@resend.dev>";

  try {
    await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      subject: "🆕 New user signed up on Ashmin Cyber Lab",
      text: `A new user has signed up on your portfolio!\n\nName: ${name || "(not provided)"}\nEmail: ${email}\n\nTime: ${new Date().toISOString()}`,
    });
  } catch (error) {
    console.error("Failed to send owner notification:", error);
  }
}
