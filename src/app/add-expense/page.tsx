"use client";
import { TranscationType } from "@/src/types/expenses";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ExpenseForm() {
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<number | "">();
  const [type, setType] = useState<TranscationType>("income");
  const [date, setDate] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const addExpense = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !amount || !date) return;
    try {
      setLoading(true);
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          amount: Number(amount),
          type,
          date,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to create expense");
      }
      // reset form
      setTitle("");
      setAmount("");
      setDate("");
      setType("income");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Somethiong went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen shadow-2xl flex items-center justify-center p-4">
      <form
        onSubmit={addExpense}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 space-y-4"
      >
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-4">
          Add New Expense
        </h2>

        {/* Expense Title */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Expense Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="e.g. Grocery shopping"
            className="p-2 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Amount */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Amount</label>
          <input
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            type="number"
            placeholder="e.g. 1200"
            className="p-2 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Expense Type */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Expense Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as TranscationType)}
            className="p-2 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="income">Income</option>
            <option value="spent">Spent</option>
          </select>
        </div>

        {/* Date */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Date</label>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            className="p-2 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-xl font-semibold shadow-md"
        >
          {loading ? "Saving..." : "Add Expense"}
        </button>
      </form>
    </div>
  );
}
