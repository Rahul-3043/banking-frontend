import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/accounts')
      .then(res => setAccounts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Smart Banking Dashboard</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map(acc => (
            <tr key={acc.id}>
              <td>{acc.id}</td>
              <td>{acc.name}</td>
              <td>{acc.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
