import React from 'react';
import type { Location } from './BookingPage';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  IconButton,
  Paper,
  Stack,
  Divider
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon,
  Remove as RemoveIcon
} from '@mui/icons-material';

interface Tickets {
  adult: number;
  child: number;
  senior: number;
  adultCombo: number;
  childCombo: number;
  seniorCombo: number;
}

interface TicketSectionProps {
  selectedLocation: Location;
  selectedDate: string;
  tickets: Tickets;
  setTickets: React.Dispatch<React.SetStateAction<Tickets>>;
}

const TicketSection: React.FC<TicketSectionProps> = ({
  selectedLocation,
  selectedDate,
  tickets,
  setTickets,
}) => {
  const getAdultDiscount = () => {
    if (!selectedDate) return 0;
    const bookingDate = new Date(selectedDate);
    const today = new Date();
    const daysDiff = Math.floor((bookingDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysDiff >= 2 ? 0.2 : daysDiff >= 1 ? 0.1 : 0;
  };

  const calculatePrice = (basePrice: number, type: 'adult' | 'child' | 'senior', isCombo: boolean) => {
    let price = basePrice;
    
    // Apply type-based discounts first
    if (type === 'child') {
      price *= 0.8; // Fixed 20% off for children
    } else if (type === 'senior') {
      price *= 0.5; // Fixed 50% off for seniors
    } else if (type === 'adult') {
      // Only apply date-based discount for adults
      const adultDiscount = getAdultDiscount();
      if (adultDiscount > 0) {
        price *= (1 - adultDiscount);
      }
    }

    // Add combo price after discounts
    if (isCombo) price += 500;

    return Math.round(price);
  };

  const QuantityControl = ({ type, isCombo = false }: { type: 'adult' | 'child' | 'senior', isCombo?: boolean }) => {
    const key = isCombo ? `${type}Combo` : type;
    const quantity = tickets[key as keyof Tickets];
    const price = calculatePrice(selectedLocation.adultPrice, type, isCombo);

    return (
      <Box sx={{ py: 2 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 'medium', textTransform: 'capitalize' }}>
              {type}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ₹{price}
            </Typography>
          </Box>
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton
              size="small"
              onClick={() => setTickets((prev: Tickets) => ({
                ...prev,
                [key]: Math.max(0, quantity - 1)
              }))}
              sx={{ 
                bgcolor: 'grey.100',
                '&:hover': { bgcolor: 'grey.200' }
              }}
            >
              <RemoveIcon />
            </IconButton>
            <Typography variant="body1" sx={{ minWidth: '32px', textAlign: 'center' }}>
              {quantity}
            </Typography>
            <IconButton
              size="small"
              onClick={() => setTickets((prev: Tickets) => ({
                ...prev,
                [key]: quantity + 1
              }))}
              color="primary"
              sx={{ 
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': { bgcolor: 'primary.dark' }
              }}
            >
              <AddIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    );
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Select Tickets
      </Typography>

      {/* Regular Tickets */}
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ 
            bgcolor: 'grey.50',
            '&:hover': { bgcolor: 'grey.100' }
          }}
        >
          <Typography variant="subtitle1" fontWeight="medium">
            Regular Tickets
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack divider={<Divider />}>
            <QuantityControl type="adult" />
            <QuantityControl type="child" />
            <QuantityControl type="senior" />
          </Stack>
        </AccordionDetails>
      </Accordion>

      {/* Combo Tickets */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ 
            bgcolor: 'grey.50',
            '&:hover': { bgcolor: 'grey.100' }
          }}
        >
          <Box>
            <Typography variant="subtitle1" fontWeight="medium">
              Ticket + Meal Combo
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Includes lunch and evening snacks (+₹500)
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Stack divider={<Divider />}>
            <QuantityControl type="adult" isCombo />
            <QuantityControl type="child" isCombo />
            <QuantityControl type="senior" isCombo />
          </Stack>
        </AccordionDetails>
      </Accordion>

      {/* Discount Information */}
      <Paper 
        elevation={0} 
        sx={{ 
          mt: 2, 
          p: 2, 
          bgcolor: 'primary.50',
          border: 1,
          borderColor: 'primary.100'
        }}
      >
        {getAdultDiscount() > 0 && (
          <Typography variant="subtitle2" color="primary.main" gutterBottom>
            Adult Tickets: {getAdultDiscount() * 100}% advance booking discount
          </Typography>
        )}
        <Typography variant="caption" color="text.secondary">
          * Child tickets: Fixed 20% off | Senior tickets: Fixed 50% off
        </Typography>
      </Paper>
    </Stack>
  );
};

export default TicketSection; 