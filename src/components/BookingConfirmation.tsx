import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Stack,
  Divider,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const BookingConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  if (!bookingData) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" color="error" gutterBottom>
            Invalid Booking
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            No booking information found. Please try booking again.
          </Typography>
          <Button variant="contained" onClick={() => navigate('/')}>
            Return to Booking
          </Button>
        </Paper>
      </Container>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Stack spacing={4} alignItems="center">
          <Box sx={{ textAlign: 'center' }}>
            <CheckCircleIcon color="success" sx={{ fontSize: 64, mb: 2 }} />
            <Typography variant="h4" gutterBottom>
              Booking Confirmed!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Your booking has been successfully confirmed.
            </Typography>
          </Box>

          <Divider flexItem />

          <Box sx={{ width: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Booking Details
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Booking ID
                </Typography>
                <Typography variant="body1">
                  {bookingData.bookingId}
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Location
                </Typography>
                <Typography variant="body1">
                  {bookingData.location.name}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Visit Date
                </Typography>
                <Typography variant="body1">
                  {formatDate(bookingData.date)}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Contact Information
                </Typography>
                <Typography variant="body1">
                  {bookingData.userInfo.name}<br />
                  {bookingData.userInfo.email}<br />
                  {bookingData.userInfo.mobile}
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate('/')}
            sx={{ mt: 4 }}
          >
            Book Another Visit
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default BookingConfirmation; 