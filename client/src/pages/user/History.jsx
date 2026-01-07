import HistoryCard from "../../components/card/HistoryCard";

const History = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-12 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Order History</h1>
          <p className="text-slate-500 mt-2">
            Check the status of recent orders, manage returns, and download
            invoices.
          </p>
          {/* Order List */}
          <HistoryCard />
        </div>
      </div>
    </div>
  );
};
export default History;
