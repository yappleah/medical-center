import React, { useState, useEffect } from "react";
import { AppointmentModel } from "../models/AppointmentModel";

interface AppointmentRowItemProps {
    key: number;
    appointment: AppointmentModel;
    onDelete: (id: number) => void;
    onUpdate: (updatedAppointment: AppointmentModel) => void;
    isAdmin: boolean;
}

export const AppointmentRowItem: React.FC<AppointmentRowItemProps> = ({
    key,
    appointment,
    onDelete,
    onUpdate,
    isAdmin
}) => {
    const [hoursString, period] = appointment.time.split(' ');
    const [selectedDate, setSelectedDate] = useState<string>(appointment.date);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(appointment.time);
    const [timeSlots, setTimeSlots] = useState<string[]>([]);
    const [patientId, setPatientId] = useState<number>(0);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedAppointment, setUpdatedAppointment] = useState<AppointmentModel>({
        ...appointment
    });

    let hours = parseInt(hoursString, 10);

    if (period === 'PM' && hours < 12) {
        hours += 12;
    } else if (period === 'AM' && hours === 12) {
        hours = 0;
    }

    const appointmentDateTime = new Date(`${appointment.date}T${hours.toString().padStart(2, '0')}:00:00Z`);

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

    const handleDelete = () => {
        onDelete(appointment.id);
    };

    const handleUpdate = () => {
        setUpdatedAppointment({ ...appointment });
        setSelectedTimeSlot(appointment.time);
        setIsEditing(true);
    };

    const handleSave = async () => {
        const confirmed = window.confirm("Are you sure you want to update this appointment?");
        if (confirmed) {
            try {
                const response = await fetch(`http://localhost:8080/appointment/${updatedAppointment.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedAppointment),
                });

                if (!response.ok) {
                    throw new Error('Failed to save appointment data');
                }

                onUpdate(updatedAppointment);
            } catch (error) {
                console.error('Error updating appointment:', error);
            } finally {
                setIsEditing(false);
            }
        } else {
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setUpdatedAppointment(appointment);
        setIsEditing(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUpdatedAppointment(prevAppointment => ({
            ...prevAppointment,
            [name]: value
        }));
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
        setUpdatedAppointment((prevAppointment) => ({
            ...prevAppointment,
            date: event.target.value
        }));
    };

    const handleTimeSlotChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTimeSlot(event.target.value);
        setUpdatedAppointment((prevAppointment) => ({
            ...prevAppointment,
            time: event.target.value
        }));
    };

    const handlePatientChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPatientId(Number(event.target.value));
        setUpdatedAppointment((prevAppointment) => ({
            ...prevAppointment,
            patientId: Number(event.target.value)
        }));
    };

    const isUpcoming = appointmentDateTime >= new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];

    return (
        <tr key={key}>
            <td>
                {isEditing ? (
                    <input
                        type="date"
                        className="form-control"
                        name="date"
                        value={updatedAppointment.date}
                        min={minDate}
                        onChange={handleDateChange}
                        required
                    />
                ) : (
                    appointment.date
                )}
            </td>
            <td>
                {isEditing ? (
                    <select
                        className="form-select"
                        value={selectedTimeSlot}
                        onChange={handleTimeSlotChange}
                        required
                    >
                        <option value="">{selectedTimeSlot}</option>
                        {timeSlots.map((timeSlot, index) => (
                            <option key={index} value={timeSlot}>
                                {timeSlot}
                            </option>
                        ))}
                    </select>
                ) : (
                    appointment.time
                )}
            </td>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        className="form-control"
                        name="description"
                        value={updatedAppointment.description}
                        onChange={handleChange}
                        required
                    />
                ) : (
                    appointment.description
                )}
            </td>
            <td>
                <span className={isUpcoming ? "text-success" : "text-muted"}>
                    {isUpcoming ? "Upcoming" : "Past"}
                </span>
            </td>
            {isAdmin && (
                <td>
                    {isEditing ? (
                        <input
                            type="number"
                            className="form-control"
                            value={updatedAppointment.patientId}
                            onChange={handlePatientChange}
                            placeholder="Enter Patient ID"
                            required
                        />
                    ) : (
                        <div>
                            <a
                                href={`/patients/${appointment.patientId}`}
                                className="text-primary"
                                style={{ cursor: "pointer" }}
                            >
                                {appointment.patientId}
                            </a>
                        </div>
                    )}
                </td>
            )}
            <td>
                {isUpcoming && (
                    <div>
                        {isEditing ? (
                            <div>
                                <button className="btn btn-success me-2" onClick={handleSave}>Save</button>
                                <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <button className="btn btn-info me-2" onClick={handleUpdate}>Update</button>
                                <button className="btn btn-danger" onClick={handleDelete}>Cancel</button>
                            </div>
                        )}
                    </div>
                )}
            </td>
        </tr>
    );
};

