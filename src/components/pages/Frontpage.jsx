import React from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Box, 
  AppBar, 
  Toolbar 
} from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const GradientTypography = styled(Typography)`
background: linear-gradient(45deg, #800080 30%, #FFC0CB 60%, #0000FF 90%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  /* Additional styles for larger font and potential centering */
  font-size: 3rem; /* Adjust font size as needed */
  text-align: center; /* Center the title horizontally */
`;

const StyledButton = styled(Button)`
    background: linear-gradient(45deg, #FF00FF 30%, #00FFFF 90%);
    border-radius: 3;
    border: 0;
    color: white;
    height: 60px;
    padding: 0 30px;
    box-shadow: 0 3px 5px 2px rgba(33, 203, 243, .3);
    transition: transform 0.3s;

    &:hover {
        transform: scale(1.1);
    }
`;

const chartRoutes = [
  { title: 'Total Sales Over Time', path: '/total-sales' },
  { title: 'Sales Growth Rate', path: '/sales-growth' },
  { title: 'New Customers Added', path: '/new-customers' },
  { title: 'Repeat Customers', path: '/repeat-customers' },
  { title: 'Geographical Distribution', path: '/geo-distribution' },
  { title: 'Customer Lifetime Value', path: '/customer-ltv' },
];

function FrontPage() {
  return (
    <>
      <AppBar position="static">
        {/* <Toolbar>
          <GradientTypography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            E-commerce Analytics Dashboard
          </GradientTypography>
        </Toolbar> */}
      </AppBar>
      <Container maxWidth="md" alignItems="center">
      <Box my={4} display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start">
        <Box my={4}>
            <GradientTypography variant="h1" component="h1">
                Data Visualization App
            </GradientTypography>
        </Box>
        <Grid container spacing={3} mt={3}>
          {chartRoutes.map((route, index) => (
            <Grid item xs={12} sm={6} md={4} lg={6} key={index}>
              <StyledButton
                component={Link}
                to={route.path}
                variant="contained"
                fullWidth
              >
                {route.title}
              </StyledButton>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
    </>
  );
}

export default FrontPage;