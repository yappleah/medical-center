import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AuthModel } from "../models/AuthModel";

export const SignIn: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const fetchAuth = async (username: string): Promise<AuthModel | null> => {
    try {
      const response = await fetch(`http://localhost:8080/api/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, authority: "" }),
      });
      if (!response.ok) {
        throw new Error('Failed to authenticate');
      }
      const fetchedResponse: AuthModel = await response.json();
      return fetchedResponse;
    } catch (error) {
      console.error('Error fetching authentication data:', error);
      return null;
    }
  };

  const handleSignIn = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Authentication failed");
      }

      const data = await response.json();
      const fetchedAuth: AuthModel | null = await fetchAuth(username);

      if (fetchedAuth) {
        if (fetchedAuth.authority === "ROLE_ADMIN") {
          localStorage.setItem("isAdmin", "true");
        }
        localStorage.setItem("userId", data.id);
        window.location.href = `/my-profile/${data.id}`;
      } else {
        throw new Error('Failed to fetch authentication data');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Sign In</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSignIn}>
          Sign In
        </button>
        <Link to="/register" className="btn btn-link">
          Register as new user
        </Link>
      </form>
    </div>
  );
};

