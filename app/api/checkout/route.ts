import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2023-10-16",
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("", { status: 401 });
  }

  const checkout = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price: "price_1OAMZcAxWFeg8mgTBuMZejon",
        quantity: 1,
      },
    ],
    success_url: "http://localhost:3000?success=true",
    cancel_url: "http://localhost:3000?cancel=true",
  });

  return NextResponse.json(checkout);
}
