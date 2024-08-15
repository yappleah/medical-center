import React, { useState, useEffect } from "react";
import { PatientModel } from "../models/PatientModel";
import { Navbar } from "../layouts/NavbarAndFooter/Navbar";
import { Footer } from "../layouts/NavbarAndFooter/Footer";
import { isAuthenticated } from "../layouts/Utils/AuthUtils";
import { ViewAppointments } from "./ViewAppointments";

export const ProfilePage: React.FC = () => {
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
    
    const [isEditing, setIsEditing] = useState(false);
    const userId = isAuthenticated();
    const isAdminString: string | null = localStorage.getItem("isAdmin");
    const isAdmin: boolean = isAdminString === "true";

    const fetchPatient = async () => {
        try {
            const response = await fetch(`http://localhost:8080/patients/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch patient');
            }
            const fetchedPatient: PatientModel = await response.json();
            setPatient(fetchedPatient);
        } catch (error) {
            console.error('Error fetching patient:', error);
        }
    };

    useEffect(() => {
        if (userId !== 0) {
            fetchPatient();
        }
    }, [userId]);

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setPatient(prevPatient => ({
            ...prevPatient!,
            [name]: value
        }));
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            const response = await fetch(`http://localhost:8080/patients/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(patient),
            });

            if (!response.ok) {
                throw new Error('Failed to save patient data');
            }

            setIsEditing(false);
        } catch (error) {
            
        }
        setIsEditing(false);
        console.log("Updated patient data:", patient);
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <div className="d-flex align-items-center mb-3">
                    <h2 className="mb-0 me-3">Manage Profile</h2>
                    {!isEditing ? (
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleEditClick}
                        >
                            Edit
                        </button>
                    ) : (
                        <div>
                            <button
                                type="button"
                                className="btn btn-success me-2"
                                onClick={handleSaveClick}
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
                <form>
                    <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            value={patient!.firstName}
                            onChange={handleInputChange}
                            readOnly={!isEditing}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            value={patient!.lastName}
                            onChange={handleInputChange}
                            readOnly={!isEditing}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={patient!.email}
                            onChange={handleInputChange}
                            readOnly={!isEditing}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone Number</label>
                        <input
                            type="text"
                            className="form-control"
                            name="phoneNumber"
                            value={patient!.phoneNumber}
                            onChange={handleInputChange}
                            readOnly={!isEditing}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Date of Birth</label>
                        <input
                            type="date"
                            className="form-control"
                            name="dob"
                            value={patient!.dob}
                            onChange={handleInputChange}
                            readOnly={!isEditing}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Gender</label>
                        <select
                            className="form-select"
                            name="gender"
                            value={patient!.gender}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Address</label>
                        <textarea
                            className="form-control"
                            name="address"
                            value={patient!.address}

                            readOnly={!isEditing}
                        />
                    </div>
                </form>
            </div>
            {!isAdmin && <ViewAppointments />}
            <Footer />
        </div>
    );
};