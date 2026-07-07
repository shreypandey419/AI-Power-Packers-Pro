import { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function RevenueChart() {

  const [chart, setChart] = useState([]);

  const loadChart = async () => {
    try {

      const token = localStorage.getItem("adminToken");

      const res = await axios.get(
        "http://localhost:5001/api/dashboard/revenue-chart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setChart(res.data.chart);

    } catch (err) {

      console.log(err);

    }
  };

  useEffect(() => {
    loadChart();
  }, []);

  return (

    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Monthly Revenue
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <BarChart data={chart}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="revenue"
            fill="#2563eb"
            radius={[6, 6, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );
}