import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    Divider,
    CircularProgress,
} from "@mui/material";
import type { Location } from "./BookingPage";

interface SummaryModalProps {
    onClose: () => void;
    onConfirm: () => void;
    location: Location;
    date: string;
    tickets: {
        adult: number;
        child: number;
        senior: number;
        adultCombo: number;
        childCombo: number;
        seniorCombo: number;
    };
    userInfo: {
        name: string;
        email: string;
        mobile: string;
        pinCode: string;
    };
}

const SummaryModal: React.FC<SummaryModalProps> = ({
    onClose,
    onConfirm,
    location,
    date,
    tickets,
    userInfo,
}) => {
    const [isProcessing, setIsProcessing] = React.useState(false);

    const handleConfirm = () => {
        setIsProcessing(true);
        onConfirm();
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-IN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    };

    const calculatePrices = () => {
        const basePrice = location.adultPrice;
        const comboCharge = 500;

        // Calculate original prices without any discounts
        const adultTotal = (tickets.adult * basePrice) + (tickets.adultCombo * (basePrice + comboCharge));
        const childTotal = (tickets.child * (basePrice * 0.8)) + (tickets.childCombo * ((basePrice * 0.8) + comboCharge));
        const seniorTotal = (tickets.senior * (basePrice * 0.5)) + (tickets.seniorCombo * ((basePrice * 0.5) + comboCharge));

        // Calculate adult discount
        const bookingDate = new Date(date);
        const today = new Date();
        const daysDiff = Math.floor((bookingDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        const adultDiscount = daysDiff >= 2 ? 0.2 : daysDiff >= 1 ? 0.1 : 0;
        const adultDiscountAmount = adultTotal * adultDiscount;

        const subtotal = adultTotal + childTotal + seniorTotal;
        
        return {
            originalAmount: subtotal,
            adultDiscount: adultDiscountAmount,
            subtotalAfterDiscount: subtotal - adultDiscountAmount,
        };
    };

    const { originalAmount, adultDiscount, subtotalAfterDiscount } = calculatePrices();
    const convenienceFee = 30;
    const gst = (subtotalAfterDiscount + convenienceFee) * 0.18;
    const total = subtotalAfterDiscount + convenienceFee + gst;

    return (
        <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Booking Summary</DialogTitle>
            <DialogContent>
                <Box sx={{ p: 2 }}>
                    <Typography>
                        <strong>Name:</strong> {userInfo.name}
                    </Typography>
                    <Typography>
                        <strong>Park:</strong> {location.name}
                    </Typography>
                    <Typography>
                        <strong>Visit Date:</strong> {formatDate(date)}
                    </Typography>
                    <Typography>
                        <strong>Email:</strong> {userInfo.email}
                    </Typography>
                    <Typography>
                        <strong>Mobile:</strong> {userInfo.mobile}
                    </Typography>
                    <Typography>
                        <strong>Pin code:</strong> {userInfo.pinCode}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    {tickets.adult > 0 && (
                        <Typography>
                            No. of Adult tickets: {tickets.adult}
                        </Typography>
                    )}
                    {tickets.child > 0 && (
                        <Typography>
                            No. of Child tickets: {tickets.child}
                        </Typography>
                    )}
                    {tickets.senior > 0 && (
                        <Typography>
                            No. of Senior Citizen tickets: {tickets.senior}
                        </Typography>
                    )}
                    {tickets.adultCombo > 0 && (
                        <Typography>
                            No. of Adult + Meal Combo: {tickets.adultCombo}
                        </Typography>
                    )}
                    {tickets.childCombo > 0 && (
                        <Typography>
                            No. of Child + Meal Combo: {tickets.childCombo}
                        </Typography>
                    )}
                    {tickets.seniorCombo > 0 && (
                        <Typography>
                            No. of Senior Citizen + Combo: {tickets.seniorCombo}
                        </Typography>
                    )}

                    <Divider sx={{ my: 2 }} />

                    <Typography>
                        <strong>Amount:</strong> {formatCurrency(originalAmount)}
                    </Typography>
                    {adultDiscount > 0 && (
                        <Typography color="success.main">
                            <strong>Adult Ticket Discount:</strong> -{formatCurrency(adultDiscount)}
                        </Typography>
                    )}
                    <Typography>
                        <strong>Subtotal after discount:</strong> {formatCurrency(subtotalAfterDiscount)}
                    </Typography>
                    <Typography>
                        <strong>Convenience Fee:</strong>{" "}
                        {formatCurrency(convenienceFee)}
                    </Typography>
                    <Typography>
                        <strong>GST (18%):</strong> {formatCurrency(gst)}
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 1 }}>
                        <strong>Total Amount:</strong> {formatCurrency(total)}
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={isProcessing}>
                    Cancel
                </Button>
                <Button
                    onClick={handleConfirm}
                    variant="contained"
                    disabled={isProcessing}
                    startIcon={
                        isProcessing ? <CircularProgress size={20} /> : null
                    }
                >
                    {isProcessing ? "Processing..." : "Confirm & Pay"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SummaryModal;
