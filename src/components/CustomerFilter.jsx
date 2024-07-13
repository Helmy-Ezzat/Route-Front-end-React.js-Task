import React from 'react'
import Select from 'react-select'

const CustomerFilter = ({
  customers,
  handleFilterCustomerID,
  handleFilterAmount,
}) => {
  const allOption = { value: '', label: 'All' }
  const customerOptions = [
    allOption,
    ...customers.map((customer) => ({
      value: customer.id,
      label: customer.name,
    })),
  ]

  return (
    <div className="flex gap-5  flex-col md:flex-row ">
      <div className="w-full flex-1">
        <label className="block mb-2 text-lg">Filter by customer</label>
        <Select
          options={customerOptions}
          onChange={(selectedOption) =>
            handleFilterCustomerID(selectedOption ? selectedOption.value : '')
          }
          isClearable
          placeholder="Search..."
        />
      </div>
      <div className="w-full flex-1">
        <label className="block mb-2 text-lg">Filter by amount:</label>
        <input
          type="number"
          className="block w-full p-2 border border-gray-300 rounded mb-4"
          onChange={(e) => handleFilterAmount(e.target.value)}
        />
      </div>
    </div>
  )
}

export default CustomerFilter


