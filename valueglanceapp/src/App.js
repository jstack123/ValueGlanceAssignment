// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React, { useEffect, useState } from 'react';

const FinancialTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters state
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [revenueRange, setRevenueRange] = useState({ min: '', max: '' });
  const [netIncomeRange, setNetIncomeRange] = useState({ min: '', max: '' });

    // Sorting state
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("reqesuting dataaaa")
        const response = await fetch('http://localhost:5000/api/financials');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilter = () => {
    let filteredData = [...data];

    // Filter by date range
    if (dateRange.start && dateRange.end) {
      filteredData = filteredData.filter(item => {
        const itemDate = new Date(item.date);
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);
        return itemDate >= startDate && itemDate <= endDate;
      });
    }

    // Filter by revenue range
    if (revenueRange.min || revenueRange.max) {
      filteredData = filteredData.filter(item => {
        const revenue = parseFloat(item.revenue);
        const min = parseFloat(revenueRange.min) || -Infinity;
        const max = parseFloat(revenueRange.max) || Infinity;
        return revenue >= min && revenue <= max;
      });
    }

    // Filter by net income range
    if (netIncomeRange.min || netIncomeRange.max) {
      filteredData = filteredData.filter(item => {
        const netIncome = parseFloat(item.netIncome);
        const min = parseFloat(netIncomeRange.min) || -Infinity;
        const max = parseFloat(netIncomeRange.max) || Infinity;
        return netIncome >= min && netIncome <= max;
      });
    }

    return filteredData;
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    let sortableData = handleFilter();
    if (sortConfig.key) {
      sortableData = sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredData = sortedData();


  return (
    <div>
      <h1>Financial Data</h1>

      {/* Filters */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Filters</h3>

        <div>
          <label>Date Range:</label>
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
          />
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
          />
        </div>

        <div>
          <label>Revenue Range:</label>
          <input
            type="number"
            placeholder="Min"
            value={revenueRange.min}
            onChange={(e) => setRevenueRange({ ...revenueRange, min: e.target.value })}
          />
          <input
            type="number"
            placeholder="Max"
            value={revenueRange.max}
            onChange={(e) => setRevenueRange({ ...revenueRange, max: e.target.value })}
          />
        </div>

        <div>
          <label>Net Income Range:</label>
          <input
            type="number"
            placeholder="Min"
            value={netIncomeRange.min}
            onChange={(e) => setNetIncomeRange({ ...netIncomeRange, min: e.target.value })}
          />
          <input
            type="number"
            placeholder="Max"
            value={netIncomeRange.max}
            onChange={(e) => setNetIncomeRange({ ...netIncomeRange, max: e.target.value })}
          />
        </div>
      </div>

      {/* Table */}
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
          <tr>
            <th onClick={() => handleSort('date')}>Date</th>
            <th onClick={() => handleSort('revenue')}>Revenue</th>
            <th onClick={() => handleSort('netIncome')}>Net Income</th>
            <th onClick={() => handleSort('grossProfit')}>Gross Profit</th>
            <th onClick={() => handleSort('eps')}>EPS (Earnings Per Share)</th>
            <th onClick={() => handleSort('operatingIncome')}>Operating Income</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.revenue}</td>
              <td>{item.netIncome}</td>
              <td>{item.grossProfit}</td>
              <td>{item.eps}</td>
              <td>{item.operatingIncome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinancialTable;
