import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Box } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const NewCustomers = () => {
  const [monthlyData, setMonthlyData] = useState({ labels: [], dataPoints: [] });
  const [yearlyData, setYearlyData] = useState({ labels: [], dataPoints: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const monthlyResponse = await fetch('https://visualizex-production.up.railway.app/api/v1/customer/new-customers/month');
        const monthlyResult = await monthlyResponse.json();
        setMonthlyData(monthlyResult);

        const yearlyResponse = await fetch('https://visualizex-production.up.railway.app/api/v1/customer/new-customers/year');
        const yearlyResult = await yearlyResponse.json();
        setYearlyData({
          labels: yearlyResult.map(item => item._id.year.toString()),
          dataPoints: yearlyResult.map(item => item.totalCustomers)
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const monthlyChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Customer Growth - New Customers added each month',
      },
    },
  };

  const yearlyChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Yearly Customer Growth - New Customers added each year',
      },
    },
  };

  const monthlyChartData = {
    labels: monthlyData.labels,
    datasets: [
      {
        label: 'Number of Customers',
        data: monthlyData.dataPoints,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const yearlyChartData = {
    labels: yearlyData.labels,
    datasets: [
      {
        label: 'Number of Customers',
        data: yearlyData.dataPoints,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Customer Growth Analysis
        </Typography>
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Bar options={monthlyChartOptions} data={monthlyChartData} />
        </Paper>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Bar options={yearlyChartOptions} data={yearlyChartData} />
        </Paper>
      </Box>
    </Container>
  );
};

export default NewCustomers;