// app/api/stripe-webhook/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

// Stripe will give you a webhook secret when setting up webhooks.
// well get this later and add it to the .env.local file when testing
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event: Stripe.Event | null = null;
  try {
    event = stripe.webhooks.constructEvent(payload, signature!, webhookSecret);
    switch (event?.type) {
      case "payment_intent.succeeded":
        console.log("payment successful");
        const resend = new Resend(process.env.RESEND_API_KEY);

        resend.emails.send({
          from: "onboarding@resend.dev",
          to: "pbs2694@gmail.com",
          subject: "Payment Success",
          html: "<p>You have received $2.00 for a <strong>lizard treat</strong>!</p>",
        });
        // handle payment_intent.succeded
        break;
      default:
        console.log(event);
        // other events that we don't handle
        break;
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  }
  return NextResponse.json({ received: true });
}
