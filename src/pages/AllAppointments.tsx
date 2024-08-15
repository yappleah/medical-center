import React from "react";
import { Navbar } from "../layouts/NavbarAndFooter/Navbar";
import { Footer } from "../layouts/NavbarAndFooter/Footer";
import { ViewAppointments } from "./ViewAppointments";

export const AllAppointments: React.FC = () => {
  return (
    <div>
      <Navbar/>
      <ViewAppointments/>
      <Footer/>
    </div>
  );
};
