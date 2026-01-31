import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.string().email(),
  subject: z.string().min(1).max(100),
  message: z.string().min(10).max(2048),
  website: z.string().optional(), // honeypot field
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    // Honeypot check - if filled, silently succeed (don't alert bots)
    if (data.website) {
      return Response.json({ success: true });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL!,
      replyTo: data.email,
      subject: `[Portfolio] ${data.subject}`,
      text: `From: ${data.firstName} ${data.lastName}
Email: ${data.email}

Message:
${data.message}`,
    });

    return Response.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 },
      );
    }
    console.error("Contact form error:", error);
    return Response.json({ error: "Failed to send message" }, { status: 500 });
  }
}
