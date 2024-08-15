import React from "react";
import { AppointmentModel } from "../models/AppointmentModel";
import { AppointmentRowItem } from "./AppointmentRowItem";

interface AppointmentTableProps {
  appointments: AppointmentModel[];
  onDelete: (id: number) => void;
  onUpdate: (updatedAppointment: AppointmentModel) => void;
  isAdmin: boolean;
}

export const AppointmentTable: React.FC<AppointmentTableProps> = ({ appointments, onDelete, onUpdate, isAdmin }) => {

  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope='col'>Date</th>
            <th scope='col'>Time</th>
            <th scope='col'>Description</th>
            <th scope='col'>Status</th>
            {isAdmin && <th scope='col'>Patient ID</th>}
            <th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <AppointmentRowItem
              key={appointment.id}
              appointment={appointment}
              onDelete={onDelete}
              onUpdate={onUpdate}
              isAdmin={isAdmin}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
