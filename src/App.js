import './App.css';
import React, { useState, useEffect } from "react";

const transactions = [
  { id: 1, customerId: 1, amount: 120, date: "2022-01-01" },
  { id: 2, customerId: 1, amount: 150, date: "2022-01-05" },
  { id: 3, customerId: 2, amount: 80, date: "2022-01-01" },
  { id: 4, customerId: 2, amount: 200, date: "2022-02-01" },
  { id: 5, customerId: 1, amount: 90, date: "2022-03-01" },
  { id: 6, customerId: 2, amount: 120, date: "2022-03-05" },
  { id: 7, customerId: 3, amount: 50, date: "2022-01-01" },
  { id: 8, customerId: 3, amount: 70, date: "2022-02-01" },
  { id: 9, customerId: 3, amount: 110, date: "2022-03-01" },
  { id: 10, customerId: 4, amount: 150, date: "2022-01-01" },
  { id: 11, customerId: 4, amount: 200, date: "2022-02-01" },
  { id: 12, customerId: 4, amount: 250, date: "2022-03-01" }
];

function App() {
  const [customers, setCustomers] = useState({});

  useEffect(() => {
    async function fetchData() {
      // simulated asynchronous API call to fetch data
      await new Promise(resolve => setTimeout(resolve, 1000));
      const customerTransactions = transactions.reduce((acc, curr) => {
        if (!acc[curr.customerId]) {
          acc[curr.customerId] = [];
        }
        acc[curr.customerId].push(curr);
        return acc;
      }, {});
      setCustomers(customerTransactions);
    }
    fetchData();
  }, []);

  return (
    <div>
      {Object.keys(customers).map(customerId => (
        <div key={customerId}>
          <h2>Customer {customerId}</h2>
          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>Reward Points Earned</th>
              </tr>
            </thead>
            <tbody>
              {["Jan", "Feb", "Mar"].map(month => {
                const monthTransactions = customers[customerId].filter(
                  transaction =>
                    new Date(transaction.date).getMonth() ===
                    ["Jan", "Feb", "Mar"].indexOf(month)
                );
                const rewardPoints = monthTransactions.reduce((acc, curr) => {
                  if (curr.amount > 100) {
                    acc += 2 * (curr.amount - 100) + 50;
                  } else if (curr.amount > 50) {
                    acc += 1 * (curr.amount - 50);
                  }
                  return acc;
                }, 0);
                return (
                  <tr key={month}>
                    <td>{month}</td>
                    <td>{rewardPoints}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default App;
