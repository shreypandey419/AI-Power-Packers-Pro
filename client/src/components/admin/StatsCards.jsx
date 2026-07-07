export default function StatsCards({ stats }) {
  const cards = [
    {
      title: "Total Revenue",
      value: `₹ ${stats.totalRevenue}`,
      color: "bg-green-500",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      color: "bg-blue-500",
    },
    {
      title: "Customers",
      value: stats.totalCustomers,
      color: "bg-purple-500",
    },
    {
      title: "Paid Bookings",
      value: stats.paidBookings,
      color: "bg-emerald-500",
    },
    {
      title: "Pending Payments",
      value: stats.pendingPayments,
      color: "bg-yellow-500",
    },
    {
      title: "Delivered",
      value: stats.delivered,
      color: "bg-indigo-500",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-5 mb-8">

      {cards.map((card) => (

        <div
          key={card.title}
          className={`${card.color} text-white rounded-xl p-5 shadow-lg`}
        >
          <p className="text-sm opacity-90">
            {card.title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {card.value}
          </h2>
        </div>

      ))}

    </div>
  );
}