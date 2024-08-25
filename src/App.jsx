import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FrontPage from './components/pages/Frontpage.jsx';
import SalesGrowth from './components/pages/SalesGrowth.jsx';
// Import your chart components here
// import TotalSalesChart from './TotalSalesChart';
// import SalesGrowthChart from './SalesGrowthChart';
// ... import other chart components

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/total-sales" element={<SalesGrowth />} />
      </Routes>
    
  );
}

export default App;