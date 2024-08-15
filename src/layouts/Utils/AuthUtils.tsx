import { PatientModel } from "../../models/PatientModel";

export const isAuthenticated = (): number => {
    const userId = localStorage.getItem("userId");
    return userId ? parseInt(userId, 10) : 0;
};