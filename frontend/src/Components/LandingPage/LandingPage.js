import React from "react";
import Header from "../Header/Header";
import "./LandingPage.css";
import HeroSection from "../HeroSection/HeroSection";
import FeaturedListings from "../FeaturedListings/FeaturedListings";
import Footer from "../Footer/Footer.js";

export default function LandingPage() {
  return (
    <div className="landing-page-container">
      <Header onPage="home" />

      {/* Hero Section */}
      <HeroSection />
      {/* Featured Listings */}

      <div className="card-container">
        <h1 className="featured-listing-title">
          Here are some of our featured listings:
        </h1>
        <FeaturedListings />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
