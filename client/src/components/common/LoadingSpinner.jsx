export default function LoadingSpinner({
  text = "Loading...",
}) {
  return (
    <div className="min-h-[300px] flex flex-col items-center justify-center">

      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />

      <p className="mt-5 text-gray-600 font-medium">
        {text}
      </p>

    </div>
  );
}