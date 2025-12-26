import prisma from "@/src/lib/prisma"
import { NextResponse } from "next/server"


export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json()


  const expense = await prisma.expense.create({
    data: {
      title: body.title,
      amount: Number(body.amount),
      type: body.type,
      date: new Date(body.date),
    },
  })

  return NextResponse.json(expense, { status: 201 })
}

export async function GET() {
  const expenses = await prisma.expense.findMany({
    orderBy: { createdAt: "desc" },
  
  })

  return NextResponse.json({
    success: true,
    expenses,
})
}
