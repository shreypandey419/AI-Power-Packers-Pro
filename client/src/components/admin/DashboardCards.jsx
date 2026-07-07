import { useEffect, useState } from "react";
import {
  Users,
  UserPlus,
  PhoneCall,
  CheckCircle,
  AlertTriangle,
  CalendarDays,
  TrendingUp,
} from "lucide-react";

import { getDashboardStats } from "../../services/dashboardService";

export default function DashboardCards() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    contactedLeads: 0,
    completedLeads: 0,
    highPriority: 0,
    todayFollowUps: 0,
    conversionRate: 0,
  });

  async function loadStats() {
    try {
      const data = await getDashboardStats();
      console.log("Dashboard Response:", data);
      setStats(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadStats();
  }, []);

  const cards = [
    {
      title: "Total Leads",
      value: stats.totalLeads,
      icon: Users,
      color: "bg-blue-600",
    },
    {
      title: "New Leads",
      value: stats.newLeads,
      icon: UserPlus,
      color: "bg-yellow-500",
    },
    {
      title: "Contacted",
      value: stats.contactedLeads,
      icon: PhoneCall,
      color: "bg-indigo-600",
    },
    {
      title: "Completed",
      value: stats.completedLeads,
      icon: CheckCircle,
      color: "bg-green-600",
    },
    {
      title: "High Priority",
      value: stats.highPriority,
      icon: AlertTriangle,
      color: "bg-red-600",
    },
    {
      title: "Today's Follow Up",
      value: stats.todayFollowUps,
      icon: CalendarDays,
      color: "bg-orange-500",
    },
    {
      title: "Conversion %",
      value: `${stats.conversionRate}%`,
      icon: TrendingUp,
      color: "bg-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 flex justify-between items-center"
          >
            <div>
              <p className="text-gray-500 text-sm">
                {card.title}
              </p>

              <h2 className="text-2xl md:text-3xl font-bold mt-2">
                {card.value}
              </h2>
            </div>

            <div className={`${card.color} w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center flex-shrink-0`}>
              <Icon
                className="text-white"
                size={28}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}