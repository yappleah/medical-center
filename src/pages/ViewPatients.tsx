import React, { useEffect, useState } from "react";
import { PatientTable } from "../components/PatientTable";
import { PatientModel } from "../models/PatientModel";
import { SpinnerLoading } from "../layouts/Utils/SpinnerLoading";
import { Navbar } from "../layouts/NavbarAndFooter/Navbar";
import { Footer } from "../layouts/NavbarAndFooter/Footer";


export const ViewPatients = () => {
    const [patients, setPatients] = useState<PatientModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchPatients = async () => {
            const baseUrl: string = "http://localhost:8080/patients";
            const url: string = `${baseUrl}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const loadedPatients: PatientModel[] = [];

            for (const key in responseJson) {
                loadedPatients.push({
                    id: responseJson[key].id,
                    firstName: responseJson[key].firstName,
                    lastName: responseJson[key].lastName,
                    email: responseJson[key].email,
                    phoneNumber: responseJson[key].phoneNumber,
                    dob: responseJson[key].dob,
                    gender: responseJson[key].gender,
                    address: responseJson[key].address,
                    username: responseJson[key].username,
                    password: responseJson[key].password
                });
                setPatients(loadedPatients);
                setIsLoading(false);
            }

        };

        fetchPatients().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, []);

    if (isLoading) {
        return (
            <SpinnerLoading />
        )
    }

    if (httpError) {
        return (
            <div className='container m-5'> <p>{httpError}</p> </div>
        )
    }

    return (
        <div>
            <Navbar/>
            <div className='mt-5 container'>
                <div className="card">
                    <div className="card-header">
                        <strong>Users List</strong>
                    </div>
                </div>
                <div className="card-body">
                    <PatientTable patients={patients} />
                </div>
            </div>
            <Footer/>
        </div>

    );
}