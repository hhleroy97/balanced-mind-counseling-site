"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { sendContactEmail } from "@/actions/sendEmail";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const initialState = {
  success: false,
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? "Sending..." : "Send message"}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(sendContactEmail, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <Input id="name" name="name" placeholder="Your name" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
          />
        </div>
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="_trap">Leave this field empty</label>
        <Input id="_trap" name="_trap" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Share what brings you in, what support you're looking for, or any questions you have."
          required
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <SubmitButton />
        {state.message ? (
          <p
            className={
              state.success ? "text-sm text-primary" : "text-sm text-destructive"
            }
          >
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
