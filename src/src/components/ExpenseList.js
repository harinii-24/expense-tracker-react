function ExpenseList({ expenses, deleteExpense }) {
  return (
    <ul>
      {expenses.map((item) => (
        <li key={item.id}>
          {item.text} - ₹{item.amount}
          <button onClick={() => deleteExpense(item.id)}>❌</button>
        </li>
      ))}
    </ul>
  );
}

export default ExpenseList;
