import { Resend } from "resend";
import { escapeHtml, textToHtml } from "@/lib/html-escape";

const CONTROL_CHARS = /[\u0000-\u001F\u007F]/;
const PLAIN_EMAIL = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const NAMED_FROM = /^[^<>]{1,80}<[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+>$/;

export type ContactMessage = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};

function isSafeAddress(value: string) {
  return value.length <= 254 && !CONTROL_CHARS.test(value) && PLAIN_EMAIL.test(value);
}

function isSafeFrom(value: string) {
  const trimmed = value.trim();
  if (trimmed.length > 200 || CONTROL_CHARS.test(trimmed)) return false;
  return PLAIN_EMAIL.test(trimmed) || NAMED_FROM.test(trimmed);
}

function providerConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim() ?? "";
  const to = process.env.CONTACT_EMAIL?.trim() ?? "";
  const from = process.env.CONTACT_FROM?.trim() ?? "";
  if (!apiKey || !isSafeAddress(to) || !isSafeFrom(from)) return null;
  return { apiKey, to, from };
}

/**
 * Sends the contact email. The recipient and sender come only from server
 * environment variables. In non-production, a missing provider config is
 * treated as a successful mock send so the form can be exercised locally.
 */
export async function sendContactEmail(message: ContactMessage) {
  const config = providerConfig();
  if (!config) {
    if (process.env.NODE_ENV !== "production") {
      console.info("contact_mock_send");
      return;
    }
    console.error("contact_not_configured");
    throw new Error("contact_not_configured");
  }

  const name = `${message.firstName} ${message.lastName}`;
  const html = [
    "<p><strong>From:</strong> ",
    escapeHtml(name),
    "</p>",
    "<p><strong>Email:</strong> ",
    escapeHtml(message.email),
    "</p>",
    "<p><strong>Message:</strong></p>",
    "<p>",
    textToHtml(message.message),
    "</p>",
  ].join("");

  const resend = new Resend(config.apiKey);
  const result = await resend.emails.send({
    from: config.from,
    to: config.to,
    replyTo: message.email,
    subject: `[Portfolio] ${message.subject}`,
    text: `From: ${name}\nEmail: ${message.email}\n\nMessage:\n${message.message}`,
    html,
  });

  if (result.error) {
    console.error("contact_provider_rejected");
    throw new Error("contact_provider_rejected");
  }
}
