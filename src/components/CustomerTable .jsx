// import React from 'react';

// const CustomerTable = ({
//   customers,
//   filteredTransactions,
//   handleSelectCustomer,
// }) => {
//   return (
//     <table className="min-w-full bg-white border border-gray-300 shadow rounded-lg text-left">
//       <thead>
//         <tr className="bg-green-500 text-white">
//           <th className="py-2 px-4 border-b">Customer</th>
//           <th className="py-2 px-4 border-b">Date</th>
//           <th className="py-2 px-4 border-b">Amount</th>
//         </tr>
//       </thead>
//       <tbody>
//         {filteredTransactions.map((transaction) => (
//           <tr
//             key={transaction.id}
//             className="hover:bg-gray-100 cursor-pointer"
//             onClick={() => handleSelectCustomer(transaction.customer_id)}
//           >
//             <td className="py-2 px-4 border-b">
//               {
//                 customers.find(
//                   (customer) => customer.id == transaction.customer_id
//                 )?.name
//               }
//             </td>
//             <td className="py-2 px-4 border-b">{transaction.date}</td>
//             <td className="py-2 px-4 border-b">{transaction.amount}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   )
// }

// export default CustomerTable;

import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'

const CustomerTable = ({
  customers,
  filteredTransactions,
  handleSelectCustomer,
}) => {
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 9

  const handlePageClick = (data) => {
    setCurrentPage(data.selected)
  }

  const offset = currentPage * itemsPerPage
  const currentItems = filteredTransactions.slice(offset, offset + itemsPerPage)

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
      <div className="mt-4">
        {/* Pagination component */}
        <ReactPaginate
          // previousLabel={'previous'}
          // nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(filteredTransactions.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active bg-green-500 text-white'}
          className="w-full md:w-1/2 mx-auto flex justify-between items-center px-5"
          pageClassName={
            'inline-block px-3 py-1 border border-gray-300 rounded'
          }
          previousClassName={
            'inline-block px-3 py-1 border border-gray-300 rounded'
          }
          nextClassName={
            'inline-block px-3 py-1 border border-gray-300 rounded'
          }
        />
      </div>
    </div>
  )
}

export default CustomerTable
