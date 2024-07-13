import React from 'react';

const CustomerTable = ({
  customers,
  filteredTransactions,
  handleSelectCustomer,
}) => {
  return (
    <table className="min-w-full bg-white border border-gray-300 shadow rounded-lg">
      <thead>
        <tr className="bg-green-500 text-white">
          <th className="py-2 px-4 border-b">Customer</th>
          <th className="py-2 px-4 border-b">Date</th>
          <th className="py-2 px-4 border-b">Amount</th>
        </tr>
      </thead>
      <tbody>
        {filteredTransactions.map((transaction) => (
          <tr
            key={transaction.id}
            className="hover:bg-gray-100 cursor-pointer"
            onClick={() => handleSelectCustomer(transaction.customer_id)}
          >
            <td className="py-2 px-4 border-b">
              {
                customers.find(
                  (customer) => customer.id == transaction.customer_id
                )?.name
              }
            </td>
            <td className="py-2 px-4 border-b">{transaction.date}</td>
            <td className="py-2 px-4 border-b">{transaction.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default CustomerTable;
