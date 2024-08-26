import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { 
  Box, 
  Typography, 
  Container, 
  Paper,
  CircularProgress,
  Button
} from '@mui/material';
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

const CustomerLifetimeValueChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/customer/lifetime-value');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setChartData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Customer Lifetime Value by Cohorts - scroll to ZOOM',
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true
          },
          mode: 'xy',
        },
        pan: {
          enabled: true,
          mode: 'xy',
        },
      }
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const resetZoom = () => {
    if (chartInstance) {
      chartInstance.resetZoom();
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          Customer Lifetime Value Analysis
        </Typography>
        {chartData && (
          <>
            <Box height={400}>
              <Line 
                options={options} 
                data={chartData} 
                ref={(reference) => setChartInstance(reference)}
              />
            </Box>
            <Box mt={2} display="flex" justifyContent="center">
              <Button variant="contained" onClick={resetZoom}>
                Reset Zoom
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default CustomerLifetimeValueChart;