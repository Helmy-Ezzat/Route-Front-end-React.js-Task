import React, { useState } from 'react'

const CustomerTable = ({
  customers,
  filteredTransactions,
  handleSelectCustomer,
}) => {
  // State to track the current page
  const [currentPage, setCurrentPage] = useState(0)
  // Number of items per page
  const itemsPerPage = 9
  // Function to handle page clicks
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  // Calculate the offset and get the items for the current page
  const offset = currentPage * itemsPerPage
  const currentItems = filteredTransactions.slice(offset, offset + itemsPerPage)
  // Calculate the total number of pages
  const pageCount = Math.ceil(filteredTransactions.length / itemsPerPage)

  return (
    <div>
      <table className="min-w-full bg-white border border-gray-300 shadow rounded-lg text-left">
        <thead>
          <tr className="bg-green-500 text-white">
            <th className="py-2 px-4 border-b">Customer</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Amount</th>
          </tr>
        </thead>
        <tbody>
          {/* Render current page items */}
          {currentItems.map((transaction) => (
            <tr
              key={transaction.id}
              className="hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectCustomer(transaction.customer_id)}
            >
              <td className="py-2 px-4 border-b">
                {/* Display customer name */}
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
      <div className="mt-4 flex justify-center">
        {/* Render pagination buttons */}
        {Array.from({ length: pageCount }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={`mx-1 px-3 py-1 border ${
              i === currentPage ? 'bg-green-500 text-white' : 'border-gray-300'
            } rounded`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CustomerTable
