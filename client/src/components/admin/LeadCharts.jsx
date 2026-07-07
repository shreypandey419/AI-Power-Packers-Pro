import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  Tooltip,
  Legend
);

export default function LeadCharts({ leads }) {
  const statusCount = {
    New: 0,
    Contacted: 0,
    Completed: 0,
  };

  leads.forEach((lead) => {
    statusCount[lead.status || "New"]++;
  });

  const pieData = {
    labels: ["New", "Contacted", "Completed"],
    datasets: [
      {
        data: [
          statusCount.New,
          statusCount.Contacted,
          statusCount.Completed,
        ],
        backgroundColor: [
          "#3B82F6",
          "#F59E0B",
          "#10B981",
        ],
        borderWidth: 0,
      },
    ],
  };

  const barData = {
    labels: ["New", "Contacted", "Completed"],
    datasets: [
      {
        label: "Leads",
        data: [
          statusCount.New,
          statusCount.Contacted,
          statusCount.Completed,
        ],
        backgroundColor: "#2563EB",
        borderRadius: 8,
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8 mb-8">

      {/* Pie Chart */}

      <div className="bg-white rounded-2xl shadow-lg p-5 md:p-6">

        <h2 className="text-xl font-bold mb-6">
          Status Distribution
        </h2>

        <div className="relative h-[280px] sm:h-[320px] md:h-[360px]">
          <Pie
            data={pieData}
            options={commonOptions}
          />
        </div>

      </div>

      {/* Bar Chart */}

      <div className="bg-white rounded-2xl shadow-lg p-5 md:p-6">

        <h2 className="text-xl font-bold mb-6">
          Lead Analytics
        </h2>

        <div className="relative h-[280px] sm:h-[320px] md:h-[360px]">
          <Bar
            data={barData}
            options={commonOptions}
          />
        </div>

      </div>

    </div>
  );
}