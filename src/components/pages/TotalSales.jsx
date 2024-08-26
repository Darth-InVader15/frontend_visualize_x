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
import zoomPlugin from 'chartjs-plugin-zoom';
import 'hammerjs';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 800,
  margin: 'auto',
  marginTop: theme.spacing(4),
}));

const periods = ['Monthly', 'Yearly'];

const apiEndpoints = {
  'Monthly': 'http://localhost:5000/api/v1/sales/growth-monthly',
   'Yearly': 'http://localhost:5000/api/v1/sales/growth-yearly',
};

function TotalSales() {
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
        text: `No of Orders - ${periods[activeIndex]} - scroll to zoom`,
      },
        zoom: {
            pan: {
            enabled: true,
            mode: 'x',
            },
            zoom: {
            wheel: {
                enabled: true,
            },
            pinch: {
                enabled: true,
            },
            mode: 'x',
            },
        },
    },
  };

  return (
    
    <StyledCard>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          No of Orders placed
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

export default TotalSales;