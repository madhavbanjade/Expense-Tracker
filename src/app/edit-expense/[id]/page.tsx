"use client";

import { useState } from "react";
import { TranscationType } from "@/src/types/expenses";
import { useParams, useRouter } from "next/navigation";

export default function EditExpense() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [type, setType] = useState<TranscationType>("income");
  const [date, setDate] = useState("");

  const hanldeUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/expenses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          amount: Number(amount),
          type,
          date,
        }),
      });

      console.log("res", res);

      if (!res.ok) throw new Error("Failed");

      alert("✅ Expense updated successfully!");
      router.push("/");
    } catch (error) {
      alert("❌ Failed to update expense");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={hanldeUpdate}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-800">
          Edit Your Expense
        </h2>

        {/* Title */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Expense title"
          className="p-2 border rounded-xl w-full"
          required
        />

        {/* Amount */}
        <input
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value === "" ? "" : Number(e.target.value))
          }
          type="number"
          placeholder="Amount"
          className="p-2 border rounded-xl w-full"
          required
        />

        {/* Type */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value as TranscationType)}
          className="p-2 border rounded-xl w-full"
        >
          <option value="income">Income</option>
          <option value="spent">Spent</option>
        </select>

        {/* Date */}
        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="date"
          className="p-2 border rounded-xl w-full"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold"
        >
          Save Expense
        </button>
      </form>
    </div>
  );
}
