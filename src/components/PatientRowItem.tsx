import React from "react";
import { PatientModel } from "../models/PatientModel";

interface PatientRowItemProps {
    key: number;  
    patient: PatientModel;
  }

export const PatientRowItem: React.FC<PatientRowItemProps> = ({
    key,
    patient: {
      id,
      firstName,
      lastName,
      email,
      phoneNumber,
      dob,
      gender,
      address
    }
  }) => {
    return (
      <tr key={key}>
        <td>{id}</td>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{email}</td>
        <td>{phoneNumber}</td>
        <td>{dob}</td>
        <td>{gender}</td>
        <td>{address}</td>
      </tr>
    );
  };