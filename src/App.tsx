import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { ViewPatients } from "./pages/ViewPatients";
import { ProfilePage } from "./pages/ProfilePage";
import { BookAppointment } from "./pages/BookAppointment";
import { SignIn } from "./pages/SignIn";
import { RegisterForm } from "./pages/RegisterForm";
import { AllAppointments } from "./pages/AllAppointments";
import { PatientDetails } from "./pages/PatientDetails";

const App: React.FC = () => {
  const isAuthenticated = localStorage.getItem('userId') !== null;
  const userId = isAuthenticated ? Number(localStorage.getItem('userId')) : 0;
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/view-patients" element={<ViewPatients />} />
          <Route path="/appointment-schedule" element={<AllAppointments />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/my-profile/:userId" element={<ProfilePage />} />
          <Route path="/patients/:userId" element={<PatientDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
