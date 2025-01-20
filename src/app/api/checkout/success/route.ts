import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/stripe";
import { prisma } from "@/lib/prisma/prisma";

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!session.metadata || !session.client_reference_id) {
      return NextResponse.json(
        { error: "Required session data is missing" },
        { status: 400 }
      );
    }

    const existingPurchase = await prisma.purchase.findFirst({
      where: {
        bookId: session.metadata.bookId,
        userId: session.client_reference_id,
      },
    });

    if (existingPurchase) {
      return NextResponse.json({ error: "Purchase already exists" }, { status: 400 });
    }
    const purchase = await prisma.purchase.create({
      data: {
        bookId: session.metadata.bookId,
        userId: session.client_reference_id,
      },
    });
    return NextResponse.json({ purchase }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
