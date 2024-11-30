const DashboardPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Overview</h1>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600">Registration Requests</p>
          <h2 className="text-2xl font-bold">230</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600">Verified Land Users</p>
          <h2 className="text-2xl font-bold">130</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600">Transfer Requests</p>
          <h2 className="text-2xl font-bold">100</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600">Flagged Issues</p>
          <h2 className="text-2xl font-bold">30</h2>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
