import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function ExpenseChart({ expenses }) {
  const data = {
    labels: expenses.map((item) => item.text),
    datasets: [
      {
        label: "Expenses",
        data: expenses.map((item) => item.amount),
      },
    ],
  };

  return <Bar data={data} />;
}

export default ExpenseChart;
