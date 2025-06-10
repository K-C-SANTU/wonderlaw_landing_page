import React, { useState } from 'react';
import type { Location } from './BookingPage';
import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
  Button,
  Alert,
} from '@mui/material';

interface BookingFormProps {
  selectedLocation: Location;
  setSelectedLocation: (location: Location) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  onProceed: () => void;
  locations: Location[];
}

const BookingForm: React.FC<BookingFormProps> = ({
  selectedLocation,
  setSelectedLocation,
  selectedDate,
  setSelectedDate,
  onProceed,
  locations,
}) => {
  const today = new Date().toISOString().split('T')[0];
  const [error, setError] = useState<string>('');

  const handleProceed = () => {
    if (!selectedDate) {
      setError('Please select a visit date');
      return;
    }
    setError('');
    onProceed();
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 4,
        mb: 3,
        borderRadius: 2,
      }}
    >
      <Typography 
        variant="h5" 
        component="h2" 
        sx={{ 
          fontWeight: 'bold',
          mb: 4,
          textAlign: 'center'
        }}
      >
        Book Your Visit
      </Typography>
      
      {/* Location Selection */}
      <FormControl 
        fullWidth 
        sx={{ 
          mb: 4,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
          }
        }}
      >
        <InputLabel id="location-label">Select Location</InputLabel>
        <Select
          labelId="location-label"
          id="location"
          value={selectedLocation.name}
          label="Select Location"
          onChange={(e) => {
            const location = locations.find(loc => loc.name === e.target.value);
            if (location) setSelectedLocation(location);
          }}
        >
          {locations.map((location) => (
            <MenuItem key={location.name} value={location.name}>
              {location.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Date Selection */}
      <FormControl 
        fullWidth 
        sx={{ 
          mb: 4,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
          }
        }}
      >
        <TextField
          id="date"
          label="Select Date"
          type="date"
          inputProps={{ min: today }}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          fullWidth
        />
      </FormControl>

      {/* Price Information */}
      <Box 
        sx={{ 
          mt: 4,
          p: 3,
          bgcolor: 'primary.50',
          borderRadius: 2,
          border: 1,
          borderColor: 'primary.100'
        }}
      >
        <Typography 
          variant="subtitle1" 
          sx={{ 
            fontWeight: 'medium',
            color: 'primary.main',
            mb: 2 
          }}
        >
          Price Information
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Adult Ticket: ₹{selectedLocation.adultPrice}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Child Ticket: ₹{selectedLocation.adultPrice * 0.8} (20% off)
        </Typography>
        <Typography variant="body2">
          Senior Ticket: ₹{selectedLocation.adultPrice * 0.5} (50% off)
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}

      <Button
        variant="contained"
        fullWidth
        onClick={handleProceed}
        sx={{
          mt: 4,
          py: 1.5,
          borderRadius: 2,
          fontSize: '1.1rem'
        }}
      >
        Continue to Select Tickets
      </Button>
    </Paper>
  );
};

export default BookingForm; 