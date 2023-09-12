import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import axios from "axios";
import config from "../../config";
import { useParams } from "react-router-dom";
import "./ListingDetailPage.css";
import "./DetailPage.css";

export default function ListingDetailPage() {
  const [property, setProperty] = useState(null);

  const { property_id } = useParams();

  const fetchListings = async () => {
    try {
      let response = await axios.get(
        `${config.backendEnpoint}/real-estate-data`
      );
      const data = response.data.listings;

      setProperty(data.find((ele) => ele.property_id === Number(property_id)));
    } catch (error) {
      setProperty(null);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div>
      <Header />
      <div className="detail-page-container">
        {property ? (
          <>
            <div className="image-container">
              <img
                className="image"
                src="/assets/real-estate-detail.jpg"
                alt="detail-Page"
              />
            </div>
            <div className="property-details">
              <h1 className="">{property.property_name}</h1>
              <div className="property-description">
                {property.description} Aenean lectus. Pellentesque eget nunc.
                Donec quis orci eget orci vehicula condimentum. Curabitur in
                libero ut massa volutpat convallis. Morbi odio odio, elementum
                eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis
                est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu
                sapien cursus vestibulum.
              </div>
              <div className="agent-details">
                <h2 className="agent-details-header">Contact</h2>
                <div className="agent-details-content">
                  <span className="title"> Agent Name:</span>
                  <span> John Smit</span>
                  <span className="title"> Email:</span>
                  <span>johnsmith@gmail.com</span>
                </div>
              </div>
            </div>
            <a href="/listings" className="detail-page-back">
              <button className="back-button">Back</button>
            </a>
          </>
        ) : (
          <div> "Details unavailable at the moment" </div>
        )}
      </div>
    </div>
  );
}
