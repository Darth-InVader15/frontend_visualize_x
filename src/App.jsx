import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FrontPage from './components/pages/Frontpage.jsx';
import SalesGrowth from './components/pages/SalesGrowth.jsx';
import TotalSales from './components/pages/TotalSales.jsx';
import RepeatedCustomers from './components/pages/RepeatedCustomers.jsx';
import NewCustomers from './components/pages/NewCustomers.jsx';
import Map from './components/pages/Map.jsx';
import CLVChart from './components/pages/CLVChart.jsx';
// Import your chart components here
// import TotalSalesChart from './TotalSalesChart';
// import SalesGrowthChart from './SalesGrowthChart';
// ... import other chart components

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/total-sales" element={<SalesGrowth />} />
        <Route path="/growth" element={<TotalSales />} />
        <Route path='/new-customers' element={<NewCustomers />} />
        <Route path='/repeat-customers' element={<RepeatedCustomers />} />
        <Route path='geo-distribution' element={<Map />} />
        <Route path='customer-ltv' element={<CLVChart />} />

      </Routes>
    
  );
}

export default App;