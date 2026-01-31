"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { X, Send } from "lucide-react";
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

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
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

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
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
      onClose();
    } catch {
      setErrors({ form: "Failed to send message. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  const inputStyles = (hasError: boolean) =>
    `w-full h-12 px-3 bg-[var(--bg-secondary)] border rounded-lg text-white font-inter text-sm placeholder:text-[var(--text-muted)] transition-colors focus:outline-none ${
      hasError
        ? "border-red-400"
        : "border-[#334155] hover:bg-[var(--bg-primary)] focus:bg-[var(--bg-primary)] focus:border-[var(--accent-gold)]"
    }`;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Modal Content */}
      <div
        className={`relative w-full max-w-[600px] max-h-[90vh] overflow-y-auto bg-[var(--bg-tertiary)] rounded-2xl md:rounded-3xl transform transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 md:px-8 pt-6 md:pt-8 pb-4 md:pb-6 sticky top-0 bg-[var(--bg-tertiary)] z-10">
          <h2
            id="modal-title"
            className="text-white font-inter text-xl md:text-[28px] font-bold"
          >
            Send Me a Message
          </h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-primary)] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-[var(--text-secondary)]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-5 md:px-8 pb-6 md:pb-8" noValidate>
          <div className="flex flex-col gap-5">
            {/* Form-level error */}
            {errors.form && (
              <div className="text-red-400 text-sm font-inter bg-red-400/10 px-3 py-2 rounded-lg">
                {errors.form}
              </div>
            )}

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
    </div>
  );
}
