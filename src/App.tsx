import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BookingPage from './components/BookingPage';
import BookingConfirmation from './components/BookingConfirmation';
import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookingPage />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
