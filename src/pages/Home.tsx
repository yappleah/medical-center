import React from "react";
import { Navbar } from "../layouts/NavbarAndFooter/Navbar";
import { Footer } from "../layouts/NavbarAndFooter/Footer";
import { Intro } from "../layouts/HomePage/Intro";
import { Cards } from "../layouts/HomePage/Cards";

export const Home: React.FC = () => {
  return (
    <div>
      <Navbar/>
      <Intro/>
      <Cards/>
      <Footer/>
    </div>
  );
};
