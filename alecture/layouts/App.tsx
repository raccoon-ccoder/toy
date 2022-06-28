import React from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import LogIn from '@pages/Login';
import SignUp from '@pages/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
