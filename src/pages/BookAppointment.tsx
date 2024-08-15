import React, { useState, useEffect } from "react";
import { Navbar } from "../layouts/NavbarAndFooter/Navbar";
import { Footer } from "../layouts/NavbarAndFooter/Footer";
import { AppointmentModel } from "../models/AppointmentModel";
import { isAuthenticated } from "../layouts/Utils/AuthUtils";

export const BookAppointment: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
    const [timeSlots, setTimeSlots] = useState<string[]>([]);
    const [description, setDescription] = useState<string>("");
    const [patientId, setPatientId] = useState<number>(0);
    const userId = isAuthenticated();
    const isAdminString: string | null = localStorage.getItem("isAdmin");
    const isAdmin: boolean = isAdminString === "true";

    const [appointment, setAppointment] = useState<AppointmentModel>({
        id: 0,
        date: "",
        time: "",
        description: "",
        patientId: userId
    });

    useEffect(() => {
        const fetchAppointments = async (date: string) => {
            const response = await fetch(`http://localhost:8080/appointments?date=${date}`);
            if (!response.ok) {
                throw new Error('Failed to fetch appointments');
            }
            const appointments = await response.json();
            const bookedTimeSlots = appointments.map((appointment: any) => appointment.time);
            const allTimeSlots = [
                '9:00 AM',
                '10:00 AM',
                '11:00 AM',
                '12:00 PM',
                '1:00 PM',
                '2:00 PM',
                '3:00 PM',
                '4:00 PM'
            ];
            const availableTimeSlots = allTimeSlots.filter(timeSlot => !bookedTimeSlots.includes(timeSlot));
            setTimeSlots(availableTimeSlots);
        };

        if (selectedDate) {
            fetchAppointments(selectedDate);
        }
    }, [selectedDate]);

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
        setAppointment((prevAppointment) => ({
            ...prevAppointment,
            date: event.target.value
        }));
    };

    const handleTimeSlotChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTimeSlot(event.target.value);
        setAppointment((prevAppointment) => ({
            ...prevAppointment,
            time: event.target.value
        }));
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
        setAppointment((prevAppointment) => ({
            ...prevAppointment,
            description: event.target.value
        }));
    };

    const handlePatientChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPatientId(parseInt(event.target.value));
        setAppointment((prevAppointment) => ({
            ...prevAppointment,
            patientId: parseInt(event.target.value)
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/appointments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointment),
            });

            if (!response.ok) {
                throw new Error('Failed to create appointment');
            }
            alert("Your appointment has been created.");
            window.location.href = "/";

        } catch (error) {
            console.error('Error creating appointment:', error);
        }
    }

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <h2>Book an Appointment</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Select Date:</label>
                        <input
                            type="date"
                            id="appointmentDate"
                            className="form-control"
                            value={selectedDate}
                            onChange={handleDateChange}
                            min={minDate}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Select Time:</label>
                        <select
                            className="form-select"
                            value={selectedTimeSlot}
                            onChange={handleTimeSlotChange}
                            required
                        >
                            <option value="">Select time slot...</option>
                            {timeSlots.map((timeSlot, index) => (
                                <option key={index} value={timeSlot}>
                                    {timeSlot}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Appointment Description:</label>
                        <textarea
                            className="form-control"
                            rows={3}
                            value={description}
                            onChange={handleDescriptionChange}
                            required
                        />
                    </div>
                    {isAdmin && (
                        <div className="mb-3">
                            <label className="form-label">Patient ID:</label>
                            <input
                                type="number"
                                className="form-control"
                                value={patientId}
                                onChange={handlePatientChange}
                                placeholder="Enter Patient ID"
                            />
                        </div>
                    )}
                    <button type="submit" className="btn btn-primary">
                        Book Appointment
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};


