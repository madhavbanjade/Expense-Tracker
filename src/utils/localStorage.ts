import { Expenses } from "../types/expenses";


const STORAGE_KEY = "expenses"
export const saveExpenses = (expenses: Expenses[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
}
export const getExpenses = (): Expenses[] => {
    if(typeof window !== "undefined"){
         const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data): [];

    }
return[]
   
}