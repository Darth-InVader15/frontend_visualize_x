import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  ButtonGroup, 
  Box 
} from '@mui/material';
import { styled } from '@mui/system';
import SwipeableViews from 'react-swipeable-views';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 800,
  margin: 'auto',
  marginTop: theme.spacing(4),
}));

const periods = ['Daily', 'Monthly', 'Quarterly', 'Yearly'];

const apiEndpoints = {
  'Daily': '/api/sales/total-sales-daily',
  'Monthly': '/api/sales/total-sales-monthly',
  'Quarterly': '/api/sales/total-sales/0.25',
  'Yearly': '/api/sales/total-sales-year',
};

function SalesChart() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [chartData, setChartData] = useState(null);

  const fetchData = async (period) => {
    try {
      const response = await fetch(apiEndpoints[period]);
      const data = await response.json();
      setChartData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(periods[activeIndex]);
  }, [activeIndex]);

  const handleIndexChange = (index) => {
    setActiveIndex(index);
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Total Sales - ${periods[activeIndex]}`,
      },
    },
  };

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Sales Overview
        </Typography>
        <ButtonGroup variant="contained" aria-label="outlined primary button group" fullWidth>
          {periods.map((period, index) => (
            <Button 
              key={period} 
              onClick={() => handleIndexChange(index)}
              variant={index === activeIndex ? 'contained' : 'outlined'}
            >
              {period}
            </Button>
          ))}
        </ButtonGroup>
        <Box sx={{ mt: 2 }}>
          <SwipeableViews index={activeIndex} onChangeIndex={handleIndexChange}>
            {periods.map((period, index) => (
              <div key={period}>
                {chartData && activeIndex === index && (
                  <Line options={options} data={chartData} />
                )}
              </div>
            ))}
          </SwipeableViews>
        </Box>
      </CardContent>
    </StyledCard>
  );
}

export default SalesChart;