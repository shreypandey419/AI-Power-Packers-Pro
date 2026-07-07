const steps = [
  "Pending",
  "Confirmed",
  "Assigned",
  "In Transit",
  "Delivered",
];

export default function BookingTimeline({ status }) {

  const current = steps.indexOf(status);

  return (

    <div className="bg-white border rounded-xl p-6 mb-8">

      <h2 className="text-xl font-bold mb-6">
        Booking Progress
      </h2>

      <div className="flex justify-between items-center">

        {steps.map((step, index) => (

          <div
            key={step}
            className="flex-1 flex flex-col items-center relative"
          >

            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white
              ${
                index <= current
                  ? "bg-green-600"
                  : "bg-gray-300"
              }`}
            >
              {index + 1}
            </div>

            <p
              className={`mt-2 text-sm font-medium ${
                index <= current
                  ? "text-green-700"
                  : "text-gray-500"
              }`}
            >
              {step}
            </p>

            {index < steps.length - 1 && (
              <div
                className={`absolute top-5 left-1/2 w-full h-1
                ${
                  index < current
                    ? "bg-green-600"
                    : "bg-gray-300"
                }`}
              />
            )}

          </div>

        ))}

      </div>

    </div>

  );
}