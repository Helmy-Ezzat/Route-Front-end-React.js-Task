export const getCustomers = async () => {
  const response = await fetch('http://localhost:5000/customers')
  if (!response.ok) {
    console.error('Failed to fetch customers')
    return []
  }
  return response.json()
}

export const getTransactions = async () => {
  const response = await fetch('http://localhost:5000/transactions')
  if (!response.ok) {
    console.error('Failed to fetch transactions')
    return []
  }
  return response.json()
}
