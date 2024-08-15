import React from "react";
import { PatientModel } from "../models/PatientModel";
import { PatientRowItem } from "../components/PatientRowItem";


interface PatientTableProps {
    patients: PatientModel[];
  }

export const PatientTable: React.FC<PatientTableProps> = ({ patients }) => {
    return (
        <div>
        <table className="table table-hover">
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>First Name</th>
            <th scope='col'>Last Name</th>
            <th scope='col'>Email Address</th>
            <th scope='col'>Phone Number</th>
            <th scope='col'>Date of Birth</th>
            <th scope='col'>Gender</th>
            <th scope='col'>Address</th>
          </tr>
        </thead>
        <tbody>
        {patients.map(patient => (
            <PatientRowItem key={patient.id} patient={patient} />
          ))}
        </tbody>
      </table>
      </div>
    );
}