// src/pages/index.tsx
"use client";

import React from "react";
import Header from "components/Header";
import UrlForm from "components/UrlForm";
import Footer from "components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <UrlForm />
      </main>
      <Footer />
    </>
  );
}
