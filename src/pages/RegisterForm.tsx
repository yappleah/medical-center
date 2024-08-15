import React, { useState, useEffect } from 'react';
import { Navbar } from '../layouts/NavbarAndFooter/Navbar';
import { Footer } from '../layouts/NavbarAndFooter/Footer';
import { PatientModel } from '../models/PatientModel';

export const RegisterForm: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dob, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = {
            firstName,
            lastName,
            username,
            password,
            email,
            phoneNumber,
            dob,
            gender,
            address,
        };

        try {
            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            const authResponse = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, authority: 'ROLE_CUSTOMER' }),
            });

            if (!authResponse.ok) {
                throw new Error('Failed to save user authentication');
            }
            setSuccessMessage('Registration successful');
            clearForm();
            alert("Registration completed. Please sign in with your new credentials.");
            window.location.href = "/login";
        } catch (error) {
            console.error('Error registering:', error);
            setError('Failed to register');
        }
    };

    const today = new Date();
    const selectedDate = new Date(dob);

    if (selectedDate > today) {
        setError("Date of birth cannot be in the future");
        return;
    }

    const clearForm = () => {
        setFirstName('');
        setLastName('');
        setUsername('');
        setPassword('');
        setEmail('');
        setPhoneNumber('');
        setDateOfBirth('');
        setGender('');
        setAddress('');
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <h2>Register</h2>
                {successMessage && <p className="alert alert-success">{successMessage}</p>}
                {error && <p className="alert alert-danger">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone Number</label>
                        <input
                            type="tel"
                            className="form-control"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Date of Birth</label>
                        <input
                            type="date"
                            className="form-control"
                            value={dob}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Gender</label>
                        <select
                            className="form-select"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        >
                            <option value="">Select gender...</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Address</label>
                        <textarea
                            className="form-control"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

