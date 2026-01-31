"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { Send, CheckCircle, XCircle } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(1, "Subject is required").max(100),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2048, "Message cannot exceed 2048 characters"),
  website: z.string().optional(),
});

type SubmitStatus = "idle" | "success" | "error";

export function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    // Reset status when user starts typing again
    if (submitStatus !== "idle") {
      setSubmitStatus("idle");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as string] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
        website: "",
      });
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyles = (hasError: boolean) =>
    `w-full h-12 px-3 bg-[var(--bg-secondary)] border rounded-lg text-white font-inter text-sm placeholder:text-[var(--text-muted)] transition-colors focus:outline-none ${
      hasError
        ? "border-red-400"
        : "border-[#334155] hover:bg-[var(--bg-primary)] focus:bg-[var(--bg-primary)] focus:border-[var(--accent-gold)]"
    }`;

  return (
    <div className="w-full">
      {/* Success Message */}
      {submitStatus === "success" && (
        <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-xl mb-6">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span className="font-inter text-sm">
            Message sent successfully! I&apos;ll get back to you soon.
          </span>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === "error" && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl mb-6">
          <XCircle className="w-5 h-5 flex-shrink-0" />
          <span className="font-inter text-sm">
            Failed to send message. Please try again or email me directly.
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col gap-5">
          {/* Name Row */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="firstName" className="text-white font-inter text-sm font-medium">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                placeholder="John"
                className={inputStyles(!!errors.firstName)}
              />
              {errors.firstName && (
                <span className="text-red-400 font-inter text-xs">{errors.firstName}</span>
              )}
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="lastName" className="text-white font-inter text-sm font-medium">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                placeholder="Doe"
                className={inputStyles(!!errors.lastName)}
              />
              {errors.lastName && (
                <span className="text-red-400 font-inter text-xs">{errors.lastName}</span>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-white font-inter text-sm font-medium">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="john@example.com"
              className={inputStyles(!!errors.email)}
            />
            {errors.email && (
              <span className="text-red-400 font-inter text-xs">{errors.email}</span>
            )}
          </div>

          {/* Subject */}
          <div className="flex flex-col gap-2">
            <label htmlFor="subject" className="text-white font-inter text-sm font-medium">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              value={formData.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              placeholder="Project inquiry"
              className={inputStyles(!!errors.subject)}
            />
            {errors.subject && (
              <span className="text-red-400 font-inter text-xs">{errors.subject}</span>
            )}
          </div>

          {/* Message */}
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-white font-inter text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              placeholder="Tell me about your project..."
              rows={5}
              maxLength={2048}
              className={`w-full px-3 py-3 bg-[var(--bg-secondary)] border rounded-lg text-white font-inter text-sm placeholder:text-[var(--text-muted)] resize-y min-h-[140px] transition-colors focus:outline-none ${
                errors.message
                  ? "border-red-400"
                  : "border-[#334155] hover:bg-[var(--bg-primary)] focus:bg-[var(--bg-primary)] focus:border-[var(--accent-gold)]"
              }`}
            />
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)] font-inter text-xs">
                {formData.message.length}/2048 characters
              </span>
              {errors.message && (
                <span className="text-red-400 font-inter text-xs">{errors.message}</span>
              )}
            </div>
          </div>

          {/* Honeypot - hidden from users */}
          <div className="absolute opacity-0 pointer-events-none h-0 overflow-hidden" aria-hidden="true">
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={formData.website}
              onChange={(e) => handleChange("website", e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            isLoading={isSubmitting}
            className="w-full h-auto py-4 px-8 bg-[var(--accent-gold)] text-[var(--bg-primary)] font-inter text-base font-semibold rounded-lg flex flex-row items-center justify-center gap-[10px] hover:brightness-110 transition-all"
          >
            {!isSubmitting && <Send className="w-5 h-5" />}
            Send Message
          </Button>
        </div>
      </form>
    </div>
  );
}
