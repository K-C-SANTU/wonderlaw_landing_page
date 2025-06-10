import React from 'react';
import {
  Box,
  Button,
  Paper,
  Typography,
  Stack,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Divider,
} from '@mui/material';
import {
  CreditCard as CreditCardIcon,
  AccountBalance as BankIcon,
  Payment as UPIIcon,
} from '@mui/icons-material';

interface PaymentSectionProps {
  onProceed: () => void;
}

const PaymentSection: React.FC<PaymentSectionProps> = ({ onProceed }) => {
  const [paymentMethod, setPaymentMethod] = React.useState('card');

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Payment Method
      </Typography>

      <FormControl component="fieldset" sx={{ width: '100%', mt: 2 }}>
        <FormLabel component="legend" sx={{ mb: 2 }}>
          Select your preferred payment method
        </FormLabel>
        
        <RadioGroup
          aria-label="payment-method"
          name="payment-method"
          value={paymentMethod}
          onChange={handlePaymentMethodChange}
        >
          <Stack spacing={2}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <FormControlLabel
                value="card"
                control={<Radio />}
                label={
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <CreditCardIcon color="primary" />
                    <Box>
                      <Typography variant="subtitle1">Credit/Debit Card</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Pay securely with your card
                      </Typography>
                    </Box>
                  </Stack>
                }
              />
            </Paper>

            <Paper variant="outlined" sx={{ p: 2 }}>
              <FormControlLabel
                value="upi"
                control={<Radio />}
                label={
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <UPIIcon color="primary" />
                    <Box>
                      <Typography variant="subtitle1">UPI</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Pay using any UPI app
                      </Typography>
                    </Box>
                  </Stack>
                }
              />
            </Paper>

            <Paper variant="outlined" sx={{ p: 2 }}>
              <FormControlLabel
                value="netbanking"
                control={<Radio />}
                label={
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <BankIcon color="primary" />
                    <Box>
                      <Typography variant="subtitle1">Net Banking</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Pay using your bank account
                      </Typography>
                    </Box>
                  </Stack>
                }
              />
            </Paper>
          </Stack>
        </RadioGroup>
      </FormControl>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          size="large"
          onClick={onProceed}
          sx={{
            minWidth: { xs: '100%', sm: 200 },
            py: 1.5,
          }}
        >
          Proceed to Pay
        </Button>
      </Box>
    </Paper>
  );
};

export default PaymentSection; 