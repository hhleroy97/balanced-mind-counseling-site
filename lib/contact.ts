import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.email("Please enter a valid email address."),
  message: z
    .string()
    .trim()
    .min(10, "Please share a bit more detail in your message."),
  _trap: z.string().optional(),
});

export type ContactSubmission = z.infer<typeof contactSchema>;
