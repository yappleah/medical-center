import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../layouts/Utils/AuthUtils";
import { AuthModel } from "../../models/AuthModel";
import { PatientModel } from "../../models/PatientModel";

export const Footer = () => {

  const [authData, setAuthData] = useState<AuthModel | null>(null);
  const [userRole, setUserRole] = useState<string>("");
  const [patient, setPatient] = useState<PatientModel>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dob: "",
    gender: "",
    address: "",
    username: "",
    password: ""
  });

  let userId = isAuthenticated();
  const fetchPatient = async () => {
    try {
      const response = await fetch(`http://localhost:8080/patients/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch patient');
      }
      const fetchedPatient: PatientModel = await response.json();
      setPatient(fetchedPatient);

      const fetchedAuth: AuthModel | null = await fetchAuth(fetchedPatient.username);
      if (fetchedAuth) {
        setAuthData(fetchedAuth);
        setUserRole(fetchedAuth.authority);
      } else {
        console.error('Failed to fetch authentication data');
      }

    } catch (error) {
      console.error('Error fetching patient:', error);
    }
  };

  const fetchAuth = async (username: string): Promise<AuthModel | null> => {
    try {
      const response = await fetch(`http://localhost:8080/api/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, authority: "" }),
      });
      if (!response.ok) {
        throw new Error('Failed to authenticate');
      }
      const fetchedResponse: AuthModel = await response.json();
      return fetchedResponse;
    } catch (error) {
      console.error('Error fetching authentication data:', error);
      return null;
    }
  };

  useEffect(() => {
    if (userId !== 0) {
      fetchPatient();
    }
  }, [userId]);

  const handleViewPatients = () => {
    if (userId == 0) {
      window.location.href = "/login";
    }
  };

  return (
    <div className="main-color mt-3">
      <footer className="container d-flex flex-wrap justify-content-between align-items-center py-5 main-color">
        <p className="col-md-4 mb-0 text-white">© Example Medical Appointment App, Inc</p>
        <ul className="nav navbar-dark col-md-8 justify-content-end">
          {userRole.includes("ADMIN") && (
            <li className="nav-item">
              <Link
                to="/view-patients"
                className="nav-link active mx-1 text-white"
                onClick={handleViewPatients}
              >
                View Users
              </Link>
            </li>
          )}
          {userRole.includes("ADMIN") && (
            <li className="nav-item">
              <Link
                to="/appointment-schedule"
                className="nav-link active mx-1 text-white"
              >
                Appointment Schedule
              </Link>
            </li>
          )}
          {userId !== 0 && (
            <li className="nav-item">
              <Link
                to="/book-appointment"
                className="nav-link mx-1 text-white"
              >
                Book Appointment
              </Link>
            </li>
          )}
          {userId !== 0 && (
            <li className="nav-item">
              <Link to={`/my-profile/${userId}`} className="nav-link mx-1 text-white">
                Manage Profile
              </Link>
            </li>
          )}
        </ul>
      </footer>
    </div>
  );
};

