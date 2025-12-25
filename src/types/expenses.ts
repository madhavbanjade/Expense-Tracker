export type TranscationType = "income" | "spent"

export interface Expenses{
    id: string,
    title: string,
    amount: number,
    type: TranscationType,
    date: string,
    createdAt: number
}