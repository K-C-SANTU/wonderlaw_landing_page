import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookingForm from "./BookingForm";
import TicketSection from "./TicketSection";
import UserInfoForm from "./UserInfoForm";
import SummaryModal from "./SummaryModal";
import PaymentSection from "./PaymentSection";
import { Container, Box, Typography, Paper, Alert } from "@mui/material";

export interface Location {
    name: string;
    adultPrice: number;
    image: string;
    description: string;
}

export const locations: Location[] = [
    {
        name: "Kochi",
        adultPrice: 2000,
        image: "https://b3681537.smushcdn.com/3681537/wp-content/uploads/2022/10/wonderla-amusement-park-kochi-800x385.jpg?lossy=2&strip=1&webp=1",
        description:
            "Experience the thrill at Wonderla Kochi, featuring over 50+ exciting rides and attractions.",
    },
    {
        name: "Bengaluru",
        adultPrice: 2200,
        image: "https://www.prestigesouthernstar.info/images/prestige/wonderla-amusement-park.webp  ",
        description:
            "Visit our flagship park in Bengaluru with state-of-the-art rides and water attractions.",
    },
    {
        name: "Hyderabad",
        adultPrice: 2000,
        image: "https://www.prestigesouthernstar.info/images/prestige/wonderla-bengaluru.webp",
        description:
            "Discover endless fun at Wonderla Hyderabad with thrilling rides for all ages.",
    },
    {
        name: "Bhubaneswar",
        adultPrice: 1500,
        image: "https://budgetindianvacations.wordpress.com/wp-content/uploads/2015/11/wonderla-amusement-park-karnataka.jpg",
        description:
            "Our newest destination featuring modern attractions and family entertainment.",
    },
];

const BookingPage: React.FC = () => {
    const navigate = useNavigate();
    const [showSummary, setShowSummary] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<Location>(
        locations[0]
    );
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [showTicketSection, setShowTicketSection] = useState(false);
    const [tickets, setTickets] = useState({
        adult: 0,
        child: 0,
        senior: 0,
        adultCombo: 0,
        childCombo: 0,
        seniorCombo: 0,
    });
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        mobile: "",
        pinCode: "",
        termsAccepted: false,
    });
    const [error, setError] = useState<string>("");

    // Validation before proceeding to payment
    const validateBooking = () => {
        if (!selectedDate) {
            setError("Please select a visit date");
            return false;
        }

        const totalTickets = Object.values(tickets).reduce(
            (sum, count) => sum + count,
            0
        );
        if (totalTickets === 0) {
            setError("Please select at least one ticket");
            return false;
        }

        if (
            !userInfo.name ||
            !userInfo.email ||
            !userInfo.mobile ||
            !userInfo.pinCode ||
            !userInfo.termsAccepted
        ) {
            setError("Please fill in all required personal information");
            return false;
        }

        setError("");
        return true;
    };

    const handleProceedToPayment = () => {
        if (validateBooking()) {
            setShowSummary(true);
        }
    };

    const handlePaymentSuccess = () => {
        // Simulate payment processing
        setTimeout(() => {
            navigate("/booking-confirmation", {
                state: {
                    location: selectedLocation,
                    date: selectedDate,
                    tickets,
                    userInfo,
                    bookingId: Math.random().toString(36).substring(2, 15),
                },
            });
        }, 1500);
    };

    // Clear error when any input changes
    useEffect(() => {
        setError("");
    }, [selectedDate, tickets, userInfo]);

    return (
        <Box className="min-h-screen bg-gray-50">
            {/* Banner Section */}
            <Box
                sx={{
                    position: "relative",
                    height: { xs: "40vh", md: "50vh" },
                    backgroundImage: `url(${selectedLocation.image})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0,0,0,0.4)",
                    },
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        p: 4,
                    }}
                >
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: "2.5rem", md: "4rem" },
                            color: "white",
                            fontWeight: "bold",
                            mb: 2,
                            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                        }}
                    >
                        Welcome to Wonderla
                    </Typography>
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: { xs: "1.25rem", md: "1.5rem" },
                            color: "white",
                            maxWidth: "2xl",
                            textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                        }}
                    >
                        {selectedLocation.description}
                    </Typography>
                </Box>
            </Box>

            {/* Marquee */}
            <Paper
                elevation={3}
                sx={{
                    bgcolor: "primary.main",
                    color: "white",
                    py: 2,
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        animation: "marquee 20s linear infinite",
                        whiteSpace: "nowrap",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Typography variant="h6" component="span" sx={{ mx: 4 }}>
                        Book 2 days in advance - 20% off
                    </Typography>
                    <Typography
                        variant="h6"
                        component="span"
                        sx={{ mx: 4, opacity: 0.7 }}
                    >
                        |
                    </Typography>
                    <Typography variant="h6" component="span" sx={{ mx: 4 }}>
                        Book 1 day in advance - 10% off
                    </Typography>
                </Box>
            </Paper>

            {/* Main Content */}
            <Container maxWidth="xl" sx={{ py: 6 }}>
                {error && (
                    <Alert severity="error" sx={{ mb: 4 }}>
                        {error}
                    </Alert>
                )}

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        gap: 4,
                    }}
                >
                    {/* Left Section */}
                    <Box sx={{ width: { xs: "100%", md: "66.666667%" } }}>
                        {!showTicketSection ? (
                            <BookingForm
                                selectedLocation={selectedLocation}
                                setSelectedLocation={setSelectedLocation}
                                selectedDate={selectedDate}
                                setSelectedDate={setSelectedDate}
                                onProceed={() => setShowTicketSection(true)}
                                locations={locations}
                            />
                        ) : (
                            <>
                                <TicketSection
                                    selectedLocation={selectedLocation}
                                    selectedDate={selectedDate}
                                    tickets={tickets}
                                    setTickets={setTickets}
                                />
                                <UserInfoForm
                                    userInfo={userInfo}
                                    setUserInfo={setUserInfo}
                                />
                                <PaymentSection
                                    onProceed={handleProceedToPayment}
                                />
                            </>
                        )}
                    </Box>

                    {/* Right Section - Location Preview */}
                    <Box
                        sx={{
                            width: { xs: "100%", md: "33.333333%" },
                            position: { md: "sticky" },
                            top: { md: "1rem" },
                            alignSelf: { md: "flex-start" },
                        }}
                    >
                        <Paper
                            elevation={3}
                            sx={{
                                overflow: "hidden",
                                borderRadius: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    height: 200,
                                    backgroundImage: `url(${selectedLocation.image})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            />
                            <Box sx={{ p: 3 }}>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: "bold", mb: 1 }}
                                >
                                    {selectedLocation.name} Park
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {selectedLocation.description}
                                </Typography>
                                {selectedDate && (
                                    <Typography
                                        variant="body1"
                                        sx={{ mt: 2, color: "primary.main" }}
                                    >
                                        Selected Date:{" "}
                                        {new Date(
                                            selectedDate
                                        ).toLocaleDateString("en-IN", {
                                            weekday: "long",
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </Typography>
                                )}
                            </Box>
                        </Paper>
                    </Box>
                </Box>
            </Container>

            {/* Summary Modal */}
            {showSummary && (
                <SummaryModal
                    onClose={() => setShowSummary(false)}
                    onConfirm={handlePaymentSuccess}
                    location={selectedLocation}
                    date={selectedDate}
                    tickets={tickets}
                    userInfo={userInfo}
                />
            )}
        </Box>
    );
};

export default BookingPage;
