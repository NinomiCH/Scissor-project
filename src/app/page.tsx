"use client";

import React from "react";
import Header from "../components/Header";
import UrlForm from "../components/UrlForm";
import Footer from "../components/Footer";



export default function Home() {
  return (
    <div className="home-container">
      <Header /> 
      <main className="main-content">
        <UrlForm />
      </main>
      <Footer />
    </div>
  );
}
