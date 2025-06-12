export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-7.5">
        <h2 className="text-title-md2 font-bold text-black dark:text-white">
          Welcome to Your Dashboard
        </h2>
        <p className="mt-4 text-sm">
          Start building your application by adding new components and features.
        </p>
      </div>
    </div>
  );
} 