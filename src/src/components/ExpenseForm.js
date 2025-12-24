import { useState } from "react";

function ExpenseForm({ addExpense }) {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (!text || !amount || !date) return;

    addExpense({
      id: Date.now(),
      text,
      amount: Number(amount),
      date,
    });

    setText("");
    setAmount("");
    setDate("");
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Expense name"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button type="submit">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;
