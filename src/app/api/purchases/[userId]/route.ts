import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;

  try {
    const purchases = await prisma.purchase.findMany({
      where: { userId },
    });
    return NextResponse.json(purchases);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
