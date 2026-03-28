"use server";

import { Resend } from "resend";

import { ContactEmail } from "@/components/emails/ContactEmail";
import { contactSchema } from "@/lib/contact";

type ContactActionState = {
  success: boolean;
  message: string;
};

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function sendContactEmail(
  _previousState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    _trap: formData.get("_trap"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Please review the form fields.",
    };
  }

  if (parsed.data._trap) {
    return {
      success: true,
      message: "Thanks for reaching out.",
    };
  }

  if (!resend || !process.env.CONTACT_FORM_TO_EMAIL) {
    return {
      success: false,
      message:
        "Email is not configured yet. Add Resend environment variables to enable submissions.",
    };
  }

  try {
    await resend.emails.send({
      from: "Balanced Mind Counseling <website@resend.dev>",
      to: process.env.CONTACT_FORM_TO_EMAIL,
      subject: `New contact form submission from ${parsed.data.name}`,
      react: ContactEmail({
        name: parsed.data.name,
        email: parsed.data.email,
        message: parsed.data.message,
      }),
      replyTo: parsed.data.email,
    });

    return {
      success: true,
      message: "Your message has been sent. You can expect a reply soon.",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong while sending the email. Please try again.",
    };
  }
}
