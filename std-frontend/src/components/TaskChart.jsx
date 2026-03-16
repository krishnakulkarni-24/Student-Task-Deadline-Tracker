import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function TaskChart({ tasks }) {

  const completed = tasks.filter(
    (t) => t.status === "COMPLETED"
  ).length;

  const pending = tasks.filter(
    (t) => t.status === "PENDING"
  ).length;

  const overdue = tasks.filter(
    (t) => t.status === "OVERDUE"
  ).length;

  const data = {
    labels: ["Completed", "Pending", "Overdue"],
    datasets: [
      {
        data: [completed, pending, overdue],
        backgroundColor: [
          "#22c55e",
          "#eab308",
          "#ef4444"
        ],
        borderWidth: 0
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#9ca3af"
        }
      }
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-56 h-56">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}

export default TaskChart;