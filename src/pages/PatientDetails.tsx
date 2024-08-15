import React, { useState, useEffect } from "react";
import { Navbar } from "../layouts/NavbarAndFooter/Navbar";
import { Footer } from "../layouts/NavbarAndFooter/Footer";
import { useParams } from "react-router-dom";
import { PatientModel } from "../models/PatientModel";

export const PatientDetails: React.FC = () => {

    const { userId } = useParams<{ userId: string }>();
    const [patient, setPatient] = useState<PatientModel | null>(null);

    useEffect(() => {
        if (userId) {
            fetchPatientDetails(userId);
        }
    }, [userId]);

    const fetchPatientDetails = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:8080/patients/${id}`);
            if (!response.ok) {
                throw new Error("Failed to fetch patient details");
            }
            const data = await response.json();
            setPatient(data);
        } catch (error) {
            console.error("Error fetching patient details:", error);
        }
    };

    if (!patient) {
        return null;
    }

    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <h2>Patient Details</h2>
                <div>
                    <p><strong>Name:</strong> {patient.firstName} {patient.lastName}</p>
                    <p><strong>Email:</strong> {patient.email}</p>
                    <p><strong>Phone Number:</strong> {patient.phoneNumber}</p>
                    <p><strong>Date of Birth:</strong> {patient.dob}</p>
                    <p><strong>Gender:</strong> {patient.gender}</p>
                </div>
            </div>
            <Footer />
        </div>
    );
};
