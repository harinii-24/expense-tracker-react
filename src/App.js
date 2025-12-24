import { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseChart from "./components/ExpenseChart";

function App() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedMonth, setSelectedMonth] = useState("");
  const [budget, setBudget] = useState(() => {
    const savedBudget = localStorage.getItem("budget");
    return savedBudget ? Number(savedBudget) : "";
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("budget", budget);
  }, [budget]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((item) => item.id !== id));
  };

  // 🔹 Filter by selected month
  const monthlyExpenses = selectedMonth
    ? expenses.filter(
        (item) => item.date.split("-")[1] === selectedMonth
      )
    : expenses;

  // 🔹 Monthly total
  const monthlyTotal = monthlyExpenses.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  // 🔹 Budget status
  let budgetMessage = "";
  let budgetColor = "green";

  if (budget) {
    if (monthlyTotal > budget) {
      budgetMessage = "🔴 Budget exceeded! Control your spending.";
      budgetColor = "red";
    } else if (monthlyTotal >= budget * 0.8) {
      budgetMessage = "🟠 Warning! You have used 80% of your budget.";
      budgetColor = "orange";
    } else {
      budgetMessage = "🟢 You are within your budget.";
      budgetColor = "green";
    }
  }

  return (
    <div
      style={{
        maxWidth: "520px",
        margin: "40px auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        textAlign: "center",
      }}
    >
      <h1>Expense Tracker</h1>

      <ExpenseForm addExpense={addExpense} />

      {/* Month Filter */}
      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        style={{ padding: "6px", width: "100%", marginBottom: "10px" }}
      >
        <option value="">All Months</option>
        <option value="01">January</option>
        <option value="02">February</option>
        <option value="03">March</option>
        <option value="04">April</option>
        <option value="05">May</option>
        <option value="06">June</option>
        <option value="07">July</option>
        <option value="08">August</option>
        <option value="09">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>

      {/* Budget Input */}
      <input
        type="number"
        placeholder="Set Monthly Budget (₹)"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        style={{
          padding: "6px",
          width: "100%",
          marginBottom: "10px",
        }}
      />

      <ExpenseList
        expenses={monthlyExpenses}
        deleteExpense={deleteExpense}
      />

      <h3>Monthly Total: ₹{monthlyTotal}</h3>

      {budget && (
        <h4 style={{ color: budgetColor }}>{budgetMessage}</h4>
      )}

      {monthlyExpenses.length > 0 && (
        <ExpenseChart expenses={monthlyExpenses} />
      )}
    </div>
  );
}

export default App;
