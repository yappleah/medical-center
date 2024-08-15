import React, { useState, useEffect } from "react";
import { AppointmentModel } from "../models/AppointmentModel";
import { isAuthenticated } from "../layouts/Utils/AuthUtils";
import { SpinnerLoading } from "../layouts/Utils/SpinnerLoading";
import { AppointmentTable } from "../components/AppointmentTable";
import { AuthModel } from "../models/AuthModel";
import { PatientModel } from "../models/PatientModel";

export const ViewAppointments = () => {
    const [appointments, setAppointments] = useState<AppointmentModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const userId = isAuthenticated();
    const isAdminString: string | null = localStorage.getItem("isAdmin");
    const isAdmin: boolean = isAdminString === "true";

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                let fetchUrl = isAdmin
                    ? `http://localhost:8080/all-appointments`
                    : `http://localhost:8080/patient/appointments?id=${userId}`;

                const response = await fetch(fetchUrl);
                if (!response.ok) {
                    throw new Error("Failed to fetch appointments");
                }
                const responseJson = await response.json();

                const loadedAppointments: AppointmentModel[] = responseJson.map((item: any) => ({
                    id: item.id,
                    date: item.date,
                    time: item.time,
                    description: item.description,
                    patientId: item.patientId
                }));

                setAppointments(loadedAppointments);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching appointments:', error);
                setIsLoading(false);
            }
        };

        fetchAppointments();
    }, [userId]);

    const handleDeleteAppointment = async (id: number) => {
        const confirmed = window.confirm("Are you sure you want to delete this appointment?");
        if (confirmed) {
            try {
                const response = await fetch(`http://localhost:8080/appointments/${id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Failed to delete appointment');
                }

                setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== id));
            } catch (error) {
                console.error('Error deleting appointment:', error);
            }
        }
    };

    const handleUpdateAppointment = async (updatedAppointment: AppointmentModel) => {
        try {
            const response = await fetch(`http://localhost:8080/appointment/${updatedAppointment.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedAppointment),
            });

            if (!response.ok) {
                throw new Error('Failed to update appointment');
            }
            setAppointments(prevAppointments =>
                prevAppointments.map(appointment =>
                    appointment.id === updatedAppointment.id ? updatedAppointment : appointment
                )
            );
        } catch (error) {
            console.error('Error updating appointment:', error);
        }
    };

    if (isLoading) {
        return <SpinnerLoading />;
    }

    if (httpError) {
        return (
            <div className='container mt-5'>
                <div className="alert alert-danger" role="alert">
                    {httpError}
                </div>
            </div>
        );
    }

    return (
        <div className='container mt-5'>
            <div className="row justify-content-center">
                <div className="col-lg-12">
                    <div className="p-4 bg-white border rounded shadow-sm">
                        <h2 className="mb-4">Appointments</h2>
                        <div>
                            <AppointmentTable appointments={appointments} onDelete={handleDeleteAppointment} onUpdate={handleUpdateAppointment} isAdmin={isAdmin} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
