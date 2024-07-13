import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js'

Chart.register(CategoryScale)

const TransactionChart = ({ selectedCustomer, transactions }) => {
  const chartContainerRef = useRef(null)
  const chartInstanceRef = useRef(null)

  const chartData = () => {
    if (!selectedCustomer) return {}

    const customerTransactions = transactions.filter(
      (transaction) => transaction.customer_id == selectedCustomer.id
    )
    const dates = [
      ...new Set(customerTransactions.map((transaction) => transaction.date)),
    ]
    const amounts = dates.map((date) => {
      return customerTransactions
        .filter((transaction) => transaction.date == date)
        .reduce((sum, transaction) => sum + transaction.amount, 0)
    })

    return {
      labels: dates,
      datasets: [
        {
          label: `Total amount per day for ${selectedCustomer.name} (Line)`,
          data: amounts,
          type: 'line',
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
        {
          label: `Total amount per day for ${selectedCustomer.name} (Bar)`,
          data: amounts,
          type: 'bar',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgb(75, 192, 192)',
          borderWidth: 1,
        },
      ],
    }
  }

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy()
    }

    if (selectedCustomer && chartContainerRef.current) {
      chartInstanceRef.current = new Chart(chartContainerRef.current, {
        data: chartData(),
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      })
    }
  }, [selectedCustomer])

  return (
    <div className="mt-4 p-4 bg-white shadow rounded-lg">
      {selectedCustomer && <canvas ref={chartContainerRef}></canvas>}
    </div>
  )
}

export default TransactionChart
