"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Expenses } from "../types/expenses";

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expenses[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/expenses");
        console.log("res", res);
        const data = await res.json();
        console.log("data", data);
        if (!res.ok || data.success === false) {
          throw new Error("Failed to fetch");
        }
        setExpenses(data.expenses || []);
        console.log("EXPENSES STATE:", data.expenses);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, []);

  const totalIncome = expenses
    .filter((ex) => ex.type === "income")
    .reduce((sum, ex) => sum + ex.amount, 0);
  const totalSpent = expenses
    .filter((ex) => ex.type === "spent")
    .reduce((sum, ex) => sum + ex.amount, 0);

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure, You want to delete!");
    if (!confirmed) return;
    try {
      const res = await fetch(`/api/expenses/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete");
      }
      // ✅ remove deleted expense from UI
      setExpenses((prev) => prev.filter((ex) => ex.id !== id));
    } catch {
      console.error("deleted", error);
      alert("Error deleting expense");
    }
  };
  return (
    <div className="min-h-screen shadow-xl flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-6">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Personal Expense Tracker
        </h1>

        {/* Summary Cards */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <div className="flex-1 bg-green-200 text-green-800 p-6 rounded-2xl shadow text-center">
            <p className="text-sm font-medium">Total Income</p>
            <p className="text-2xl font-bold mt-2">रु.{totalIncome}</p>
          </div>

          <div className="flex-1 bg-red-200 text-red-800 p-6 rounded-2xl shadow text-center">
            <p className="text-sm font-medium">Total Spent</p>
            <p className="text-2xl font-bold mt-2">रु.{totalSpent}</p>
          </div>
        </div>

        {/* Date & Button */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            Track your expenses: 📅{new Date().toLocaleDateString()}
          </p>

          <button
            onClick={() => router.push("/add-expense")}
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-xl shadow"
          >
            Add
          </button>
        </div>

        {/* Items List */}

        <div className="bg-gray-100 rounded-2xl p-4 min-h-[150px]">
          <ul className="space-y-2 text-gray-700">
            {loading && (
              <p className="text-center my-7 text-2xl text-blue-600 ">
                Loading...
              </p>
            )}
            {error && (
              <p className="text-center my-7 text-2xl text-red-400 ">
                Something went wrong!
              </p>
            )}
            {!loading && expenses.length === 0 && (
              <p className="text-center text-red-400">No items added!</p>
            )}

            {expenses.map((ex, index) => (
              <li key={ex.id} className="bg-white p-3 rounded-xl shadow-sm">
                <div className="flex justify-between items-center ">
                  <span className="text-gray-400 mr-2">{index + 1}</span>
                  <h1 className="font-semibold text-gray-800">{ex.title}</h1>
                  <p className="text-sm text-gray-500">
                    {new Date(ex.date).toLocaleDateString()} | {ex.type}
                  </p>
                  <span
                    className={`font-bold ${
                      ex.type === "income" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    रु.{ex.amount}
                  </span>
                  <button
                    onClick={() => router.push(`/edit-expense/${ex.id}`)}
                    className="text-blue-600 hover:underline"
                  >
                    🖊️ Edit
                  </button>
                  <button onClick={() => handleDelete(ex.id)}>❌ Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
