import prisma from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export const runtime = "nodejs";




//update
export async function PUT(req: Request, {params}: {params: Promise<{id: string}>}){
    try {
        const {id} = await params;
        const body = await req.json();
        const updatedExpense = await prisma.expense.update({
            where: {id },
            data:{
                title: body.title,
                amount: Number(body.amount),
                type: body.type,
                date: new Date(body.date)
            }
        })
 return NextResponse.json({
      success: true,
      expense: updatedExpense,
    });
        
    } catch{
        return NextResponse.json(
            {error: 'Failed to update expense'},
              { status: 500 }
        )
        
    }
}

//delete
export async function DELETE(_: Request, {params}: {params:Promise<{id: string}>}){
        const {id} = await params;

    try {
     await prisma.expense.delete({
            where:{id},  
        });
return NextResponse.json({message: "Expense deleted successfully!"})
        
    } catch {
        return NextResponse.json(
            {error: 'Failed to delete expense'},
              { status: 500 }
        )
        
    }
}