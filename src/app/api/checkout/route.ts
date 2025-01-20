import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/stripe";

export async function POST(req: Request) {
  const { title, price, bookId, userId } = await req.json();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      metadata: {
        bookId,
      },
      client_reference_id: userId,
      line_items: [
        {
          price_data: {
            currency: "jpy",
            product_data: { name: title },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_ORIGIN}/book/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_ORIGIN}`,
    });
    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
