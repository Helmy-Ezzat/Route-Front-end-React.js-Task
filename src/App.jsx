import React, { useState, useEffect } from 'react'
import { getCustomers, getTransactions } from './services/api'
import CustomerFilter from './components/CustomerFilter'
import CustomerTable from './components/CustomerTable '
import TransactionChart from './components/TransactionChart'


function App() {
  const [customers, setCustomers] = useState([])
  const [transactions, setTransactions] = useState([])
  const [transactionsId, setTransactionsId] = useState([])
  const [transactionsAmount, setTransactionsAmount] = useState([])
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [selectedCustomer, setSelectedCustomer] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const customersData = await getCustomers()
      const transactionsData = await getTransactions()
      setCustomers(customersData)
      setTransactions(transactionsData)
      setTransactionsAmount(transactionsData)
      setTransactionsId(transactionsData)
      setFilteredTransactions(transactionsData)
    }
    getData()
  }, [])


  

  const handleFilterCustomerID = (customerId) => {
    if (customerId === '') {
      setFilteredTransactions(transactions)
      setTransactionsId(transactions)
    } else {
      let filtered = transactionsAmount
      filtered = filtered.filter(
        (transaction) => transaction.customer_id === parseInt(customerId)
      )
      setFilteredTransactions(filtered)
      setTransactionsId(
        transactions.filter(
          (transaction) => transaction.customer_id === parseInt(customerId)
        )
      )
    }
  }

  const handleFilterAmount = (amount) => {
    let filtered = transactionsId
    filtered = filtered.filter(
      (transaction) => transaction.amount === parseInt(amount)
    )
    setFilteredTransactions(filtered)
    setTransactionsAmount(
      transactions.filter(
        (transaction) => transaction.amount >= parseInt(amount)
      )
    )
  }

  const handleSelectCustomer = (customerId) => {
    setSelectedCustomer(
      customers.find((customer) => customer.id == parseInt(customerId))
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-500">
        Customer Transactions
      </h1>
      <CustomerFilter
        customers={customers}
        handleFilterCustomerID={handleFilterCustomerID}
        handleFilterAmount={handleFilterAmount}
      />
      <CustomerTable
        customers={customers}
        filteredTransactions={filteredTransactions}
        handleSelectCustomer={handleSelectCustomer}
      />
      <div className="mt-4 p-4 bg-white shadow rounded-lg">
        <label className="block mb-2 text-lg">Select customer for chart:</label>
        <select
          className="block w-full p-2 border border-gray-300 rounded"
          onChange={(e) => handleSelectCustomer(e.target.value)}
        >
          <option value="">None</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
      </div>
      <TransactionChart
        selectedCustomer={selectedCustomer}
        transactions={transactions}
      />
    </div>
  )
}

export default App
