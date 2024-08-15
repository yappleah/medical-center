import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../layouts/Utils/AuthUtils";
import { AuthModel } from "../../models/AuthModel";
import { PatientModel } from "../../models/PatientModel";

export const Navbar: React.FC = () => {

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
    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("isAdmin");

        window.location.href = "/";
    };

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
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img
                        src={require("../../Images/PublicImages/logo.png")}
                        alt="Logo"
                        width="100"
                        height="80"
                        className="d-inline-block align-middle"
                    />
                    <strong className="playfair-display-400">
                        &nbsp; &nbsp;PORT HUPREE
                    </strong>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarText"
                    aria-controls="navbarText"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {userRole.includes("ADMIN") && (
                            <li className="nav-item">
                                <Link
                                    to="/view-patients"
                                    className="nav-link active mx-1"
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
                                    className="nav-link active mx-1"
                                >
                                    Appointment Schedule
                                </Link>
                            </li>
                        )}
                        {userId !== 0 && (
                            <li className="nav-item">
                                <Link
                                    to="/book-appointment"
                                    className="nav-link mx-1"
                                >
                                    Book Appointment
                                </Link>
                            </li>
                        )}
                        {userId !== 0 && (
                            <li className="nav-item">
                                <Link to={`/my-profile/${userId}`} className="nav-link mx-1">
                                    Manage Profile
                                </Link>
                            </li>
                        )}
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        {localStorage.getItem("userId") ? (
                            <>
                                <li className="nav-item mx-1">
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary"
                                        onClick={handleLogout}
                                    >
                                        Sign out
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item mx-1">
                                <Link to="/login" className="btn btn-outline-primary">
                                    Sign in
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

