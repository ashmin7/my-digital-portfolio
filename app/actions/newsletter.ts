"use server"

import { db, subscribers } from "@/lib/db"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { ActionState, newsletterSubscriptionSchema } from "@/lib/types"
import { Resend } from "resend"

// Define the interface but don't export it directly
interface NewsletterState extends ActionState {
  email?: string;
  name?: string;
}

// Create an async function to return the initial state instead of exporting the object directly
export async function getInitialNewsletterState(): Promise<NewsletterState> {
  return {
    status: "idle",
    message: "",
  };
}

const resendApiKey = process.env.RESEND_API_KEY
const resend = resendApiKey ? new Resend(resendApiKey) : null

async function notifyOwnerOfNewSubscriber(email: string, name?: string | null, notes?: string | null) {
  if (!resend) {
    console.warn("RESEND_API_KEY is not set; skipping notification email for new subscriber.")
    return
  }

  const toAddress = process.env.EMAIL_TO || "ashminaryal111@gmail.com"
  const fromAddress = process.env.EMAIL_FROM || "Ashmin from Portfolio <onboarding@resend.dev>"

  try {
    await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      subject: "🆕 New newsletter subscriber on your portfolio",
      text: `You have a new newsletter subscriber on your portfolio.\n\nName: ${name || "(not provided)"}\nEmail: ${email}\n\nNotes: ${notes || "(none)"}`,
    })
  } catch (error) {
    console.error("Failed to send notification email for new subscriber:", error)
  }
}

async function sendWelcomeEmailToSubscriber(email: string, name?: string | null) {
  if (!resend) {
    console.warn("RESEND_API_KEY is not set; skipping welcome email to subscriber.")
    return
  }

  const fromAddress = process.env.EMAIL_FROM || "Ashmin Cyber Lab <onboarding@resend.dev>"

  try {
    await resend.emails.send({
      from: fromAddress,
      to: [email],
      subject: "Thanks for subscribing to Ashmin Cyber Lab",
      text: `Hi ${name || "there"},\n\nThank you for subscribing to Ashmin Cyber Lab. I really appreciate your interest in my cyber security journey.\n\nI use this newsletter to share what I'm learning about security, labs I'm working on, and new posts I add to the site.\n\n– Ashmin`,
    })
  } catch (error) {
    console.error("Failed to send welcome email to subscriber:", error)
  }
}

/**
 * Server action to subscribe a user to the newsletter
 * For use with useActionState in React 19
 */
export async function subscribeToNewsletter(
  prevState: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {

  // Parse the form data
  const email = formData.get("email") as string
  const name = formData.get("name") as string
  const notes = formData.get("notes") as string

  // Validate the input with Zod schema
  const validationResult = newsletterSubscriptionSchema.safeParse({ email, name });
  if (!validationResult.success) {
    return {
      status: "error",
      message: validationResult.error.errors[0]?.message || "Invalid input data",
    }
  }

  try {
    // Check if email already exists
    const existingSubscriber = await db.select().from(subscribers).where(eq(subscribers.email, email))

    if (existingSubscriber.length > 0) {
      return {
        status: "error",
        message: "You are already subscribed to our newsletter",
        email,
        name,
      }
    }

    // Insert new subscriber with notes
    await db.insert(subscribers).values({
      email,
      name: name || null,
      notes: notes || null,
    })

    // Notify you (Ashmin) by email about the new subscriber (including notes)
    await notifyOwnerOfNewSubscriber(email, name || null, notes || null)

    // Send a thank-you email directly to the subscriber
    await sendWelcomeEmailToSubscriber(email, name || null)

    revalidatePath("/")

    return {
      status: "success",
      message: "Thank you for subscribing to our newsletter!",
      email,
      name,
    }
  } catch (error) {
    console.error("Error subscribing to newsletter:", error)
    return {
      status: "error",
      message: "An error occurred while subscribing. Please try again.",
    }
  }
}

/**
 * Server action to get all newsletter subscribers
 */
export async function getSubscribers(): Promise<Array<typeof subscribers.$inferSelect>> {  
  try {
    const allSubscribers = await db.select().from(subscribers).orderBy(subscribers.createdAt)
    return allSubscribers
  } catch (error) {
    console.error("Error fetching subscribers:", error)
    return []
  }
}
