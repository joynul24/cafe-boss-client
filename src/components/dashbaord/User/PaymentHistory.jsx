import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentHistory = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch payments for logged-in user using TanStack Query
  const { data: payments = [] } = useQuery({
    queryKey: ['payments', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    }
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto my-10">
      {/* Header */}
      <div className="mb-6 text-center sm:text-left">
        <h2 className="text-3xl font-bold text-gray-800">
          Total Payments: <span className="text-indigo-600">{payments.length}</span>
        </h2>
        <p className="text-gray-500 text-sm mt-1">View all your past transaction details below.</p>
      </div>

      {/* Payment History Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        {/* 1. Desktop & Tablet View (Table) - hidden on small screens */}
        <div className="hidden md:block overflow-x-auto">
          <table className="table w-full text-left border-collapse">
            {/* Table Head */}
            <thead className="bg-amber-600 text-white text-sm">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Transaction ID</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500 font-medium">
                    No payment history found.
                  </td>
                </tr>
              ) : (
                payments.map((payment, index) => (
                  <tr key={payment._id} className="hover:bg-gray-50 transition-colors border-b">
                    <th className="py-3 px-4">{index + 1}</th>
                    <td className="py-3 px-4 font-semibold text-emerald-600">
                      ${parseFloat(payment.price || 0).toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-gray-600 font-mono text-sm">
                      {payment.transactionId}
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-sm">
                      {new Date(payment.date).toLocaleString('en-US', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${payment.status === 'service pending' || payment.status === 'pending'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                        }`}>
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 2. Mobile View (Cards) - shown only on small screens */}
        <div className="block md:hidden p-4 space-y-4">
          {payments.length === 0 ? (
            <div className="text-center py-8 text-gray-500 font-medium">
              No payment history found.
            </div>
          ) : (
            payments.map((payment, index) => (
              <div
                key={payment._id}
                className="p-4 rounded-lg border border-gray-100 bg-gray-50/50 shadow-sm space-y-3"
              >
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-xs font-bold text-gray-400">#{index + 1}</span>
                  <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${payment.status === 'service pending' || payment.status === 'pending'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-emerald-100 text-emerald-700'
                    }`}>
                    {payment.status}
                  </span>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Amount</p>
                    <p className="text-lg font-bold text-emerald-600">
                      ${parseFloat(payment.price || 0).toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 font-medium">Date</p>
                    <p className="text-xs text-gray-600 font-medium">
                      {new Date(payment.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="pt-1">
                  <p className="text-xs text-gray-400 font-medium mb-0.5">Transaction ID</p>
                  <p className="text-xs text-gray-700 font-mono bg-white p-2 rounded border border-gray-200 break-all">
                    {payment.transactionId}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;