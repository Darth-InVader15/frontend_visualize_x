import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FrontPage from './components/pages/Frontpage.jsx';
// Import your chart components here
// import TotalSalesChart from './TotalSalesChart';
// import SalesGrowthChart from './SalesGrowthChart';
// ... import other chart components

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<FrontPage />} />
      </Routes>
    
  );
}

export default App;