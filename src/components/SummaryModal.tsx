import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Stack,
  Divider,
  Paper,
} from '@mui/material';
import type { Location } from './BookingPage';

interface Tickets {
  adult: number;
  child: number;
  senior: number;
  adultCombo: number;
  childCombo: number;
  seniorCombo: number;
}

interface UserInfo {
  name: string;
  email: string;
  mobile: string;
  pinCode: string;
  termsAccepted: boolean;
}

interface SummaryModalProps {
  onClose: () => void;
  onConfirm: () => void;
  location: Location;
  date: string;
  tickets: Tickets;
  userInfo: UserInfo;
}

const SummaryModal: React.FC<SummaryModalProps> = ({
  onClose,
  onConfirm,
  location,
  date,
  tickets,
  userInfo,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirm = () => {
    setIsProcessing(true);
    onConfirm();
  };

  const calculateSubtotal = () => {
    const { adultPrice } = location;
    const regularTotal = (
      tickets.adult * adultPrice +
      tickets.child * (adultPrice * 0.8) +
      tickets.senior * (adultPrice * 0.5)
    );
    const comboTotal = (
      tickets.adultCombo * (adultPrice + 500) +
      tickets.childCombo * (adultPrice * 0.8 + 500) +
      tickets.seniorCombo * (adultPrice * 0.5 + 500)
    );
    return regularTotal + comboTotal;
  };

  const calculateDiscount = () => {
    if (!date) return 0;
    const bookingDate = new Date(date);
    const today = new Date();
    const daysDiff = Math.floor((bookingDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysDiff >= 2 ? 0.2 : daysDiff >= 1 ? 0.1 : 0;
  };

  const subtotal = calculateSubtotal();
  const discount = calculateDiscount();
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Dialog
      open={true}
      onClose={!isProcessing ? onClose : undefined}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          m: { xs: 2, sm: 4 },
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h5" component="div" fontWeight="bold">
          Booking Summary
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3}>
          {/* Location and Date */}
          <Box>
            <Typography variant="subtitle1" color="primary" gutterBottom>
              Visit Details
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Stack spacing={1}>
                <Typography variant="body1">
                  <strong>Location:</strong> {location.name}
                </Typography>
                <Typography variant="body1">
                  <strong>Date:</strong> {formatDate(date)}
                </Typography>
              </Stack>
            </Paper>
          </Box>

          {/* Ticket Details */}
          <Box>
            <Typography variant="subtitle1" color="primary" gutterBottom>
              Ticket Details
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Stack spacing={1.5}>
                {tickets.adult > 0 && (
                  <Typography variant="body1">
                    Adult Tickets: {tickets.adult}
                  </Typography>
                )}
                {tickets.child > 0 && (
                  <Typography variant="body1">
                    Child Tickets: {tickets.child}
                  </Typography>
                )}
                {tickets.senior > 0 && (
                  <Typography variant="body1">
                    Senior Tickets: {tickets.senior}
                  </Typography>
                )}
                {tickets.adultCombo > 0 && (
                  <Typography variant="body1">
                    Adult Combo Tickets: {tickets.adultCombo}
                  </Typography>
                )}
                {tickets.childCombo > 0 && (
                  <Typography variant="body1">
                    Child Combo Tickets: {tickets.childCombo}
                  </Typography>
                )}
                {tickets.seniorCombo > 0 && (
                  <Typography variant="body1">
                    Senior Combo Tickets: {tickets.seniorCombo}
                  </Typography>
                )}
              </Stack>
            </Paper>
          </Box>

          {/* Contact Details */}
          <Box>
            <Typography variant="subtitle1" color="primary" gutterBottom>
              Contact Details
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Stack spacing={1}>
                <Typography variant="body1">
                  <strong>Name:</strong> {userInfo.name}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {userInfo.email}
                </Typography>
                <Typography variant="body1">
                  <strong>Mobile:</strong> {userInfo.mobile}
                </Typography>
                <Typography variant="body1">
                  <strong>PIN Code:</strong> {userInfo.pinCode}
                </Typography>
              </Stack>
            </Paper>
          </Box>

          {/* Price Breakdown */}
          <Box>
            <Typography variant="subtitle1" color="primary" gutterBottom>
              Price Details
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Subtotal</Typography>
                  <Typography>₹{subtotal.toFixed(2)}</Typography>
                </Box>
                {discount > 0 && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'success.main' }}>
                    <Typography>Advance Booking Discount ({discount * 100}%)</Typography>
                    <Typography>-₹{discountAmount.toFixed(2)}</Typography>
                  </Box>
                )}
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">Total Amount</Typography>
                  <Typography variant="h6" color="primary">
                    ₹{total.toFixed(2)}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button 
          onClick={onClose} 
          variant="outlined" 
          sx={{ mr: 1 }}
          disabled={isProcessing}
        >
          Edit Booking
        </Button>
        <Button
          variant="contained"
          onClick={handleConfirm}
          disabled={isProcessing}
          sx={{
            minWidth: { xs: '120px', sm: '150px' },
            position: 'relative',
          }}
        >
          {isProcessing ? 'Processing...' : 'Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SummaryModal; 