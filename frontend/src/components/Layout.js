import React from "react";
import AboutUs from "./AboutUs";
import Footer from "./Footer";
import Header from "./Header";
import FAQ from "./FAQ";

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <FAQ />

      <AboutUs />

      <main className="flex-1" id="register">
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
